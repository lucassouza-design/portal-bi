"""Servidor MCP (streamable HTTP) para Odoo via XML-RPC. Somente leitura por padrão.

Env: ODOO_URL, ODOO_DB, ODOO_LOGIN, ODOO_API_KEY, MCP_PATH_SECRET (obrigatório),
     ODOO_ALLOW_WRITE=1 (habilita create/write/call_method), ODOO_COMPANY_IDS (opcional, ex. "1,2"),
     PORT (padrão 8000).
"""
import os

from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings

from odoo_client import OdooClient

MAX_LIMIT = 200
WRITE = os.environ.get("ODOO_ALLOW_WRITE") == "1"
# métodos do ORM que NUNCA passam por call_method (use as tools dedicadas)
BLOCKED_METHODS = {"unlink", "sudo", "with_user", "write", "create", "copy"}

mcp = FastMCP("odoo", stateless_http=True, json_response=True,
              transport_security=TransportSecuritySettings(enable_dns_rebinding_protection=False))
_client = None


def odoo() -> OdooClient:
    global _client
    if _client is None:
        _client = OdooClient(os.environ["ODOO_URL"], os.environ["ODOO_DB"],
                             os.environ["ODOO_LOGIN"], os.environ["ODOO_API_KEY"])
    return _client


def _ctx():
    ids = os.environ.get("ODOO_COMPANY_IDS")
    if not ids:
        return {}
    ids = [int(i) for i in ids.split(",")]
    return {"context": {"allowed_company_ids": ids}}


def _need_write():
    if not WRITE:
        raise PermissionError("Escrita desabilitada. Defina ODOO_ALLOW_WRITE=1 no servidor.")


@mcp.tool()
def search_read(model: str, domain: list | None = None, fields: list[str] | None = None,
                limit: int = 50, offset: int = 0, order: str | None = None) -> list[dict]:
    """Lista registros (ex.: model='project.task', domain=[['x_studio_x','=',1]]). limit máx 200; pagine com offset."""
    kw = {"limit": min(limit, MAX_LIMIT), "offset": offset, **_ctx()}
    if fields:
        kw["fields"] = fields
    if order:
        kw["order"] = order
    return odoo().execute(model, "search_read", [domain or []], kw)


@mcp.tool()
def search_count(model: str, domain: list | None = None) -> int:
    """Conta registros que satisfazem o domain."""
    return odoo().execute(model, "search_count", [domain or []], _ctx())


@mcp.tool()
def read(model: str, ids: list[int], fields: list[str] | None = None) -> list[dict]:
    """Lê registros por ID (máx 200)."""
    return odoo().execute(model, "read", [ids[:MAX_LIMIT]], {**({"fields": fields} if fields else {}), **_ctx()})


@mcp.tool()
def read_group(model: str, domain: list, fields: list[str], groupby: list[str],
               limit: int = 100, orderby: str | None = None) -> list[dict]:
    """Agregações (ex.: fields=['amount_total:sum'], groupby=['partner_id'])."""
    kw = {"limit": min(limit, MAX_LIMIT), "lazy": False, **_ctx()}
    if orderby:
        kw["orderby"] = orderby
    return odoo().execute(model, "read_group", [domain, fields, groupby], kw)


@mcp.tool()
def fields_get(model: str, attributes: list[str] | None = None) -> dict:
    """Metadados dos campos do modelo (string, type, relation, selection)."""
    return odoo().execute(model, "fields_get", [], {"attributes": attributes or ["string", "type", "relation", "selection", "required", "readonly"]})


@mcp.tool()
def list_models(name_filter: str = "", limit: int = 50) -> list[dict]:
    """Busca modelos em ir.model por nome técnico ou descrição."""
    dom = ["|", ["model", "ilike", name_filter], ["name", "ilike", name_filter]] if name_filter else []
    return odoo().execute("ir.model", "search_read", [dom], {"fields": ["model", "name"], "limit": min(limit, MAX_LIMIT)})


@mcp.tool()
def create(model: str, values: dict) -> int:
    """Cria um registro e devolve o ID. Requer ODOO_ALLOW_WRITE=1."""
    _need_write()
    return odoo().execute(model, "create", [values], _ctx())


@mcp.tool()
def write(model: str, ids: list[int], values: dict) -> bool:
    """Atualiza registros (máx 200 IDs). Requer ODOO_ALLOW_WRITE=1."""
    _need_write()
    if len(ids) > MAX_LIMIT:
        raise ValueError(f"Máximo de {MAX_LIMIT} IDs por chamada.")
    return odoo().execute(model, "write", [ids, values], _ctx())


@mcp.tool()
def call_method(model: str, method: str, ids: list[int] | None = None,
                args: list | None = None, kwargs: dict | None = None) -> object:
    """Chama método público (ex.: action_confirm). Requer ODOO_ALLOW_WRITE=1; unlink/sudo/create/write bloqueados."""
    _need_write()
    if method.startswith("_") or method in BLOCKED_METHODS:
        raise PermissionError(f"Método '{method}' não permitido.")
    a = ([ids] if ids else []) + (args or [])
    return odoo().execute(model, method, a, {**(kwargs or {}), **_ctx()})


def build_app():
    """ASGI app: o endpoint só existe em /<MCP_PATH_SECRET>/mcp (segredo na URL; claude.ai não envia bearer em conectores custom)."""
    secret = os.environ.get("MCP_PATH_SECRET", "")
    if len(secret) < 24:
        raise SystemExit("Defina MCP_PATH_SECRET com 24+ caracteres aleatórios.")
    inner = mcp.streamable_http_app()
    prefix = f"/{secret}"

    async def app(scope, receive, send):
        if scope["type"] == "lifespan":
            return await inner(scope, receive, send)
        path = scope.get("path", "")
        if scope["type"] == "http" and path.startswith(prefix + "/"):
            scope = dict(scope, path=path[len(prefix):], raw_path=path[len(prefix):].encode())
            return await inner(scope, receive, send)
        if scope["type"] == "http" and path == "/healthz":
            await send({"type": "http.response.start", "status": 200, "headers": [(b"content-type", b"text/plain")]})
            return await send({"type": "http.response.body", "body": b"ok"})
        await send({"type": "http.response.start", "status": 404, "headers": []})
        await send({"type": "http.response.body", "body": b""})

    return app


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(build_app(), host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
