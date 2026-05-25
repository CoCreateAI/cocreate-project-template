# {{PROJECT_NAME}} — Contexto do Projeto

> Template gerado pelo **cocreate-project-template** — metodologia Spec-Driven Development (SDD) da CoCreate AI.
> Última atualização: {{DATE}}

## Como Começar

> **Primeiro uso?** Siga estes passos:
>
> 1. **Rode `/iniciar-projeto`** (GATILHO ZERO) — a skill conduz 5 fases de perguntas guiadas: perfil do usuário, tipo de projeto, escopo inicial, macro processo do negócio e análise estratégica (riscos + compliance + dependências). Gera `docs/raw/00-perfil-projeto.md`, `docs/macro-processo.md`, `docs/analise-estrategica.md`, e preenche este CLAUDE.md.
> 2. **Revise os outputs** — perfil, tipo de projeto, briefing inicial, macro processo e análise estratégica
> 3. **(Opcional) Adicione material extra** em `docs/raw/` — transcrições, briefings adicionais, documentos de visão
> 4. **Rode `/processar-contexto`** — a IA consome o briefing estruturado e gera a spec-000 (constitution) + spec-001 + propõe estrutura
> 5. **Revise as specs geradas** — ajuste o que for necessário
> 6. **Rode `/preparar-missao`** para começar a implementar
>
> O fluxo completo: **Onboarding → Raw → Specs → Plan → Código → Testes → Deploy**
>
> **Você usa Codex (OpenAI) em vez de Claude Code?** O template é compatível com ambas as plataformas. Veja [`AGENTS.md`](AGENTS.md) na raiz para o fluxo Codex equivalente.

## Perfil do Usuário

> Preenchido por `/iniciar-projeto`. Herda do `~/.claude/CLAUDE.md` global como default; sobrescreve aqui quando necessário.

| Campo | Valor |
|-------|-------|
| **Nome** | {{USER_NAME}} |
| **Papel** | {{USER_ROLE}} |
| **Contexto** | {{USER_CONTEXT}} |
| **Nível técnico** | {{USER_TECH_LEVEL}} |
| **Como usa IA** | {{USER_IA_MODE}} |
| **Detalhe técnico desejado** | {{USER_DETAIL_LEVEL}} |
| **Idioma primário** | {{USER_LANG}} |
| **Restrições (não fazer)** | {{USER_DONT}} |
| **Preferências (sempre fazer)** | {{USER_ALWAYS}} |

## Tipo de Projeto

> Preenchido por `/iniciar-projeto`.

| Campo | Valor |
|-------|-------|
| **Orientação** | {{Interno / Externo / Híbrido}} |
| **Categoria** | {{CATEGORIA}} |
| **Modelo** | {{B2B / B2C / B2G / B2B2C / Open source / Educacional / Consultoria / N/A}} |
| **Estágio** | {{Ideia / Discovery / MVP / Em evolução / Refactor / Manutenção}} |
| **Deadline** | {{DATA ou N/A}} |
| **Orçamento** | {{Zero / Baixo / Médio / Alto / Sem limite}} |
| **Stack obrigatória** | {{LISTA ou Nenhuma}} |
| **Compliance** | {{LISTA ou Nenhum}} |
| **Integrações obrigatórias** | {{LISTA ou Nenhuma}} |

## Macro Processo do Negócio

> Diagrama Mermaid + descrição das etapas em [`docs/macro-processo.md`](docs/macro-processo.md). Arquivo evolutivo — atualize sempre que o entendimento do processo mudar.

## Análise Estratégica

> Riscos + compliance + dependências + top 5 mitigações em [`docs/analise-estrategica.md`](docs/analise-estrategica.md). Gerado pela Fase 5 da skill `/iniciar-projeto`. Arquivo evolutivo — atualize quando o cenário mudar (nova fase, novo mercado, mudança regulatória).

## Identificação

| Campo | Valor |
|-------|-------|
| **Projeto** | {{PROJECT_NAME}} |
| **Descrição** | {{DESCRIPTION}} |
| **Líder** | {{LEADER_NAME}} ({{LEADER_ROLE}}) |
| **Início** | {{START_DATE}} |
| **Deadline MVP** | {{DEADLINE}} |

## Visão

{{PROJECT_VISION — descreva em 1-2 frases a visão do projeto}}

## Missão Corrente

| Campo | Valor |
|-------|-------|
| **Foco** | Onboarding inicial: identificar perfil do usuário, classificar tipo de projeto, capturar escopo e montar macro processo |
| **Tarefas Prioritárias** | 1. Rodar /iniciar-projeto  2. Revisar outputs (perfil, macro-processo, briefing)  3. Rodar /processar-contexto |
| **Agentes Necessários** | `/iniciar-projeto` |
| **Modo** | Rápido |
| **Restrições** | Fase de descoberta — sem código ainda, sem especificação técnica ainda |
| **Atualizado em** | {{DATE}} |

