# Mapa do Projeto — {{PROJECT_NAME}}

> Última atualização: 2026-05-21

## Filosofia: Camada Compartilhada + 2 Cascas

Este template é compatível com **Claude Code** (Anthropic) e **Codex CLI** (OpenAI).

- **Conteúdo metodológico** (specs, ADRs, perguntas, macro processo, templates) vive em `docs/` — compartilhado entre as duas plataformas.
- **Casca Claude Code** em `.claude/` (skills + agents) + `CLAUDE.md` na raiz.
- **Casca Codex** em `.codex/` (skills) + `AGENTS.md` na raiz.

Ver [`docs/adr/adr-001-compatibilidade-claude-codex.md`](adr/adr-001-compatibilidade-claude-codex.md) para o racional completo.

## Estrutura

```
{{PROJECT_NAME}}/
|
├── CLAUDE.md                                       — Contexto do projeto para Claude Code
├── AGENTS.md                                       — Contexto do projeto para Codex (aponta para CLAUDE.md)
├── README.md                                       — Documentação pública do projeto
├── .env.example                                    — Template de variáveis de ambiente
├── .gitignore                                      — Regras de exclusão Git
|
├── .github/
│   └── workflows/deploy.yml                        — CI/CD pipeline (placeholder)
|
├── .claude/                                        — CASCA CLAUDE CODE
│   ├── .mcp.json                                   — MCPs configurados (Context7)
│   ├── settings.json                               — Settings versionados (hooks da camada Harness)
│   ├── settings.local.json                         — Config local do Claude Code
│   ├── pending-validations.md                      — Fila de specs/ADRs editados aguardando /analisar-coerencia (gerada por hook)
│   ├── hooks/                                      — CAMADA HARNESS — scripts de hooks (ver ADR-002)
│   │   ├── README.md                               — Contrato dos hooks
│   │   ├── post-spec-edit.ps1 / .sh                — PostToolUse: registra spec editada
│   │   └── stop-session.ps1 / .sh                  — Stop: gera lembrete de fim de sessão
│   ├── traces/                                     — CAMADA HARNESS — log diário de execução (ver ADR-002)
│   │   ├── README.md                               — Formato e consumidores
│   │   ├── .gitignore                              — Traces não versionados
│   │   └── YYYY-MM-DD.md                           — Trace do dia (criado sob demanda)
│   ├── skills/                                     — Skills (workflows invocáveis com /)
│   │   ├── iniciar-projeto/SKILL.md                — GATILHO ZERO: onboarding via perguntas guiadas
│   │   ├── processar-contexto/SKILL.md             — Gatilho 1: raw → specs (após /iniciar-projeto)
│   │   ├── preparar-missao/SKILL.md                — Cérebro de sessão
│   │   ├── orquestrar/SKILL.md                     — Orquestrador multi-agent
│   │   ├── executar-tarefa/SKILL.md                — Implementação técnica + loop de correção (até 3 tentativas)
│   │   ├── analisar-coerencia/SKILL.md             — Gap analysis specs vs código (lê pending-validations.md)
│   │   ├── refinar-conteudo/SKILL.md               — Copy e narrativa
│   │   ├── diretor-experiencias/SKILL.md           — Visual e UX premium
│   │   ├── atualizar-projeto/SKILL.md              — Sincroniza CLAUDE.md + mapa
│   │   ├── licoes-aprendidas/SKILL.md              — Regra de Diamante (lê traces para identificar falhas)
│   │   ├── status-agentes/SKILL.md                 — Status da orquestração + histórico via traces
│   │   ├── deploy/SKILL.md                         — Deploy produção (manual only)
│   │   └── rodar-testes/SKILL.md                   — Executar testes (manual only)
│   └── agents/                                     — Subagents (personas especializadas)
│       ├── preparar-missao.md                      — Planner: analisa missão
│       └── orquestrar.md                           — Orquestrador: coordena skills em paralelo
|
├── .codex/                                         — CASCA CODEX (OpenAI)
│   ├── config.toml.example                         — Template de config Codex (MCP, paths)
│   └── skills/                                     — Skills portadas (ativação por matching)
│       ├── iniciar-projeto/SKILL.md                — Espelho da skill Claude
│       ├── processar-contexto/SKILL.md             — Espelho da skill Claude
│       └── preparar-missao/SKILL.md                — Espelho da skill Claude
|
├── harness-ui/                                     — CAMADA HARNESS — Dashboard local Next.js (ver ADR-002)
│   ├── package.json                                — Next 14 + React 18 + Tailwind + Mermaid
│   ├── README.md                                   — Como rodar (npm install + npm run dev na 3001)
│   ├── app/                                        — App Router
│   │   ├── page.tsx                                — Home: hero + Mermaid + cards de estado
│   │   ├── skills/                                 — Lista e detalhe de skills
│   │   ├── agents/                                 — Lista e detalhe de subagents
│   │   ├── runtime/                                — Timeline de traces, pendências, missão
│   │   ├── specs/                                  — Specs e ADRs com status inferido
│   │   └── guia/                                   — Guia de uso do template
│   ├── components/                                 — Nav, Mermaid, Markdown, badges
│   └── lib/                                        — Leitores filesystem (skills, traces, specs)
|
├── scripts/
│   ├── deploy-backend.ps1 / .sh                    — Deploy backend
│   └── deploy-frontend.ps1 / .sh                   — Deploy frontend
|
├── docs/                                           — CAMADA COMPARTILHADA
│   ├── mapa-projeto.md                             — Este arquivo
│   ├── macro-processo.md                           — Macro processo do negócio (gerado por /iniciar-projeto, EVOLUTIVO)
│   ├── macro-processo.template.md                  — Template usado pela skill
│   ├── analise-estrategica.md                      — Riscos + compliance + dependências (gerado por /iniciar-projeto Fase 5, EVOLUTIVO)
│   ├── analise-estrategica.template.md             — Template usado pela skill
│   ├── perguntas/                                  — Bancos de perguntas reutilizáveis
│   │   ├── perfil-usuario.md                       — Quem é o usuário
│   │   ├── tipo-projeto.md                         — Interno/externo, categoria, modelo, estágio
│   │   ├── escopo-inicial.md                       — Problema, usuário, sucesso, fora do escopo
│   │   ├── macro-processo.md                       — Etapas, atores, inputs/outputs
│   │   └── analise-estrategica.md                  — Riscos + compliance + dependências + mitigações
│   ├── identidade-visual.json                      — Identidade visual do PROJETO (logo path, paleta, tipografia). Editado via CoCreate Studio (/projeto)
│   ├── assets/
│   │   └── brand/
│   │       └── logo.<ext>                          — Logo do projeto (PNG/SVG/JPG/WebP). Servida pelo dashboard via /api/identity/logo/preview
│   ├── adr/
│   │   ├── ADR-TEMPLATE.md                                  — Template para decisões arquiteturais
│   │   ├── adr-001-compatibilidade-claude-codex.md          — Decisão: camada compartilhada + 2 cascas
│   │   └── adr-002-harness-engineering-complemento-sdd.md   — Decisão: adotar Harness como camada aditiva ao SDD
│   ├── raw/                                        — Material bruto (briefings, transcrições)
│   │   └── README.md                               — Instruções
│   ├── exemplos/                                   — Exemplos didáticos de output das skills
│   │   ├── README.md                               — Como usar os exemplos
│   │   ├── 00-perfil-projeto.example.md            — Exemplo de briefing (fases 1-3 de /iniciar-projeto)
│   │   ├── macro-processo.example.md               — Exemplo de macro processo (fase 4 de /iniciar-projeto)
│   │   └── analise-estrategica.example.md          — Exemplo de análise estratégica (fase 5 de /iniciar-projeto)
│   └── specs/
│       ├── spec-000-constitution.template.md        — Template da constitution (linka macro-processo.md)
│       └── SPEC-TEMPLATE.md                         — Template genérico de spec
|
├── src/
│   ├── backend/                                    — API (Dockerfile, main.py, app/)
│   ├── frontend/                                   — Interface web (Dockerfile, package.json)
│   └── shared/                                     — Tipos/utilitários compartilhados
|
└── tests/
    ├── backend/                                    — Testes backend (conftest.py, pytest.ini)
    └── frontend/                                   — Testes frontend
```

