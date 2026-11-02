"""Cliente XML-RPC mínimo para Odoo (Online/Odoo.sh), com retry e autenticação por API key."""
import time
import xmlrpc.client


class OdooError(Exception):
    pass


class OdooClient:
    def __init__(self, url, db, login, api_key, timeout=60, retries=3):
        self.url = url.rstrip("/")
        self.db, self.login, self.key = db, login, api_key
        self.retries = retries
        t = _TimeoutTransport(timeout, self.url.startswith("https"))
        self._common = xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/common", transport=t)
        self._obj = xmlrpc.client.ServerProxy(f"{self.url}/xmlrpc/2/object", transport=t, allow_none=True)
        self._uid = None

    @property
    def uid(self):
        if self._uid is None:
            self._uid = self._retry(self._common.authenticate, self.db, self.login, self.key, {})
            if not self._uid:
                raise OdooError("Autenticação falhou: confira ODOO_DB, ODOO_LOGIN e ODOO_API_KEY.")
        return self._uid

    def _retry(self, fn, *args):
        for i in range(self.retries):
            try:
                return fn(*args)
            except xmlrpc.client.Fault as e:  # erro de negócio/ACL: não repetir
                raise OdooError(e.faultString.strip().splitlines()[-1] if e.faultString else str(e))
            except (OSError, xmlrpc.client.ProtocolError):
                if i == self.retries - 1:
                    raise
                time.sleep(2 ** i)

    def execute(self, model, method, args=None, kwargs=None):
        return self._retry(self._obj.execute_kw, self.db, self.uid, self.key,
                           model, method, args or [], kwargs or {})


class _TimeoutTransport(xmlrpc.client.SafeTransport):
    def __init__(self, timeout, secure=True):
        super().__init__()
        self._timeout = timeout
        self._secure = secure

    def make_connection(self, host):
        if not self._secure:
            import http.client
            return http.client.HTTPConnection(self.get_host_info(host)[0], timeout=self._timeout)
        return self._make_secure(host)

    def _make_secure(self, host):
        conn = super().make_connection(host)
        conn.timeout = self._timeout
        return conn
