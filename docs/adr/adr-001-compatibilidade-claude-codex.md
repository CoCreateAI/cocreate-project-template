# ADR 001 — Compatibilidade Claude Code + Codex via camada compartilhada + 2 cascas

**Data**: 2026-05-13 | **Status**: Aceita

---

## Contexto

O template `cocreate-project-template` foi originalmente criado para Claude Code, com toda a orquestração em `.claude/skills/` e `.claude/agents/`, invocada via comandos `/skill-name`.

Surgiram duas demandas que justificam compatibilidade também com **Codex CLI** (OpenAI):

1. **Cursos públicos de SDD**: a CoCreateAI vai usar este template como base de cursos. Alunos podem estar em Claude Code OU em Codex. O template precisa servir aos dois para não limitar audiência.
2. **Diversificação de risco**: amarrar a metodologia a uma única plataforma cria fragilidade. Se o Claude Code mudar, descontinuar features, ou o aluno preferir outra ferramenta, o template ainda precisa ser útil.

O desafio: Claude Code e Codex têm modelos diferentes de skills/agents/contexto:

| Aspecto | Claude Code | Codex CLI |
|---------|-------------|-----------|
| Arquivo de contexto raiz | `CLAUDE.md` | `AGENTS.md` |
| Invocação de skills | `/skill-name` explícito | Matching automático por contexto |
| Definição de skills | `.claude/skills/*/SKILL.md` com frontmatter Claude-specific | `.codex/skills/*/SKILL.md` com `triggers:` (ou `~/.agents/skills/`) |
| Subagentes | `.claude/agents/*.md` com YAML | Spawned explicitamente em runtime |
| MCP | `.claude/.mcp.json` | `~/.codex/config.toml` |

## Decisão

Adotamos a arquitetura **camada compartilhada + 2 cascas**:

1. **Camada compartilhada** em `docs/` — TODO conteúdo metodológico (specs, ADRs, perguntas, macro processo, templates, raw) vive aqui. É o miolo da metodologia SDD.
2. **Casca Claude Code** em `.claude/` — skills (`/skill-name`) e agents que **referenciam** o conteúdo compartilhado em `docs/`.
3. **Casca Codex** em `.codex/` + `AGENTS.md` na raiz — skills equivalentes (ativação por matching) que **referenciam o mesmo conteúdo compartilhado**.
4. `AGENTS.md` aponta explicitamente para `CLAUDE.md` (DRY) — todo o conteúdo metodológico vive em `CLAUDE.md`; `AGENTS.md` apenas adiciona o que é específico do Codex (como invocar skills, diferenças operacionais).

**Escopo da v1**: portar apenas 3 skills críticas para Codex (`iniciar-projeto`, `processar-contexto`, `preparar-missao`). Demais skills ficam Claude-only até validar uso real do template em Codex.

## Justificativa

- **Evita duplicação de conteúdo**: bancos de perguntas, specs, ADRs e templates ficam em UM lugar. Mudança metodológica reflete nas duas cascas automaticamente.
- **Manutenção razoável**: as cascas são FINAS — basicamente arquivos `SKILL.md` que descrevem fluxo e apontam para arquivos compartilhados. Adicionar nova skill significa criar 2 arquivos espelhados (Claude + Codex), não reimplementar toda a lógica.
- **Pedagogicamente clara**: alunos do curso SDD entendem que **metodologia é em `docs/`**, e a ferramenta (Claude/Codex) é o RUNNER. Reforça que SDD não depende de uma plataforma específica.
- **Permite evolução incremental**: começamos com 3 skills portadas e adicionamos mais conforme demanda real, sem big bang.

## Consequências

### Positivas

- Template serve a público maior (Claude + Codex)
- Conteúdo metodológico (`docs/`) é fonte única da verdade
- Adição de futuras plataformas (ex: Cursor agents, Gemini CLI) seria apenas adicionar uma 3a casca, sem reescrever metodologia
- Excelente artefato pedagógico para cursos: alunos veem a separação entre metodologia (durable) e orquestração (ferramenta-dependente)
- Reforça a tese SDD: "specs são verdade, código (e orquestração) é gerado a partir delas"

### Negativas

- Duas cascas pra manter sincronizadas (no momento, manualmente)
- Skills não portadas para Codex ficam com paridade incompleta — alunos Codex têm menos automação no v1
- `AGENTS.md` apontando para `CLAUDE.md` significa que usuário Codex SEMPRE precisa ler 2 arquivos (mitigado pela instrução clara no topo do `AGENTS.md`)
- Codex usa matching automático em vez de `/skill-name` — alunos vindos de Claude Code precisam aprender o novo modelo de ativação (mitigado pela seção "Diferenças operacionais" no `AGENTS.md`)

## Alternativas Consideradas

1. **Foco em Claude Code, Codex depois**: Adiar a compatibilidade. Rejeitada porque o curso de SDD vai começar antes de uma "fase 2", e perder alunos Codex no piloto compromete o produto educacional.

2. **Dois templates separados (`cocreate-project-template-claude` e `-codex`)**: Repos diferentes, manutenção paralela. Rejeitada porque duplica o conteúdo metodológico (specs, perguntas, ADRs) em dois lugares — viola DRY e cria risco de divergência pedagógica.

3. **Camada compartilhada mínima + skills duplicadas**: Manter as skills 100% independentes em cada casca, sem referenciar `docs/perguntas/`. Rejeitada porque ferraria a manutenibilidade — uma mudança em uma pergunta exigiria atualizar 2 arquivos sempre.

## Notas de implementação

- Skills Codex usam `triggers:` no frontmatter (lista de frases que ativam o matching). Skills Claude usam invocação explícita `/skill-name`.
- `.codex/config.toml.example` documenta `fallback_filenames` incluindo `CLAUDE.md` — isso permite que Codex leia `CLAUDE.md` diretamente se `AGENTS.md` não existir.
- A pasta `docs/perguntas/` foi desenhada para ser legível por humanos (alunos) E parseável por skills — formato markdown estruturado com seções nomeadas.
- O macro processo (`docs/macro-processo.md`) é EVOLUTIVO — pode ser atualizado a qualquer momento, não apenas durante onboarding.

## Roadmap (decisões diferidas)

- Portar demais skills (`executar-tarefa`, `refinar-conteudo`, `analisar-coerencia`, etc.) para Codex após validação de uso em piloto
- Avaliar terceira casca (Cursor Agents? Gemini CLI?) conforme demanda
- Adicionar testes automatizados para garantir paridade Claude/Codex em skills críticas
