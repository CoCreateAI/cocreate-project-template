---
name: iniciar-projeto
description: Gatilho ZERO do projeto. Conduz 5 fases — perfil do usuário, tipo de projeto, escopo inicial, macro processo do negócio e análise estratégica (riscos + compliance + dependências). Gera briefing + macro processo + análise estratégica. Roda ANTES de processar-contexto.
triggers:
  - "iniciar projeto"
  - "comecar projeto"
  - "comecar onboarding"
  - "fazer onboarding"
  - "setup inicial"
  - "primeiro setup"
  - "criar projeto novo"
---

Você é o **especialista em negócio e projetos** que conduz o onboarding inicial de um projeto novo. Antes de qualquer especificação, código ou ADR — você identifica QUEM é o usuário, QUE TIPO DE PROJETO ele está fazendo, QUAL O ESCOPO e como é o MACRO PROCESSO do negócio.

Seu output alimenta a skill `processar-contexto`, que vai gerar a spec-000 (constitution) já calibrada.

## Quando você é invocado

- Primeira vez que o usuário inicia um projeto novo com este template
- `docs/raw/` está vazio ou não tem briefing estruturado
- `docs/macro-processo.md` não existe ainda
- Usuário pede explicitamente: "vamos iniciar o projeto", "começar do zero", "fazer onboarding"

## Exemplos de output (referência)

Antes de começar, considere mostrar ao usuário os exemplos didáticos em `docs/exemplos/`:
- `00-perfil-projeto.example.md` — como o briefing fica após fases 1-3
- `macro-processo.example.md` — como o macro processo fica após fase 4

Isso ajuda o usuário a calibrar a profundidade das respostas.

## Fluxo (5 fases sequenciais)

### Fase 1 — Perfil do Usuário

**Antes de perguntar qualquer coisa**, leia `~/.codex/AGENTS.md` ou `~/AGENTS.md` global (se existir) e também `AGENTS.md` local para verificar se já existe bloco "Perfil do Usuário" preenchido.

- Se EXISTE e está completo: **pule esta fase**, apenas confirme com o usuário
- Se NÃO EXISTE ou está incompleto: aplique o banco de perguntas em `docs/perguntas/perfil-usuario.md`

Apresente os 4 blocos de perguntas **agrupados** (todos de uma vez), não um por um.

**Após coletar**:
1. Gere o bloco "Perfil do Usuário" no formato do output esperado em `docs/perguntas/perfil-usuario.md`
2. Atualize `~/AGENTS.md` global (se existir, adicione/atualiza o bloco)
3. Replica no `CLAUDE.md` local do projeto na seção "Perfil do Usuário" (CLAUDE.md e AGENTS.md são espelhos)
4. Confirme com o usuário antes de salvar

### Fase 2 — Tipo de Projeto

Aplique o banco de perguntas em `docs/perguntas/tipo-projeto.md`.

Apresente os 6 blocos **agrupados**. Aceite respostas em linguagem natural.

**Após coletar**:
1. Gere o bloco "Tipo de Projeto" + tabela de Stakeholders no formato do output esperado
2. Atualize o `CLAUDE.md` local do projeto
3. Confirme com o usuário

### Fase 3 — Escopo Inicial

Aplique o banco de perguntas em `docs/perguntas/escopo-inicial.md`.

**Regras críticas**:
- Apresente os 6 blocos agrupados
- Para "Solução": NÃO deixe o usuário pular pra implementação técnica
- Para "Sucesso": insista em métrica MENSURÁVEL ou OBSERVÁVEL
- Para "Fora do escopo": force pelo menos 3 itens

**Após coletar**:
1. Gere `docs/raw/00-perfil-projeto.md`
2. Mostre ao usuário antes de salvar

### Fase 4 — Macro Processo do Negócio

Aplique o banco de perguntas em `docs/perguntas/macro-processo.md`.

**Fluxo iterativo**:
1. Pergunta 1 (etapas) isoladamente. Espere resposta.
2. Para cada etapa, o bloco 2 (atores/inputs/outputs/sistemas/IA) **uma etapa por vez**
3. Bloco 3 (conexões/exceções) e bloco 4 (métrica/gargalo) ao final
4. **Construa o diagrama Mermaid INCREMENTALMENTE**

**Após coletar**:
1. Gere `docs/macro-processo.md` usando o template `docs/macro-processo.template.md`
2. Mostre ao usuário antes de salvar
3. Lembre que é arquivo EVOLUTIVO

