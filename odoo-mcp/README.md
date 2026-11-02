# odoo-mcp

Servidor MCP (streamable HTTP, stateless) para o Odoo 18 Online via XML-RPC + API key. **Somente leitura por padrão.**

Tools: `search_read`, `search_count`, `read`, `read_group`, `fields_get`, `list_models` (leitura) e `create`, `write`, `call_method` (só com `ODOO_ALLOW_WRITE=1`). Limite de 200 registros por chamada (use `offset`); retry com backoff em falha de rede; `unlink`, `sudo` e métodos `_privados` bloqueados.

## Variáveis de ambiente
| Var | Exemplo |
| --- | --- |
| `ODOO_URL` | `https://mcpack-usa-llc.odoo.com` |
| `ODOO_DB` | nome do banco (Online: normalmente `mcpack-usa-llc`) |
| `ODOO_LOGIN` | e-mail do usuário dono da API key |
| `ODOO_API_KEY` | Perfil > Segurança da conta > Nova chave de API |
| `MCP_PATH_SECRET` | 24+ caracteres aleatórios: `python -c "import secrets;print(secrets.token_urlsafe(32))"` |
| `ODOO_ALLOW_WRITE` | omitir = leitura. `1` = escrita |
| `ODOO_COMPANY_IDS` | opcional, ex. `1,2` (multiempresa) |

Recomendado: criar um usuário dedicado (ex. `claude-mcp@mcpack.com.br`) com grupos mínimos; a API key herda as permissões dele (ACL e regras de registro valem).

## Teste local
```bash
pip install -r requirements.txt httpx
python tests/test_smoke.py          # Odoo falso, sem rede
ODOO_URL=... ODOO_DB=... ODOO_LOGIN=... ODOO_API_KEY=... MCP_PATH_SECRET=... python server.py
```

## Deploy gratuito (HTTPS obrigatório)
**Render (Web Service, plano Free):** New > Web Service > repo `portal-bi`, Root Directory `odoo-mcp`, Runtime Docker, plano Free, Health Check Path `/healthz`, adicione as env vars. Free dorme após inatividade (1ª chamada leva ~30-60 s). Alternativa: Google Cloud Run (`gcloud run deploy --source odoo-mcp --allow-unauthenticated --set-env-vars ...`), dentro da cota gratuita; exige conta de faturamento.

## Cadastro no claude.ai
Settings > Connectors > Add custom connector > URL `https://<seu-host>/<MCP_PATH_SECRET>/mcp` (sem OAuth). Depois, no projeto, habilite o conector nas threads. A URL é o segredo: não publique.

## Rollback
Desabilite/remova o conector no claude.ai, suspenda o serviço e **exclua a API key** no Odoo (Perfil > Segurança da conta). Para só bloquear escrita: remova `ODOO_ALLOW_WRITE`.