## Fluxo de Início (qualquer plataforma)

1. **`/iniciar-projeto`** (Claude) ou **"iniciar projeto"** (Codex) — onboarding em 5 fases: perfil + tipo + escopo + macro processo + análise estratégica. Gera `docs/raw/00-perfil-projeto.md` + `docs/macro-processo.md` + `docs/analise-estrategica.md` + atualiza `CLAUDE.md`.
2. **Revise os outputs** — perfil, tipo de projeto, briefing, macro processo, riscos + compliance.
3. **(Opcional) Adicione briefings adicionais** em `docs/raw/`.
4. **`/processar-contexto`** (Claude) ou **"processar contexto"** (Codex) — gera `spec-000-constitution.md` + `spec-001-*.md`.
5. **`/preparar-missao`** (Claude) ou **"qual a missão desta sessão"** (Codex) — define a primeira missão concreta.

## Metodologia: Spec-Driven Development (SDD)

| Princípio | Descrição |
|-----------|-----------|
| **Onboarding primeiro** | Antes de specs, identifique perfil + tipo + escopo + macro processo |
| **Specs são verdade** | Código é gerado a partir das specs, não o contrário |
| **Constitution first** | spec-000 é o documento raiz (visão, princípios, glossário) |
| **Macro processo separado** | Fluxo do negócio fica em `docs/macro-processo.md` (evolutivo), não na constitution |
| **Mermaid obrigatório** | Diagramas em toda spec e artefato arquitetural |
| **Plataforma-agnóstico** | Metodologia vive em `docs/`, ferramenta (Claude/Codex) é o RUNNER |
| **Regra de Ouro** | Ao final de toda fase: análise crítica + lista do que falta |
| **Regra de Diamante** | Documentar lições aprendidas em toda falha ou ajuste |

## Camada Harness (complemento ao SDD)

Adotada em 2026-05-21 (ver [`adr/adr-002-harness-engineering-complemento-sdd.md`](adr/adr-002-harness-engineering-complemento-sdd.md)). Componentes:

| Componente | O que faz | Onde |
|------------|-----------|------|
| **Hooks de sinal** | PostToolUse registra specs/ADRs editados em `pending-validations.md`; Stop gera lembrete | `.claude/hooks/`, `.claude/settings.json` |
| **Traces estruturados** | Toda skill não-readonly registra início/fim em markdown diário | `.claude/traces/YYYY-MM-DD.md` |
| **Loop de correção** | `/executar-tarefa` tenta corrigir testes falhados até 3 vezes antes de pedir ajuda | Skill `/executar-tarefa` |
| **CoCreate Studio** | Dashboard local que lê tudo em runtime (skills, agents, traces, pendências, specs). Mermaid da arquitetura regenerado a cada refresh | [`harness-ui/`](../harness-ui/) (Next.js, porta 3001) |

**Hooks são plataforma-específicos** (apenas Claude Code). Traces, loop de correção e CoCreate Studio funcionam em qualquer plataforma — CoCreate Studio lê os mesmos arquivos do `.claude/`.
