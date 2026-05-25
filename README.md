# cocreate-project-template

Template de projeto com metodologia **Spec-Driven Development (SDD)** e sistema multi-agent compatível com **Claude Code** (Anthropic) **e Codex CLI** (OpenAI).

Criado pela [CoCreate AI](https://www.cocreateai.com.br), comunidade de inteligência organizacional, ontologia corporativa e Enterprise Knowledge Systems.

---

## Primeiro uso? Abra o CoCreate Studio antes de qualquer coisa

O template vem com um **dashboard local** (`harness-ui/`) que tem um **guia passo a passo com verificação automática**: ele lê o filesystem em tempo real e te diz exatamente o que está feito e o que falta, com comando completo pra copiar em cada passo.

```powershell
cd harness-ui
npm install
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001). Vá direto para **"Comece aqui"** no menu (ou [/comece-aqui](http://localhost:3001/comece-aqui)). O dashboard cobre:

- Pré-requisitos da máquina (Node 20+, PowerShell 7+, Claude Code CLI)
- Setup do próprio dashboard
- Onboarding do projeto via Claude Code (`/iniciar-projeto` → `/processar-contexto` → `/preparar-missao`)
- Inicialização do `.env`, backend e frontend
- Próximos passos do ciclo SDD

Cada passo aparece com status real (✓ feito, → próximo, ○ pendente) baseado nos arquivos do seu repositório. Ideal para quem nunca viu este template antes.

> Não tem Node ainda? Instale primeiro: [nodejs.org/pt-br/download](https://nodejs.org/pt-br/download). O dashboard precisa dele para rodar.

---

## O que é isso?

Um template pronto para iniciar qualquer projeto de software usando:

- **Spec-Driven Development (SDD)**, specs definem o que construir, código é gerado a partir delas
- **Onboarding guiado**, skill `/iniciar-projeto` (gatilho zero) faz perguntas estruturadas para capturar perfil do usuário, tipo de projeto, escopo e macro processo do negócio antes de qualquer código
- **Sistema multi-agent**, skills + agentes especializados invocáveis em Claude Code (`/skill-name`) ou Codex (matching natural)
- **Compatível com Claude Code E Codex**, metodologia compartilhada, cascas separadas (`.claude/` e `.codex/`)
- **Estrutura padronizada**, pastas, templates de spec/ADR, configs, scripts de deploy

## Quick Start

### 1. Clone o template

```bash
git clone https://github.com/cocreateai/cocreate-project-template.git meu-projeto
cd meu-projeto
rm -rf .git
git init
```

### 2A. Se você usa Claude Code

```
# Abra no VS Code com Claude Code e rode:
/iniciar-projeto
```

A skill conduz **5 fases** de perguntas guiadas (perfil, tipo de projeto, escopo, macro processo, **análise estratégica de riscos + compliance + dependências**) e gera:
- `docs/raw/00-perfil-projeto.md` (briefing estruturado)
- `docs/macro-processo.md` (fluxo macro do negócio em Mermaid)
- `docs/analise-estrategica.md` (riscos + compliance + top 5 mitigações)
- Atualiza `CLAUDE.md` com perfil + tipo de projeto + stakeholders

Em seguida:
```
/processar-contexto       # gera spec-000-constitution.md + spec-001
/preparar-missao          # define a primeira missão concreta
```

### 2B. Se você usa Codex CLI

```bash
# Configure o Codex:
cp .codex/config.toml.example ~/.codex/config.toml

# Abra o Codex no projeto e diga em linguagem natural:
> "vamos iniciar este projeto"
```

A skill `iniciar-projeto` ativa por matching automático e conduz o mesmo fluxo. Depois:

```
> "processar o contexto"
> "qual a missão desta sessão?"
```

Veja [`AGENTS.md`](AGENTS.md) para detalhes do fluxo Codex.

## Fluxo SDD (qualquer plataforma)

```
Onboarding (iniciar-projeto — 5 fases)
  ↓
  1. Perfil do usuário
  2. Tipo de projeto
  3. Escopo inicial
  4. Macro processo do negócio
  5. Análise estratégica (riscos + compliance + dependências)
  ↓
docs/raw/00-perfil-projeto.md + docs/macro-processo.md + docs/analise-estrategica.md
  ↓
processar-contexto
  ↓
spec-000-constitution.md + spec-001-*.md
  ↓
preparar-missao → executar-tarefa → testes → deploy
```

## Filosofia: Camada Compartilhada + 2 Cascas

| Camada | Local | O que tem |
|--------|-------|-----------|
| **Compartilhada** (metodologia) | [`docs/`](docs/) | Specs, ADRs, bancos de perguntas, macro processo, templates |
| **Casca Claude Code** | [`.claude/`](.claude/) + [`CLAUDE.md`](CLAUDE.md) | Skills (`/skill-name`), agents, MCPs |
| **Casca Codex** | [`.codex/`](.codex/) + [`AGENTS.md`](AGENTS.md) | Skills (matching natural), config.toml |

A metodologia SDD vive em `docs/`. As cascas (`.claude/`, `.codex/`) são apenas o RUNNER. Trocar de plataforma não perde nada da metodologia.

Ver [`docs/adr/adr-001-compatibilidade-claude-codex.md`](docs/adr/adr-001-compatibilidade-claude-codex.md) para o racional completo.

## Princípios SDD

| Princípio | Descrição |
|-----------|-----------|
| **Onboarding primeiro** | Antes de specs, identifique perfil + tipo + escopo + macro processo |
| **Specs são verdade** | Código é gerado a partir das specs, não o contrário |
| **Constitution first** | spec-000 é o documento raiz (visão, princípios, glossário) |
| **Macro processo separado** | Fluxo do negócio fica em `docs/macro-processo.md` (evolutivo), não na constitution |
| **Mermaid obrigatório** | Diagramas em toda spec |
| **Plataforma-agnóstico** | Metodologia em `docs/`, ferramenta (Claude/Codex) é o RUNNER |
| **Regra de Ouro** | Ao final de toda fase: análise crítica + lista do que falta |
| **Regra de Diamante** | Registrar lições em toda falha ou ajuste inesperado |

## Skills

### Skill vs Subagent — você sempre roda a skill

Em Claude Code há dois conceitos que parecem o mesmo:

- **Skill** (`.claude/skills/X/SKILL.md`): workflow invocável com `/X`. É a "porta de entrada".
- **Subagent** (`.claude/agents/X.md`): persona especializada (modelo, tools, comportamento). **Você NÃO invoca diretamente** — a skill chama via `agent: X` no frontmatter.

**Regra prática**: sempre rode skills com `/`. Se a skill tem subagent associado, a delegação é transparente.

Exemplo: você roda `/preparar-missao` (skill). Ela tem `agent: preparar-missao` no frontmatter, então internamente delega ao subagent que executa com modelo Opus e foco em "cérebro de sessão". Você não precisa pensar no subagent.

No Codex, o equivalente é matching natural ("qual a missão desta sessão?" ativa a skill `preparar-missao`).

### Skills Claude Code (`.claude/skills/`, invocáveis com `/`)

| Skill | Papel | Nota |
|-------|-------|------|
| `/iniciar-projeto` | **GATILHO ZERO**, onboarding via perguntas guiadas | Gera briefing + macro processo |
| `/preparar-missao` | **Cérebro da sessão**, define missão e skills | Delega para subagent |
| `/orquestrar` | **Orquestrador**, coordena skills em paralelo | Delega para subagent |
| `/processar-contexto` | Raw → specs + ADRs | context: fork |
| `/executar-tarefa` | Implementa código (backend, frontend, testes) | |
| `/analisar-coerencia` | Verifica consistência specs vs código | context: fork |
| `/refinar-conteudo` | Melhora copy, textos, posicionamento | |
| `/diretor-experiencias` | Cria experiências visuais premium | |
| `/atualizar-projeto` | Sincroniza CLAUDE.md + mapa-projeto.md | |
| `/licoes-aprendidas` | Documenta erros e acertos (Regra de Diamante) | |
| `/status-agentes` | Consulta resultados da orquestração | |
| `/deploy` | Deploy para produção | Manual only |
| `/rodar-testes` | Executa suite de testes | Manual only |

### Skills Codex (`.codex/skills/`, ativação por matching)

| Skill | Equivalente Claude | Como ativar |
|-------|-------------------|-------------|
| `iniciar-projeto` | `/iniciar-projeto` | "vamos iniciar este projeto", "fazer onboarding" |
| `processar-contexto` | `/processar-contexto` | "processar o briefing", "gerar specs" |
| `preparar-missao` | `/preparar-missao` | "qual a missão desta sessão?" |

> **Roadmap**: portar as demais skills Claude para Codex após validação de uso real. Ver [`docs/adr/adr-001-compatibilidade-claude-codex.md`](docs/adr/adr-001-compatibilidade-claude-codex.md).

## Bancos de Perguntas Reutilizáveis

Em [`docs/perguntas/`](docs/perguntas/), tanto skills quanto humanos podem consumir:

- [`perfil-usuario.md`](docs/perguntas/perfil-usuario.md), quem é o usuário que conduz o projeto
- [`tipo-projeto.md`](docs/perguntas/tipo-projeto.md), interno/externo, categoria, modelo, estágio
- [`escopo-inicial.md`](docs/perguntas/escopo-inicial.md), problema, usuário, sucesso, fora do escopo
- [`macro-processo.md`](docs/perguntas/macro-processo.md), etapas, atores, inputs/outputs, IA
- [`analise-estrategica.md`](docs/perguntas/analise-estrategica.md), riscos + compliance (LGPD, GDPR, etc.) + dependências + mitigações

Ótimo material pedagógico para cursos SDD: alunos leem isoladamente e entendem a metodologia.

## Estrutura de Pastas

```
projeto/
├── CLAUDE.md                       — Contexto Claude Code
├── AGENTS.md                       — Contexto Codex (aponta para CLAUDE.md)
├── README.md                       — Este arquivo
├── .claude/skills/                 — Skills Claude (workflows /)
├── .claude/agents/                 — Subagents Claude
├── .claude/.mcp.json               — MCPs Claude (Context7)
├── .codex/skills/                  — Skills Codex (matching natural)
├── .codex/config.toml.example      — Template config Codex
├── docs/                           — CAMADA COMPARTILHADA
│   ├── macro-processo.md           — Fluxo macro do negócio (evolutivo)
│   ├── perguntas/                  — Bancos de perguntas reutilizáveis
│   ├── specs/                      — Especificações SDD (numeradas)
│   ├── adr/                        — Decisões arquiteturais
│   └── raw/                        — Material bruto (briefings)
├── src/
│   ├── backend/                    — API
│   ├── frontend/                   — Interface
│   └── shared/                     — Tipos compartilhados
├── tests/                          — Testes separados do código
└── scripts/                        — Deploy e infraestrutura
```

## Stack Sugerida

O template sugere uma stack moderna, mas você pode adaptar:

| Camada | Sugerida | Alternativas |
|--------|----------|-------------|
| Backend | Python + FastAPI | Node/Express, Go, Django |
| Frontend | Next.js + React + Tailwind | Vue/Nuxt, Angular, Svelte |
| Banco | Neo4j (grafo) | PostgreSQL, MongoDB, Supabase |
| AI/LLM | Google Gemini, OpenAI, Anthropic, Azure | qualquer |
| Deploy | Google Cloud Run | Vercel, AWS, Railway |

## Hierarquia de Specs

```
spec-000-constitution.md     ← documento raiz (visão, princípios, glossário, entidades)
  └── docs/macro-processo.md ← fluxo macro do negócio (referenciado pela constitution)
  └── spec-001-*.md          ← arquitetura / primeira feature
      ├── spec-002-*.md
      └── ...
```

## Para quem é este template?

- **Profissionais não-dev** que querem usar IA como executor técnico em projetos sérios
- **Devs experientes** que querem estruturar projetos com metodologia SDD
- **Educadores** que ensinam SDD com IA (este template é a base dos cursos CoCreate)
- **Times** que precisam de prática comum entre membros usando Claude Code, Codex, ou ambos

## Contribuindo

Este template é mantido pela comunidade CoCreate AI. Para sugestões ou melhorias:

1. Abra uma issue no repositório
2. Participe da comunidade em [cocreateai.com.br](https://www.cocreateai.com.br)

## Licença

MIT