> Use `/preparar-missao` para definir o foco. O comando recomenda **Modo Rápido** (execução direta) ou **Modo Orquestrado** (subagentes em paralelo) conforme a complexidade.

## Stack Técnica (Sugerida)

> **Nota**: Esta é a stack sugerida pelo template. Adapte conforme a necessidade do projeto. A IA usa esta tabela para saber quais tecnologias utilizar na implementação.

| Camada | Tecnologia Sugerida | Alternativas | Status |
|--------|-------------------|-------------|--------|
| **Frontend** | Next.js, React, Tailwind CSS | Vue/Nuxt, Angular, Svelte | Não iniciado |
| **Backend** | Python 3.11, FastAPI | Node.js/Express, Go/Gin, Django | Não iniciado |
| **Banco de Dados** | Neo4j Aura (grafo) | PostgreSQL, MongoDB, Supabase | Não iniciado |
| **AI/LLM** | Google Gemini (Flash + Pro + Embedding) | OpenAI GPT, Anthropic Claude, Azure OpenAI | Não iniciado |
| **Deploy** | Google Cloud Run + Docker | Vercel, AWS, Azure, Railway | Não iniciado |
| **Ferramentas** | Git/GitHub, Claude Code | — | Em uso |

## Estrutura de Pastas

```
{{PROJECT_NAME}}/
  CLAUDE.md                                  — Contexto do projeto para Claude Code
  AGENTS.md                                  — Contexto do projeto para Codex (OpenAI) — espelho do CLAUDE.md
  README.md                                  — Documentação pública do projeto
  .env.example                               — Template de variáveis de ambiente
  .gitignore                                 — Regras de exclusão Git
  .github/
    workflows/deploy.yml                     — CI/CD pipeline (placeholder)
  .claude/                                   — CASCA CLAUDE CODE
    .mcp.json                                — MCPs configurados (Context7)
    settings.json                            — Settings versionados (hooks da camada Harness)
    settings.local.json                      — Config local do Claude Code
    pending-validations.md                   — Fila gerada por hook (specs editadas aguardando /analisar-coerencia)
    hooks/                                   — CAMADA HARNESS — scripts de hooks
      README.md                              — Contrato dos hooks
      post-spec-edit.ps1 / .sh               — PostToolUse: registra spec editada
      stop-session.ps1 / .sh                 — Stop: gera lembrete de fim de sessão
    traces/                                  — CAMADA HARNESS — log diário de execução
      README.md                              — Formato e consumidores
      .gitignore                             — Traces não versionados
      YYYY-MM-DD.md                          — Trace do dia (criado sob demanda)
    skills/                                  — Skills (workflows invocáveis com /)
      iniciar-projeto/SKILL.md               — GATILHO ZERO: perguntas guiadas → briefing + macro processo
      processar-contexto/SKILL.md            — Gatilho 1: raw → specs (context: fork)
      executar-tarefa/SKILL.md               — Implementação de código + loop de correção (até 3 tentativas)
      refinar-conteudo/SKILL.md              — Copy e posicionamento
      analisar-coerencia/SKILL.md            — Gap analysis (context: fork) + lê pending-validations.md
      atualizar-projeto/SKILL.md             — Sync CLAUDE.md + mapa
      licoes-aprendidas/SKILL.md             — Regra de Diamante (lê traces para identificar falhas)
      diretor-experiencias/SKILL.md          — Visual e UX premium
      status-agentes/SKILL.md                — Status da orquestração + histórico via traces
      deploy/SKILL.md                        — Deploy para produção (manual only)
      rodar-testes/SKILL.md                  — Executar testes (manual only)
    agents/                                  — Subagents (personas especializadas)
      preparar-missao.md                     — Planner: analisa missão, recomenda modo
      orquestrar.md                          — Orquestrador: coordena skills em paralelo
  .codex/                                    — CASCA CODEX (OpenAI)
    config.toml.example                      — Template de config Codex
    skills/                                  — Skills equivalentes (formato Codex)
      iniciar-projeto/SKILL.md               — Espelho da skill Claude
      processar-contexto/SKILL.md            — Espelho da skill Claude
      preparar-missao/SKILL.md               — Espelho da skill Claude
  harness-ui/                                — CAMADA HARNESS — Dashboard Next.js local (porta 3001)
    package.json                             — Next 14 + React 18 + Tailwind + Mermaid
    README.md                                — Como rodar
    app/                                     — Páginas (home, skills, agents, runtime, specs, guia)
    components/                              — Nav, Mermaid, Markdown, badges
    lib/                                     — Leitores filesystem (skills, traces, specs)
  scripts/
    deploy-backend.ps1 / .sh                 — Deploy backend
    deploy-frontend.ps1 / .sh                — Deploy frontend
  docs/                                      — CAMADA COMPARTILHADA (Claude + Codex consomem o mesmo)
    mapa-projeto.md                          — Mapa completo do projeto
    macro-processo.md                        — Macro processo do negócio (Mermaid + descrição) — EVOLUTIVO
    macro-processo.template.md               — Template usado por /iniciar-projeto Fase 4
    analise-estrategica.md                   — Riscos + compliance + dependências — EVOLUTIVO
    analise-estrategica.template.md          — Template usado por /iniciar-projeto Fase 5
    perguntas/                               — Bancos de perguntas reutilizáveis
      perfil-usuario.md                      — Quem é o usuário
      tipo-projeto.md                        — Interno/externo, categoria, modelo, estágio
      escopo-inicial.md                      — Problema, usuário, sucesso, fora do escopo
      macro-processo.md                      — Etapas, atores, inputs/outputs
      analise-estrategica.md                 — Riscos + compliance + mitigações
    exemplos/                                — Exemplos didáticos de output das skills
      00-perfil-projeto.example.md
      macro-processo.example.md
      analise-estrategica.example.md
    adr/                                     — Architecture Decision Records
    raw/                                     — Material bruto (briefings, transcrições, contexto)
    specs/                                   — Especificações SDD (numeradas: spec-NNN-titulo.md)
  src/
    backend/                                 — API (placeholder)
    frontend/                                — Interface web (placeholder)
    shared/                                  — Tipos/utilitários compartilhados (futuro)
  tests/
    backend/                                 — Testes backend
    frontend/                                — Testes frontend
```

