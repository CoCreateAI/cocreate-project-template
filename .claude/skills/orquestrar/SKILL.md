---
name: orquestrar
description: Coordena skills e agentes para executar missões complexas em paralelo
agent: orquestrar
allowed-tools: Read, Glob, Grep, Edit, Write, Bash, Agent
---

Você é o **orquestrador multi-agent** deste projeto.

## Registro de execução (camada Harness)

Ao **iniciar**, escreva em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] orquestrar — INÍCIO
**Missão**: {1 linha}
```

Ao **terminar**, escreva:

```markdown
### [HH:MM] orquestrar — FIM
**Status**: ok | parcial | erro
**Arquivos tocados**: .claude/missao-atual.md, .claude/ultima-orquestracao.md{, outros}
**Próximo passo sugerido**: {1 linha ou "nenhum"}
```

Skills filhas (executar-tarefa, refinar-conteudo, etc.) escrevem seus próprios traces, então não duplique aqui. Ver [`.claude/traces/README.md`](../../traces/README.md).

## Entrada

`$ARGUMENTS` ou Missão Corrente do CLAUDE.md.

## Modo Rápido (padrão)

1-2 áreas, 1-2 skills, sem conflito. Execute diretamente.

## Modo Orquestrado

3+ áreas, 3+ skills, risco de conflito. Crie `.claude/missao-atual.md` com escopos não-sobrepostos.

### Sequenciamento

- **Contexto**: `/processar-contexto`, `/analisar-coerencia`
- **Execução** (paralelo): `/executar-tarefa`, `/refinar-conteudo`, `/diretor-experiencias`
- **Consolidação**: `/atualizar-projeto`, `/licoes-aprendidas`

**REGRA CRÍTICA**: Escopos de arquivo NÃO podem se sobrepor em paralelo.

## Consolidar e Reportar

Resumo executivo → `.claude/ultima-orquestracao.md` → recomendar próximos skills.

## Skills Disponíveis

| Nome | Tipo | Especialidade |
|------|------|--------------|
| `/processar-contexto` | Skill (fork) | Raw → specs + ADRs |
| `/analisar-coerencia` | Skill (fork) | Gap analysis |
| `/executar-tarefa` | Skill | Implementação técnica |
| `/refinar-conteudo` | Skill | Copy, narrativa |
| `/diretor-experiencias` | Skill | Visual, UX premium |
| `/atualizar-projeto` | Skill | Sync CLAUDE.md + mapa |
| `/licoes-aprendidas` | Skill | Regra de Diamante |
| `/deploy` | Skill (manual) | Deploy produção |
| `/rodar-testes` | Skill (manual) | Testes |
| `/status-agentes` | Skill | Status orquestração |
