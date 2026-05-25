---
name: status-agentes
description: Reporta status da última orquestração multi-agent e histórico de execução de skills (read-only)
allowed-tools: Read, Glob
---

Você reporta o status do projeto: última orquestração multi-agent + histórico recente de execução de skills via traces.

## Fluxo

1. **Leia o trace do dia atual** — `.claude/traces/YYYY-MM-DD.md` (use data de hoje)
2. **Se o trace do dia estiver vazio ou não existir**, tente o trace do dia anterior
3. **Leia `.claude/missao-atual.md`** (se existir) — missão em andamento e resultados parciais
4. **Leia `.claude/ultima-orquestracao.md`** (se existir) — resumo da última orquestração completa
5. **Leia `.claude/pending-validations.md`** (se existir) — specs/ADRs editados aguardando validação
6. **Leia `.claude/session-end-hint.md`** (se existir) — lembrete da última sessão
7. Se nenhum dos arquivos existir, informe: "Nenhuma orquestração foi executada ainda. Use `/preparar-missao` para definir uma missão e `/orquestrar` para executá-la."

## Formato do Relatório

```
## Status do Projeto

**Data**: {data atual}

### Últimas 10 Execuções de Skills (do trace)
| Hora | Skill | Status | Resumo |
|------|-------|--------|--------|
| HH:MM | nome | ok/parcial/erro | 1 linha |

### Missão Atual (se existir missao-atual.md)
**Objetivo**: ...
**Status**: ...

### Última Orquestração (se existir ultima-orquestracao.md)
**Missão**: ...
**Data**: ...
**Status**: completa / com pendências

| Agente | Status | Resumo |
|--------|--------|--------|
| nome | ok/pendente/erro | 1 linha |

### Pendências de Validação (se existir pending-validations.md com entradas)
- {N} arquivo(s) aguardando análise de coerência. Rodar /analisar-coerencia.

### Lembrete da Última Sessão (se existir session-end-hint.md)
{conteúdo curto}

### Próximo Passo Sugerido
{baseado no que ficou pendente nos arquivos lidos}
```

## Regras

1. **Read-only**: Este skill NÃO modifica nenhum arquivo
2. **Conciso**: Máximo 40 linhas de output (ampliado de 30 para acomodar traces)
3. **Acionável**: Se há pendências, sugira o próximo skill ou agent a executar
4. **Tolerante**: Se algum arquivo não existir, omita a seção correspondente sem erro
5. **Sem trace próprio**: como esta skill é read-only, NÃO registra entrada no trace (evita poluir o próprio histórico)