## Glossário Canônico

> Preencha com os termos específicos do seu domínio. A spec-000 (constitution) deverá conter o glossário completo.

| Termo | Definição |
|-------|-----------|
| **{{TERM_1}}** | {{DEFINITION_1}} |
| **{{TERM_2}}** | {{DEFINITION_2}} |

## Regras do Projeto

### Metodológicas (obrigatórias)
1. **SDD (Spec-Driven Development)** — specs são verdade, código é gerado a partir delas
2. **Mermaid obrigatório** — em toda spec e artefato arquitetural
3. **Regra de Ouro** — ao final de toda fase: análise crítica + lista do que falta
4. **Regra de Diamante** — registrar lições em toda falha ou ajuste inesperado
5. **Testes em tests/** — nunca misturar testes com código fonte
6. **PT-BR como idioma primário** — EN quando necessário

### De Negócio (preencher conforme o projeto)
7. {{RULE_1 — ex: "Neo4j é o ÚNICO banco — sem bancos relacionais"}}
8. {{RULE_2 — ex: "Multi-tenant desde o início"}}
9. {{RULE_3 — ex: "API-first — frontend consume API, nunca acessa banco direto"}}

## Sistema de Skills e Agents

O projeto usa a arquitetura moderna do Claude Code com **skills** (workflows) e **subagents** (personas especializadas).

### Skill vs Subagent — você sempre roda a skill

Confusão comum: os nomes coincidem. Funciona assim:

| Elemento | O que é | Como invocar |
|----------|---------|--------------|
| **Skill** (`.claude/skills/X/SKILL.md`) | Workflow visível, "porta de entrada" do fluxo de trabalho | `/X` no chat (slash command) |
| **Subagent** (`.claude/agents/X.md`) | Persona especializada (modelo, tools, comportamento focado) chamada por uma skill | **Você NÃO invoca diretamente** — a skill chama via `agent: X` no frontmatter |

**Regra prática**: você sempre roda a **skill** com `/`. Se a skill tem `agent: X` no frontmatter, ela delega a execução ao subagent automaticamente — é transparente para você.

Exemplo: `/preparar-missao` é a skill. O frontmatter dela diz `agent: preparar-missao`. Quando você roda `/preparar-missao`, a skill chama o subagent `preparar-missao` (`.claude/agents/preparar-missao.md`) que executa o trabalho pesado com modelo Opus, tools restritas e comportamento focado em "cérebro da sessão".

No Codex (CLI da OpenAI), o equivalente é ativação por matching natural — ver [`AGENTS.md`](AGENTS.md) na raiz.

### Skills (`.claude/skills/` — invocáveis com /)

| Skill | Quando usar | Nota |
|-------|-------------|------|
| `/iniciar-projeto` | Primeira vez no projeto (GATILHO ZERO) | Perguntas guiadas → briefing + macro processo |
| `/preparar-missao` | Início de sessão | Delega para subagent |
| `/orquestrar` | Missões complexas multi-área | Delega para subagent |
| `/processar-contexto` | Material em `docs/raw/` → specs (após /iniciar-projeto) | context: fork |
| `/analisar-coerencia` | Mudança grande que pode conflitar | context: fork |
| `/executar-tarefa` | Implementação de código | inline |
| `/refinar-conteudo` | Copy, textos, posicionamento | inline |
| `/diretor-experiencias` | Componentes visuais, UX premium | inline |
| `/atualizar-projeto` | Mudanças significativas | inline |
| `/licoes-aprendidas` | Regra de Diamante | inline |
| `/status-agentes` | Status da orquestração | inline |
| `/deploy` | Publicar em produção | MANUAL ONLY |
| `/rodar-testes` | Executar testes | MANUAL ONLY |

### Subagent Types (`.claude/agents/` — usados internamente pelas skills)

| Agent | Usado por |
|-------|-----------|
| `preparar-missao` | skill `/preparar-missao` (via `agent: preparar-missao`) |
| `orquestrar` | skill `/orquestrar` (via `agent: orquestrar`) |

### MCPs Configurados

| MCP | Função |
|-----|--------|
| **Context7** | Busca documentação atualizada de qualquer tecnologia/biblioteca |

### Camada Harness (complemento ao SDD)

Adotada em 2026-05-21 (ver [`docs/adr/adr-002-harness-engineering-complemento-sdd.md`](docs/adr/adr-002-harness-engineering-complemento-sdd.md)). 3 componentes aditivos:

| Componente | O que faz |
|------------|-----------|
| **Hooks de sinal** ([`.claude/hooks/`](.claude/hooks/)) | PostToolUse registra specs/ADRs editados em `.claude/pending-validations.md`; Stop gera `.claude/session-end-hint.md`. Hooks **não disparam skills automaticamente** — apenas registram sinais |
| **Traces** ([`.claude/traces/`](.claude/traces/)) | Toda skill não-readonly registra início e fim em `.claude/traces/YYYY-MM-DD.md`. `/status-agentes` lê esse histórico |
| **Loop de correção** ([`.claude/skills/executar-tarefa/`](.claude/skills/executar-tarefa/)) | `/executar-tarefa` tenta corrigir testes falhados até 3 vezes antes de pedir ajuda, registrando cada tentativa no trace |
| **CoCreate Studio** ([`harness-ui/`](harness-ui/)) | Dashboard local Next.js que lê tudo do filesystem em runtime: skills, agents, traces, pendências, specs, Mermaid da arquitetura regenerado. Roda em `cd harness-ui && npm install && npm run dev` na porta 3001 |

**Observabilidade**: opções complementares
- No terminal: rode `/status-agentes` para resumo curto das últimas execuções
- No navegador: abra o CoCreate Studio ([http://localhost:3001](http://localhost:3001)) para visão completa com timeline, diagramas e estado vivo

### Modos de Execução

**Modo Rápido** (padrão):
```
/preparar-missao → aprova → execução direta → /atualizar-projeto (se necessário)
```

**Modo Orquestrado** (missões complexas):
```
/preparar-missao → /orquestrar → subagentes em paralelo → consolidação
```

## Estado Atual

### Primeiros Passos
- [ ] `/iniciar-projeto` executado — perfil, tipo de projeto, escopo, macro processo e análise estratégica capturados
- [ ] `docs/macro-processo.md` revisado
- [ ] `docs/analise-estrategica.md` revisado (top 3 riscos + compliance confirmados)
- [ ] `docs/raw/00-perfil-projeto.md` revisado
- [ ] (Opcional) Briefings adicionais colocados em `docs/raw/`
- [ ] `/processar-contexto` executado — spec-000 gerada
- [ ] spec-000 (constitution) revisada e aprovada
- [ ] Stack definida na tabela acima
- [ ] `.env` configurado a partir do `.env.example`
- [ ] Primeiro endpoint funcional (health check)
- [ ] Primeiro teste passando

### Documentação
- [ ] spec-000-constitution.md — visão, princípios, glossário, entidades
- [ ] spec-001-*.md — primeira spec de feature/arquitetura

### Backend
- [ ] API configurada e rodando

### Frontend
- [ ] Projeto inicializado

### Testes
- [ ] Suite configurada

### Deploy
- [ ] Container funcional

## Próximos Passos

> Preencha conforme o projeto evolui. Use prioridades P0 (crítico), P1 (importante), P2 (futuro).

### P0 — Fundação
1. Onboarding inicial (`/iniciar-projeto`) — perfil, tipo, escopo, macro processo
2. Processar contexto (`/processar-contexto`) — spec-000 + spec-001 a partir do raw
3. Definir constitution (spec-000) — revisão e refinamento
4. Definir arquitetura (spec-001 ou spec-002)

### P1 — MVP
4. (a definir após specs iniciais)

## Stakeholders

| Pessoa | Papel | Foco |
|--------|-------|------|
| **{{LEADER_NAME}}** | {{LEADER_ROLE}} | {{LEADER_FOCUS}} |