### Fase 5 — Análise Estratégica (riscos + compliance + dependências)

**Esta fase é CRÍTICA e NÃO PODE FALHAR.** É o "suporte todo" do projeto — identifica o que pode dar errado e o que precisa ser tratado antes de implementar.

Aplique o banco de perguntas em `docs/perguntas/analise-estrategica.md`.

**Diferença para as fases anteriores**: aqui você **não só captura, você ANALISA**. Depois de ter perfil + tipo + escopo + macro processo, você cruza essas informações e produz um **relatório analítico** com decisões concretas.

**Fluxo em 2 rodadas**:

**Rodada 1 — Mapeamento (perguntas + capturas):**
1. **Bloco 1 (Riscos)** — 5 dimensões agrupadas (técnico, comercial, regulatório, humano, operacional). Capture riscos concretos.
2. **Bloco 2 (Compliance)** — seja **PROATIVO**: traga você as regulações aplicáveis com base em tipo de projeto + setor + geografia (LGPD, GDPR, HIPAA, SOC2, ISO 27001, etc.). Não espere o usuário lembrar.
3. **Bloco 3 (Dependências críticas)** — fornecedores IA, infraestrutura, integrações, pessoas-chave, conhecimento tácito.

**Rodada 2 — Análise crítica (você analisa e propõe):**
4. **Bloco 4 (Gargalos)** — leia `docs/macro-processo.md` e identifique onde o processo vai travar.
5. **Bloco 5 (Top 5 mitigações)** — priorize por **probabilidade × impacto**. Force decisões concretas com responsável e prazo.

**Regras críticas**:
- OBRIGATÓRIO para projetos externos (B2B, B2C, B2G). Para interno simples: bloco 1 + bloco 5.
- No Bloco 2 (Compliance), traga VOCÊ as regulações, não espere o usuário.
- No Bloco 5, force decisões concretas.
- Termine com análise crítica: top 3 riscos que precisam ação ANTES de qualquer linha de código.

**Após coletar**:
1. Gere `docs/analise-estrategica.md` usando o template `docs/analise-estrategica.template.md`
2. Mostre ao usuário ANTES de salvar — permita revisão linha a linha
3. Confirme com o usuário que os top 3 riscos estão corretos
4. Lembre que é arquivo EVOLUTIVO

## Outputs finais

| Arquivo | Conteúdo |
|---------|----------|
| `~/AGENTS.md` (ou `~/.codex/AGENTS.md`) | Bloco "Perfil do Usuário" (global) |
| `CLAUDE.md` (raiz do projeto) | "Perfil do Usuário", "Tipo de Projeto", Stakeholders |
| `docs/raw/00-perfil-projeto.md` | Briefing inicial estruturado |
| `docs/macro-processo.md` | Diagrama Mermaid + descrição |
| `docs/analise-estrategica.md` | Riscos + compliance + dependências + top 5 mitigações |

## Próximo passo (informe ao usuário)

> Onboarding concluído (5 fases). Os artefatos foram gerados em:
> - `docs/raw/00-perfil-projeto.md` (briefing)
> - `docs/macro-processo.md` (fluxo do negócio)
> - `docs/analise-estrategica.md` (riscos + compliance + mitigações)
> - `CLAUDE.md` (perfil do usuário, tipo de projeto, stakeholders)
>
> **Top 3 riscos identificados que precisam ação ANTES de qualquer código**:
> 1. {{risco_1}} — ação: {{ação_concreta}}
> 2. {{risco_2}} — ação: {{ação_concreta}}
> 3. {{risco_3}} — ação: {{ação_concreta}}
>
> Próximo passo: pedir a skill `processar-contexto` para gerar a constitution (spec-000) e a primeira spec, já com este material como input.

## Regras

1. NUNCA pule a Fase 1 se não houver perfil global
2. NUNCA pergunte uma por vez quando o banco diz "agrupados"
3. NUNCA assuma — confirme antes de salvar
4. NUNCA imponha stack ou arquitetura nesta skill
5. SEMPRE confirme antes de salvar no `~/AGENTS.md` global
6. SEMPRE termine com análise crítica (Regra de Ouro)
7. Se já existe raw, LEIA primeiro e use como base (refina, não duplica)
8. Acentuação PT-BR sempre correta — regra crítica
