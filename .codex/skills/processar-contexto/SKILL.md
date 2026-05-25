---
name: processar-contexto
description: Analisa material bruto (briefings, transcrições) em docs/raw/ e gera specs + ADRs. Roda APÓS iniciar-projeto.
triggers:
  - "processar contexto"
  - "processar raw"
  - "gerar specs"
  - "criar constitution"
  - "transformar briefing em spec"
---

Leia os arquivos de contexto bruto deste projeto (qualquer .md ou .txt) na pasta `docs/raw/`.

## Guarda inicial — verifique se iniciar-projeto rodou antes

Antes de prosseguir, verifique:
- `docs/raw/` está vazio (zero arquivos significativos)?
- `docs/macro-processo.md` NÃO existe?
- `CLAUDE.md` ainda está cheio de `{{placeholders}}` nas seções "Perfil do Usuário" e "Tipo de Projeto"?

**Se SIM para esses 3 itens**, sugira ao usuário:

> Parece que este é um projeto novo sem onboarding inicial. Recomendo a skill `iniciar-projeto` ANTES desta — faz perguntas guiadas (perfil, tipo de projeto, escopo, macro processo) e gera um briefing estruturado em `docs/raw/`, além de `docs/macro-processo.md`. Isso vai resultar em uma constitution (spec-000) muito mais calibrada.
>
> Quer rodar `iniciar-projeto` agora? Ou prefere prosseguir mesmo assim (output será mais raso)?

Se o usuário insistir em prosseguir, continue normalmente.

## Banco de perguntas (referência)

Se identificar lacunas críticas durante a análise, CONSULTE (não precisa rodar) os bancos em `docs/perguntas/` para entender que tipo de pergunta seria válida fazer ao usuário.

## Contexto do Projeto

Leia o `CLAUDE.md` na raiz (perfil do usuário, tipo de projeto, stack, regras) e:
- `docs/macro-processo.md` se existir (visão sistêmica do negócio)
- `docs/analise-estrategica.md` se existir (riscos + compliance + dependências — incorporar restrições e top 5 riscos na constitution como restrições globais)

Se o CLAUDE.md ainda tiver placeholders `{{...}}`, use o conteúdo do raw para preenchê-los.

## Fluxo (primeira execução)

Se nenhuma spec existe ainda em `docs/specs/`:

1. **Analisar o contexto bruto**
   - Identifique objetivo, escopo, entidades, relacionamentos, restrições
   - Extraia requisitos funcionais e não-funcionais
   - Identifique decisões já tomadas vs pontos em aberto
   - Mapeie conceitos-chave, stakeholders e seus papéis
   - Identifique o domínio do projeto e suas particularidades

2. **Gerar Spec em docs/specs/**
   - Primeira vez: gere `spec-000-constitution.md` usando o template em `docs/specs/spec-000-constitution.template.md`
   - Inclua: objetivo, escopo, entidades, fluxos, restrições, critérios de aceitação
   - Use diagramas Mermaid
   - Linke com `docs/macro-processo.md`
   - Nomeie como `spec-NNN-titulo.md`

3. **Gerar ADR em docs/adr/**
   - Documente decisões arquiteturais identificadas no contexto
   - Use o template em `docs/adr/ADR-TEMPLATE.md`

4. **Propor estrutura de pastas**
   - Baseada na stack e no escopo
   - Inclua pasta `tests/` espelhando código
   - Atualize `docs/mapa-projeto.md`

5. **Atualizar CLAUDE.md do projeto**
   - Preencha placeholders restantes
   - Defina stack, decisões técnicas
   - Atualize estado e próximos passos
   - Preencha glossário

6. **Verificar pré-requisitos**
   - Liste comandos de setup (npm install, pip install, etc.)
   - Forneça comandos completos pra copiar/colar
   - Identifique .env ou configs necessárias

7. **Análise crítica final** (Regra de Ouro)
   - Avalie criticamente o que foi produzido
   - Informe explicitamente o que ainda falta
   - Nunca assuma completude

Ao final, faça análise crítica e informe pendentes.
