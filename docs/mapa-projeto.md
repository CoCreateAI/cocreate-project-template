# Mapa do Projeto EK.OS

> Ultima atualizacao: 2026-03-31

## Estrutura Completa

```
EK.OS/
│
├── CLAUDE.md                                       — Contexto do projeto, estado, regras para IA
├── .env.example                                    — Template de variaveis de ambiente (porta 8004)
├── .gitignore                                      — Regras de exclusao Git
│
├── .github/
│   └── workflows/
│       └── deploy.yml                              — CI/CD pipeline (placeholder)
│
├── .claude/
│   ├── settings.local.json                         — Config local do Claude Code
│   └── commands/                                   — Agent commands (10 agentes adaptados para EK.OS)
│       ├── analisar-coerencia.md                   — Analise de coerencia entre specs e codigo
│       ├── atualizar-projeto.md                    — Sincroniza CLAUDE.md + mapa-projeto.md
│       ├── diretor-experiencias-web-generativas.md — Visual, animacoes, UX premium
│       ├── executar-tarefa.md                      — Implementacao tecnica (codigo, testes)
│       ├── licoes-aprendidas.md                    — Regra de Diamante (documenta erros e acertos)
│       ├── orquestrar.md                           — Orquestrador multi-agent
│       ├── preparar-missao.md                      — Cerebro de sessao (define missao e modo)
│       ├── processar-contexto.md                   — Material bruto → specs + ADRs
│       ├── refinar-conteudo.md                     — Copy executivo, narrativa B2B
│       └── status-agentes.md                       — Status da ultima orquestracao
│
├── scripts/
│   ├── deploy-backend.ps1                          — Deploy backend para Cloud Run (PowerShell)
│   ├── deploy-backend.sh                           — Deploy backend para Cloud Run (Bash)
│   ├── deploy-frontend.ps1                         — Deploy frontend para Cloud Run (PowerShell)
│   └── deploy-frontend.sh                          — Deploy frontend para Cloud Run (Bash)
│
├── docs/
│   ├── mapa-projeto.md                             — Este arquivo
│   │
│   ├── adr/                                        — Architecture Decision Records
│   │   └── adr-001-stack-choice.md                 — Stack: FastAPI + Next.js + Neo4j + Gemini
│   │
│   ├── raw/                                        — Material bruto (transcricoes, conceito)
│   │   └── ekos.txt                                — Conceito original do EK.OS (transcricao)
│   │
│   └── specs/                                      — Especificacoes SDD
│       ├── spec-000-constitution.md                — Constitution: visao, principios, glossario, entidades, personas
│       └── spec-001-estrategia-produto.md          — Estrategia: horizontal-first, 5 features, fases, posicionamento
│
├── src/
│   ├── backend/                                    — FastAPI + Neo4j (placeholder)
│   │   ├── Dockerfile                              — Container de producao (Python 3.11-slim, porta 8004)
│   │   ├── main.py                                 — FastAPI app entrypoint (placeholder)
│   │   ├── requirements.txt                        — Dependencias Python
│   │   └── app/
│   │       ├── __init__.py                         — Package init
│   │       ├── config.py                           — Configuracao via env vars (placeholder)
│   │       ├── database.py                         — Conexao Neo4j (placeholder)
│   │       ├── models.py                           — Pydantic models (placeholder)
│   │       ├── llm.py                              — Integracao Gemini (placeholder)
│   │       └── routes/
│   │           ├── __init__.py                     — Package init
│   │           └── health.py                       — Health check endpoint (placeholder)
│   │
│   ├── frontend/                                   — Next.js (placeholder)
│   │   ├── Dockerfile                              — Container de producao (placeholder)
│   │   ├── package.json                            — Dependencias npm (placeholder)
│   │   └── src/
│   │       └── app/
│   │           ├── layout.tsx                      — Root layout (placeholder)
│   │           └── page.tsx                        — Home page (placeholder)
│   │
│   └── shared/                                     — Tipos/utilitarios compartilhados (vazio — futuro)
│
└── tests/
    ├── backend/
    │   ├── conftest.py                             — Fixtures de teste (placeholder)
    │   └── pytest.ini                              — Configuracao pytest
    └── frontend/                                   — Testes frontend (vazio — futuro)
```

## Contagem de Arquivos

| Categoria | Quantidade |
|-----------|-----------|
| Specs | 2 (000, 001) |
| ADRs | 1 (001) |
| Agent Commands | 10 |
| Raw Material | 1 (ekos.txt) |
| Scripts | 4 (deploy) |
| Backend modules | 6 (placeholders) |
| Frontend pages | 2 (placeholders) |
| Testes | 2 (placeholders) |
| **Total** | ~30 arquivos |

## Status por Area

### Documentacao (~5%)
- [x] Constitution (spec-000) — visao, principios, glossario, entidades, personas, Triangulo Semantico
- [x] Estrategia de Produto (spec-001) — horizontal-first, 5 features, fases, posicionamento
- [ ] Arquitetura da Plataforma (spec-002) — pendente
- [ ] Assessment Flow (spec-003) — pendente
- [ ] Modelo de Dados Neo4j (spec-004) — pendente
- [ ] 9 specs adicionais (005-013) — pendentes

### Backend (0% — placeholders)
- [ ] FastAPI configurado
- [ ] Neo4j conectado
- [ ] Auth/multi-tenant
- [ ] Pipeline de ingestao
- [ ] Motor de deteccao
- [ ] Geracao de fichas

### Frontend (0% — placeholders)
- [ ] Next.js inicializado
- [ ] Landing page
- [ ] Upload interface
- [ ] Dashboard executivo
- [ ] Visualizacao de fichas

### Testes (0% — placeholders)
- [ ] Suite configurada
- [ ] Testes backend
- [ ] Testes frontend
