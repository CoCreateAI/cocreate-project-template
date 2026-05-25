# AGENTS.md — Contexto do Projeto para Codex (OpenAI)

> Este arquivo é o equivalente do `CLAUDE.md` para o **Codex CLI** da OpenAI.
> Conteúdo metodológico, regras do projeto e estado atual **estão no [`CLAUDE.md`](CLAUDE.md)** — este arquivo aponta para lá e adiciona apenas o que é específico do Codex.

## Primeiro: leia CLAUDE.md

Antes de qualquer trabalho neste projeto, leia o [`CLAUDE.md`](CLAUDE.md) na raiz. Ele contém:

- Perfil do usuário (quem conduz o projeto)
- Tipo de projeto (interno/externo, categoria, estágio)
- Macro processo do negócio (link para [`docs/macro-processo.md`](docs/macro-processo.md))
- Stack técnica
- Regras metodológicas (SDD, Regra de Ouro, Regra de Diamante)
- Estado atual e próximos passos

**NÃO duplicar conteúdo aqui** — se algo precisar mudar, atualize o `CLAUDE.md` e o `AGENTS.md` continua coerente porque aponta pra lá.

## Diferenças operacionais Codex vs Claude Code

| Aspecto | Claude Code | Codex CLI |
|---------|------------|-----------|
| Arquivo raiz de contexto | `CLAUDE.md` | `AGENTS.md` (este arquivo) |
| Skills invocáveis | `/skill-name` explícito (`.claude/skills/`) | Ativação automática por matching (`.codex/skills/` ou `~/.agents/skills/`) |
| Subagentes | `.claude/agents/*.md` (definição YAML) | Spawned explicitamente quando solicitado |
| MCP | `.claude/.mcp.json` | `~/.codex/config.toml` ou `.codex/config.toml` |
| Hooks (camada Harness) | `.claude/hooks/` + `.claude/settings.json` | **Não suportado** — ver nota abaixo |

## Camada Harness no Codex

O template adotou em 2026-05-21 uma camada Harness sobre o SDD (ver [`docs/adr/adr-002-harness-engineering-complemento-sdd.md`](docs/adr/adr-002-harness-engineering-complemento-sdd.md)). Comportamento por componente no Codex:

| Componente | Funciona no Codex? | Como |
|------------|-------------------|------|
| **Loop de correção** em `/executar-tarefa` (até 3 tentativas antes de pedir ajuda) | Sim | Via instrução na skill — funciona igual ao Claude |
| **Traces estruturados** em `.claude/traces/YYYY-MM-DD.md` | Sim | Via instrução na skill — escreva nos mesmos arquivos para compatibilidade |
| **Hooks** (PostToolUse, Stop) | **Não** | Codex não tem sistema de hooks equivalente. Usuário precisa rodar `/analisar-coerencia` manualmente após editar specs. Sem lembrete automático de fim de sessão |

**Workaround para o usuário Codex**: após editar qualquer spec, ADR, CLAUDE.md, AGENTS.md, mapa-projeto.md, macro-processo.md ou analise-estrategica.md, rode `/analisar-coerencia` manualmente. No Claude Code o hook faz isso automaticamente registrando a pendência.

## CoCreate Studio (dashboard local)

O template inclui [`harness-ui/`](harness-ui/) — app Next.js que lê o filesystem em runtime e mostra skills, subagents, traces, pendências, specs e a arquitetura de invocação (diagrama Mermaid regenerado a cada refresh).

Funciona igual no Claude Code e no Codex. Para usar:

```powershell
cd harness-ui
npm install
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001). Read-only: nunca escreve nos arquivos do template. Como traces e skills/agents são compartilhados, basta seguir a convenção de escrever em `.claude/traces/YYYY-MM-DD.md` que o dashboard mostra normalmente, independente da plataforma que escreveu.

## Skills disponíveis para Codex

Skills equivalentes (portadas) estão em [`.codex/skills/`](.codex/skills/):

| Skill | Equivalente Claude | Quando ativa |
|-------|-------------------|--------------|
| `iniciar-projeto` | `/iniciar-projeto` | Onboarding inicial — usuário pede para "iniciar projeto", "começar onboarding", "fazer setup inicial" |
| `processar-contexto` | `/processar-contexto` | Após onboarding ou quando há material em `docs/raw/` para virar specs |
| `preparar-missao` | `/preparar-missao` | Início de sessão, definir missão |

**Para invocar uma skill no Codex**: descreva a tarefa em linguagem natural. Ex:
- "vamos iniciar este projeto novo" → ativa `iniciar-projeto`
- "processa o briefing em docs/raw" → ativa `processar-contexto`
- "qual a missão desta sessão?" → ativa `preparar-missao`

As demais skills do Claude Code ainda não foram portadas para Codex (roadmap). Por enquanto:
- Use as skills portadas listadas acima
- Para tarefas não cobertas, atue diretamente seguindo as regras do `CLAUDE.md`

## Camada compartilhada (Claude + Codex)

Tudo em [`docs/`](docs/) é compartilhado entre as duas plataformas:

- [`docs/perguntas/`](docs/perguntas/) — banco de perguntas reutilizáveis (perfil, tipo, escopo, macro processo)
- [`docs/macro-processo.md`](docs/macro-processo.md) — fluxo macro do negócio (gerado por `iniciar-projeto`)
- [`docs/specs/`](docs/specs/) — especificações SDD
- [`docs/adr/`](docs/adr/) — Architecture Decision Records
- [`docs/raw/`](docs/raw/) — material bruto consumido por `processar-contexto`

**Skills Codex referenciam os mesmos arquivos** que as skills Claude. Mudar uma pergunta em `docs/perguntas/perfil-usuario.md` afeta os dois lados automaticamente.

## Configuração do Codex (local)

Copie [`.codex/config.toml.example`](.codex/config.toml.example) para `~/.codex/config.toml` ou `.codex/config.toml` (local ao projeto) e ajuste paths/MCPs conforme seu ambiente.

## Fluxo recomendado no Codex

1. Diga "iniciar projeto" → skill `iniciar-projeto` ativa, conduz perguntas, gera briefing + macro processo
2. Revise os outputs
3. Diga "processar contexto" → skill `processar-contexto` ativa, gera spec-000 + spec-001
4. Revise as specs
5. Diga "qual a missão desta sessão?" → skill `preparar-missao` ativa, define próxima tarefa
6. A partir daqui, opere normalmente — o Codex tem o contexto do projeto via `AGENTS.md` + `CLAUDE.md`

## Acentuação e estilo PT-BR

**Regra crítica herdada do CLAUDE.md global do usuário**: sempre use acentuação correta em PT-BR (acentos, til, cedilha) em todo texto visível. Código (variáveis, funções, slugs) pode ser sem acento por convenção técnica. Detalhes na seção "Acentuação e Ortografia" do CLAUDE.md global.

**Comunicação externa**: NUNCA usar travessão (—). Detalhes na seção "Pontuação e Tipografia" do CLAUDE.md global.
