# CoCreate Studio

> **Spec-Driven Development com Harness Engineering** — painel vivo do método CoCreate AI.

Dashboard local que visualiza o **runtime do template** cocreate-project-template. Mostra skills, subagents, traces de execução, pendências de validação, specs e a arquitetura de invocação. Combina os dois pilares metodológicos da CoCreate: **SDD** (especificação dirige o código) e **Harness Engineering** (arnês de execução: hooks, traces, loops de correção).

**Não é o front-end do projeto que você está construindo**. É o painel do método que orquestra o trabalho — pense como um "DevTools" da metodologia.

Produto da [CoCreate AI](https://www.cocreateai.com.br).

## Por que existe

Quando você está coordenando vários chats em paralelo (cenário pedagógico do curso SDD), perde a visão do todo: o que rodou, o que está pendente, qual o estado das specs, qual skill chamar agora. O CoCreate Studio dá esse panorama em uma tela.

Faz parte da camada Harness sobre SDD documentada no [`ADR-002`](../docs/adr/adr-002-harness-engineering-complemento-sdd.md).

## Como rodar

```powershell
cd harness-ui
npm install
npm run dev
```

Abre em [http://localhost:3001](http://localhost:3001).

> **Porta canônica: 3001.** Convenção fixa do template. Se você tem vários projetos CoCreate abertos em paralelo, sempre é a porta 3001 — útil pra não ter que descobrir qual dashboard pertence a qual projeto. Para mudar (se conflitar), edite os scripts `dev` e `start` em `package.json`.

## Como funciona

Tudo é **leitura do filesystem em runtime**. Sem banco, sem migration, sem build step de conteúdo. Você edita uma skill ou o trace ganha uma entrada, dá refresh e aparece no dashboard.

**Atenção sobre terminologia**: as rotas abaixo (`/skills`, `/runtime`, etc.) são **URLs do dashboard**, acessadas no navegador em `http://localhost:3001/...`. NÃO são slash commands do Claude Code. Os slash commands de verdade (`/iniciar-projeto`, `/preparar-missao`, etc.) você digita no terminal do Claude Code — não aqui.

| Rota (URL no dashboard) | Lê de | O que mostra |
|--------------------------|-------|--------------|
| `http://localhost:3001/` | `.claude/skills/`, `.claude/agents/` | Hero + diagrama Mermaid da arquitetura + cards |
| `http://localhost:3001/comece-aqui` | múltiplos arquivos | Onboarding guiado com checks automáticos e manuais |
| `http://localhost:3001/skills` | `.claude/skills/*/SKILL.md` | Lista de skills com frontmatter resumido |
| `http://localhost:3001/skills/[name]` | mesma | Detalhe: corpo da skill, último uso (trace) |
| `http://localhost:3001/agents` | `.claude/agents/*.md` | Lista de subagents |
| `http://localhost:3001/agents/[name]` | mesma | Detalhe do subagent |
| `http://localhost:3001/runtime` | `.claude/traces/`, `pending-validations.md`, `missao-atual.md`, `session-end-hint.md` | Painel ao vivo do estado (auto-refresh 5s) |
| `http://localhost:3001/specs` | `docs/specs/*.md`, `docs/adr/*.md` | Lista de specs e ADRs com status inferido |
| `http://localhost:3001/guia` | hardcoded | Como invocar cada skill, modos de execução, fluxo |

## Comportamento

- **Read-only por padrão**: o dashboard lê o filesystem. A única exceção é `.claude/setup-checks.json` (gerenciado pelo tracker de passos manuais em `/comece-aqui`).
- **Tolerante**: se uma pasta não existir (template recém-clonado), a página mostra estado vazio com instrução.
- **Auto-refresh em páginas dinâmicas**: `/comece-aqui` e `/runtime` recarregam sozinhos a cada 5 segundos (botão pausar/retomar no canto inferior direito). Demais páginas usam refresh manual.

## Stack

- Next.js 14 (App Router) + React 18 + TypeScript
- Tailwind CSS 3
- gray-matter (parse de frontmatter)
- react-markdown + remark-gfm (render de markdown)
- mermaid (diagramas)

## Quando NÃO usar

- Se o projeto que você está construindo tem stack diferente (Vue, Svelte, Python puro) — sem problema, o CoCreate Studio continua funcionando porque é uma app separada. Mas o time pode achar redundante manter dois `node_modules`. Nesse caso, simplesmente não rode o dashboard.
- Em produção do projeto — o CoCreate Studio é ferramenta de **desenvolvimento local**, não vai para deploy.

## Próximos passos (roadmap)

- [ ] Pipeline autônomo `/dev` que orquestra skills automaticamente (ver ADR-003 futuro)
- [ ] WebSocket para auto-refresh do trace
- [ ] Página de histórico (traces de dias anteriores)
- [ ] Métricas: tempo médio de execução por skill, taxa de TENTATIVAS falhadas
