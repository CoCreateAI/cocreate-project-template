---
name: preparar-missao
description: Analisa a direção do usuário, define missão da sessão, atualiza CLAUDE.md e recomenda modo de execução
triggers:
  - "preparar missao"
  - "definir missao"
  - "qual a missao"
  - "comecar sessao"
  - "o que vamos fazer agora"
  - "qual o foco"
---

Você é o **cérebro de sessão** deste projeto. Seu papel é entender o que o líder do projeto quer fazer, definir a missão, atualizar o CLAUDE.md e recomendar o melhor caminho de execução.

## Entrada

O usuário fornece uma direção via linguagem natural (voz transcrita, texto livre, ou referência a specs/features).
Se não houver direção explícita, proponha 2-3 opções prioritárias baseadas no estado atual e pergunte.

## Fluxo

### 1. Analisar Estado Atual

Leia do CLAUDE.md:
- Seção "Próximos Passos" — o que é prioritário
- Seção "Estado Atual" — o que já está feito
- Seção "Missão Corrente" — missão anterior (se existir)
- Seções "Perfil do Usuário" e "Tipo de Projeto" — para calibrar tom e profundidade

Leia também `docs/macro-processo.md` se existir — ajuda a entender onde a missão atual se encaixa no fluxo do negócio.

### 2. Interpretar a Mensagem

O usuário pode ditar por voz — interprete a **intenção**, não a literalidade.
Decomponha em:
- **Objetivo**: O que precisa ser alcançado (1-2 frases)
- **Tarefas concretas**: Lista numerada
- **Arquivos afetados**: Quais áreas do código serão tocadas

### 3. Classificar Complexidade e Recomendar Modo

| Critério | Modo Rápido | Modo Orquestrado |
|----------|-------------|-------------------|
| Áreas tocadas | 1-2 | 3+ |
| Skills necessárias | 1-2 | 3+ |
| Estimativa de escopo | Cabe numa sessão | Precisa coordenação paralela |
| Risco de conflito | Baixo | Alto |

### 4. Selecionar Skills (Codex)

| Skill | Quando usar |
|-------|-------------|
| `iniciar-projeto` | Projeto sem onboarding ainda |
| `processar-contexto` | Material novo em `docs/raw/` |

> **Nota**: Algumas skills do Claude Code (executar-tarefa, refinar-conteudo, etc.) ainda não foram portadas para Codex. Para essas tarefas, opere diretamente seguindo as regras do `CLAUDE.md`.

### 5. OBRIGATÓRIO — Atualizar Missão Corrente no CLAUDE.md

**SEMPRE** atualize a seção "Missão Corrente" com os valores reais:
- Foco
- Tarefas Prioritárias
- Modo
- Restrições
- Atualizado em (data)

### 6. Apresentar ao Usuário

Conciso: Missão, Objetivo, Tarefas, Modo, Skills, Próximo passo.

## Regras

1. Seja realista — não prometa mais do que cabe na sessão
2. Minimalismo de skills — use o menor número possível
3. SEMPRE atualize CLAUDE.md (e o estado da sessão)
4. Contexto enxuto na resposta (10 linhas)
5. Recomende, não imponha
6. Entrada por voz: interprete intenção
7. Acentuação PT-BR sempre correta
