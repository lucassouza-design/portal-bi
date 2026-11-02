"""Smoke test com Odoo falso (XML-RPC local). Rodar: python tests/test_smoke.py"""
import json, os, sys, threading
from xmlrpc.server import SimpleXMLRPCServer, SimpleXMLRPCRequestHandler

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class H(SimpleXMLRPCRequestHandler):
    rpc_paths = ("/xmlrpc/2/common", "/xmlrpc/2/object")


srv = SimpleXMLRPCServer(("127.0.0.1", 0), requestHandler=H, allow_none=True, logRequests=False)
srv.register_function(lambda db, l, k, e: 7 if k == "good" else False, "authenticate")
srv.register_function(lambda db, uid, k, model, m, a, kw: [{"id": 1, "model": model, "method": m}], "execute_kw")
threading.Thread(target=srv.serve_forever, daemon=True).start()

os.environ.update(ODOO_URL=f"http://127.0.0.1:{srv.server_address[1]}", ODOO_DB="d", ODOO_LOGIN="u",
                  ODOO_API_KEY="good", MCP_PATH_SECRET="x" * 24)
from starlette.testclient import TestClient
import server

H_ = {"Accept": "application/json, text/event-stream", "Content-Type": "application/json"}
with TestClient(server.build_app()) as c:
    p = "/" + "x" * 24 + "/mcp"
    assert c.post("/errado/mcp", json={}).status_code == 404
    assert c.get("/healthz").text == "ok"
    r = c.post(p, headers=H_, json={"jsonrpc": "2.0", "id": 1, "method": "tools/list"})
    names = {t["name"] for t in r.json()["result"]["tools"]}
    assert {"search_read", "fields_get", "call_method"} <= names, names
    call = lambda n, a: c.post(p, headers=H_, json={"jsonrpc": "2.0", "id": 2, "method": "tools/call", "params": {"name": n, "arguments": a}}).json()["result"]
    ok = call("search_read", {"model": "res.partner", "limit": 5})
    assert not ok.get("isError"), ok
    bad = call("write", {"model": "res.partner", "ids": [1], "values": {"name": "x"}})
    assert bad["isError"] and "desabilitada" in json.dumps(bad), bad
print("OK")
