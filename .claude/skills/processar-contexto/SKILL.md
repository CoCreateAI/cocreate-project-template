---
name: processar-contexto
description: Analisa material bruto (briefings, transcrições) e gera specs + ADRs. Gatilho inicial do projeto.
argument-hint: [caminho do arquivo raw — opcional]
context: fork
agent: general-purpose
allowed-tools: Read, Glob, Grep, Edit, Write
---

Leia os arquivos de contexto bruto deste projeto (qualquer .md ou .txt com conteúdo bruto de reunião, transcrição, chat, briefing ou documento de visão) na pasta `docs/raw/`.

## Registro de execução (camada Harness)

Ao **iniciar**, escreva em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] processar-contexto — INÍCIO
**Missão**: gerar spec-000 + spec-001 a partir de docs/raw/
```

Ao **terminar**:

```markdown
### [HH:MM] processar-contexto — FIM
**Status**: ok | parcial | erro
**Arquivos tocados**: {lista de specs/ADRs criados, CLAUDE.md, mapa-projeto.md}
**Próximo passo sugerido**: {1 linha ou "nenhum"}
```

Ver [`.claude/traces/README.md`](../../traces/README.md).

## Guarda inicial — verifique se `/iniciar-projeto` rodou antes

Antes de prosseguir, verifique:
- `docs/raw/` está vazio (zero arquivos significativos)?
- `docs/macro-processo.md` NÃO existe?
- `CLAUDE.md` ainda está cheio de `{{placeholders}}` nas seções "Perfil do Usuário" e "Tipo de Projeto"?

**Se SIM para esses 3 itens**, sugira ao usuário:

> Parece que este é um projeto novo sem onboarding inicial. Recomendo rodar `/iniciar-projeto` ANTES de `/processar-contexto` — a skill faz perguntas guiadas (perfil, tipo de projeto, escopo, macro processo) e gera um briefing estruturado em `docs/raw/`, além de `docs/macro-processo.md`. Isso vai resultar em uma constitution (spec-000) muito mais calibrada.
>
> Quer rodar `/iniciar-projeto` agora? Ou prefere prosseguir mesmo assim (output será mais raso)?

Se o usuário insistir em prosseguir, ou se já existe material em raw, continue normalmente.

## Banco de perguntas disponível (referência)

Se durante a análise você identificar lacunas críticas, você pode CONSULTAR (não precisa rodar) os bancos de perguntas em [`docs/perguntas/`](../../../docs/perguntas/) para entender que tipo de pergunta seria válida fazer ao usuário. Use isso para FAZER perguntas pontuais ao usuário quando o raw não for suficiente.

## Contexto do Projeto

Leia o `CLAUDE.md` na raiz do projeto para entender: perfil do usuário, tipo de projeto, nome, visão, stack, regras e estado atual. Leia também:
- `docs/macro-processo.md` se existir — dá a visão sistêmica do negócio
- `docs/analise-estrategica.md` se existir — dá riscos + compliance + dependências; **a constitution deve incorporar as restrições e os top 5 riscos identificados** como restrições globais

Se o CLAUDE.md ainda tiver placeholders (`{{...}}`), use o conteúdo do raw para preenchê-los.

## Este é o gatilho 1 do projeto (após /iniciar-projeto)

Se esta é a **primeira execução do /processar-contexto** (nenhuma spec existe ainda em `docs/specs/`), você deve:
1. Analisar o raw (incluindo `docs/raw/00-perfil-projeto.md` se foi gerado pela skill /iniciar-projeto) e gerar a **spec-000-constitution.md** (documento raiz)
2. Propor a **spec-001** (primeira spec de feature/arquitetura)
3. Preencher os placeholders restantes do CLAUDE.md com dados extraídos
4. Propor a stack técnica baseada no domínio identificado
5. Linkar a constitution ao `docs/macro-processo.md` (já existe a referência no template)

Execute na ordem:

1. **Analisar o contexto bruto**
   - Identifique o objetivo, escopo, entidades, relacionamentos, restrições
   - Extraia requisitos funcionais e não-funcionais
   - Identifique decisões já tomadas vs pontos em aberto
   - Mapeie conceitos-chave, stakeholders e seus papéis
   - Identifique o domínio do projeto e suas particularidades

2. **Gerar/atualizar Spec em docs/specs/**
   - Se é a primeira vez: gere spec-000-constitution.md usando o template em `docs/specs/spec-000-constitution.template.md`
   - Inclua: objetivo, escopo, entidades, fluxos, restrições, critérios de aceitação
   - Use diagramas Mermaid para fluxos e arquitetura
   - Nomeie como `spec-NNN-titulo.md`

3. **Gerar ADR em docs/adr/**
   - Documente decisões arquiteturais identificadas no contexto
   - Use o template em `docs/adr/ADR-TEMPLATE.md`
   - Formato: Contexto, Decisão, Consequências, Alternativas consideradas
   - Nomeie como `adr-NNN-titulo.md`

4. **Propor estrutura de pastas do projeto**
   - Baseada na stack e no escopo identificado
   - Inclua pasta `tests/` espelhando a estrutura do código
   - Atualize `docs/mapa-projeto.md` com descritivo de cada pasta

5. **Atualizar CLAUDE.md do projeto**
   - Preencha placeholders com dados reais extraídos do raw
   - Defina stack, decisões técnicas, estrutura
   - Atualize estado e próximos passos
   - Preencha o glossário com termos do domínio

6. **Verificar pré-requisitos**
   - Liste comandos que o usuário precisa rodar para setup (npm install, pip install, etc.)
   - Forneça comandos completos prontos para copiar/colar
   - Identifique .env ou configs necessárias

7. **Análise crítica final**
   - Avalie criticamente tudo que foi produzido
   - Informe explicitamente o que ainda falta fazer
   - Se a janela de contexto não permitiu completar tudo, liste os pendentes
   - Nunca assuma que está completo — declare o estado real

Ao final, faça uma análise crítica do que foi produzido e informe o que ainda falta fazer.
