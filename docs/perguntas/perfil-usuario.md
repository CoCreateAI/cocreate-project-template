# Banco de Perguntas — Perfil do Usuário

> Este arquivo é parte do template **cocreate-project-template** (metodologia SDD da CoCreate AI).
> É consumido pelas skills `/iniciar-projeto` (Claude Code) e `iniciar-projeto` (Codex).
> Também serve como artefato pedagógico independente — alunos podem ler para entender a metodologia.

## Propósito

Identificar **quem é o usuário que vai conduzir o projeto** antes de começar qualquer especificação. O perfil do usuário calibra como a IA explica decisões, qual nível de detalhe técnico assume, e que tipo de apoio precisa oferecer.

## Quando aplicar

- **Primeira vez** que o usuário inicia um projeto com este template
- Antes de gerar qualquer artefato (constitution, specs, ADRs)
- Se não há bloco "Perfil do Usuário" no `~/.claude/CLAUDE.md` global

## Onde salvar a resposta

1. **Global** (`~/.claude/CLAUDE.md`): bloco "Perfil do Usuário" — persiste entre projetos
2. **Local** (CLAUDE.md do projeto): seção "Perfil do Usuário" — sobrescreve o global se diferente neste projeto

---

## Perguntas

### Bloco 1 — Identificação básica

1. **Qual é o seu nome?**
2. **Qual é o seu papel principal?** Exemplos: CEO, fundador, gerente de produto, desenvolvedor, consultor, pesquisador, estudante, estrategista, designer.
3. **Em que empresa/contexto você atua?** (Opcional, mas ajuda a calibrar o tom.)

### Bloco 2 — Background técnico

4. **Qual é o seu nível técnico?** Escolha o mais próximo:
   - **Não-dev**: você não escreve código; usa IA como executor técnico
   - **Dev iniciante**: começou recentemente, entende sintaxe básica
   - **Dev experiente**: confortável em uma ou mais linguagens, lê código fluentemente
   - **Arquiteto/senior**: pensa em sistema, faz code review, decide stack
5. **Que linguagens/frameworks você já usou?** (Para calibrar exemplos.) Liste rapidamente, sem ranking.

### Bloco 3 — Como usa IA

6. **Como você usa IA em projetos técnicos?**
   - **Executor**: você define o que quer, a IA implementa
   - **Pair-programmer**: você e a IA escrevem juntos, revisando uma à outra
   - **Revisor**: você escreve, a IA revisa e sugere
   - **Mixto**: depende da tarefa
7. **Quanto detalhe técnico você quer nas respostas?**
   - **Mínimo**: comandos prontos, sem explicar por baixo dos panos
   - **Médio**: comandos + explicação curta do "por que"
   - **Detalhado**: comandos + raciocínio + alternativas consideradas

### Bloco 4 — Preferências de comunicação

8. **Idioma primário do projeto?** (PT-BR default; pode ser EN se a equipe for internacional)
9. **Algo que você quer que a IA NÃO faça?** Exemplos: "não use travessão em texto externo", "não invente arquivos", "sempre confirme antes de deletar".
10. **Algo que você quer que a IA SEMPRE faça?** Exemplos: "sempre dê comandos completos", "sempre faça análise crítica no final".

---

## Output esperado

A skill deve gerar um bloco assim no `~/.claude/CLAUDE.md` global E replicar no `CLAUDE.md` local:

```markdown
## Perfil do Usuário

| Campo | Valor |
|-------|-------|
| **Nome** | {{NOME}} |
| **Papel** | {{PAPEL}} |
| **Contexto** | {{EMPRESA_OU_CONTEXTO}} |
| **Nível técnico** | {{NÍVEL}} |
| **Linguagens/frameworks** | {{LISTA}} |
| **Como usa IA** | {{MODO}} |
| **Detalhe técnico desejado** | {{NÍVEL_DETALHE}} |
| **Idioma primário** | {{IDIOMA}} |
| **Restrições (não fazer)** | {{RESTRIÇÕES}} |
| **Preferências (sempre fazer)** | {{PREFERÊNCIAS}} |
```

## Exemplos de resposta

### Exemplo A — Não-dev (CEO/estrategista)

> Sou Rodrigo, CEO da CoCreateAI. Não escrevo código, sou estrategista de IA corporativa. Uso IA como executor técnico. Quero o mínimo de detalhe técnico, mas explicação curta do "por que" quando a decisão for importante. PT-BR. Não use travessão em comunicação externa. Sempre dê comandos completos prontos pra copiar.

### Exemplo B — Dev experiente

> Sou Marina, eng. de software sênior, 8 anos em Python e Go. Uso IA como pair-programmer. Quero detalhe médio nas respostas, com alternativas quando relevante. PT-BR mas código em EN. Não invente APIs que não existem.

### Exemplo C — Estudante de curso SDD

> Sou João, estudante do curso CoCreate de SDD. Dev iniciante, já fiz tutorial de Python. Uso IA como executor enquanto aprendo. Quero detalhe alto pra entender. PT-BR.

## Como aplicar (instruções pro agente)

1. Leia o `~/.claude/CLAUDE.md` global primeiro. Se já há bloco "Perfil do Usuário" preenchido, **pule este banco de perguntas** e use o que está salvo.
2. Caso contrário, apresente os 4 blocos de perguntas **agrupados** (não uma por uma). Aceite respostas em linguagem natural.
3. Interprete a intenção, não a literalidade. Se o usuário dita por voz, espere erros de transcrição.
4. Após capturar as respostas, gere o bloco de output e:
   - Escreva/atualiza no `~/.claude/CLAUDE.md` global
   - Replica no `CLAUDE.md` local do projeto
5. Confirme com o usuário antes de salvar.
