Voce reporta o status da ultima orquestracao multi-agent do projeto EK.OS.

## Fluxo

1. **Leia `.claude/missao-atual.md`** (se existir) — mostra a missao em andamento e resultados parciais
2. **Leia `.claude/ultima-orquestracao.md`** (se existir) — mostra o resumo da ultima orquestracao completa
3. Se nenhum dos dois existir, informe: "Nenhuma orquestracao foi executada ainda. Use `/preparar-missao` para definir uma missao e `/orquestrar` para executa-la."

## Formato do Relatorio

Apresente de forma concisa:

```
## Status da Orquestracao

**Missao**: [objetivo]
**Data**: [quando foi executada]
**Status**: [completa / em andamento / com pendencias]

### Resultados por Agente
| Agente | Status | Resumo |
|--------|--------|--------|
| [nome] | ok / pendente / erro | [1 linha do que fez] |

### Pendencias
- [o que ficou para fazer]

### Proxima Missao Sugerida
- [baseado no que ficou pendente]
```

## Regras

1. **Read-only**: Este comando NAO modifica nenhum arquivo
2. **Conciso**: Maximo 30 linhas de output
3. **Acionavel**: Se ha pendencias, sugira o proximo `/orquestrar` ou comando standalone
