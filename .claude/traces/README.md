# Traces de Execução

Esta pasta armazena o **log estruturado de execução das skills** do projeto. Faz parte da camada Harness sobre SDD (ver [ADR-002](../../docs/adr/adr-002-harness-engineering-complemento-sdd.md)).

## Formato

- **Arquivos diários**: `YYYY-MM-DD.md` (um arquivo por dia)
- **Append-only**: skills sempre adicionam ao final, nunca sobrescrevem
- **Markdown human-readable**: para o agente escrever facilmente e o humano ler sem tooling

## Entrada padrão

Toda skill não-readonly registra início e fim:

```markdown
### [14:30] preparar-missao — INÍCIO
**Missão**: Definir foco da sessão sobre refatoração do módulo X

### [14:32] preparar-missao — FIM
**Status**: ok
**Arquivos tocados**: CLAUDE.md
**Próximo passo sugerido**: rodar /executar-tarefa com a missão definida
```

A skill `/executar-tarefa` também registra **tentativas de correção** quando testes falham:

```markdown
### [14:35] executar-tarefa — TENTATIVA 1/3
**Falha**: test_soma esperava 3 para soma(1,1), recebeu 2
**Hipótese**: função soma usa subtração no lugar de adição
**Ação**: trocar `a - b` por `a + b` em src/backend/math.py:12
**Resultado**: passou
```

## Por que markdown e não JSONL

JSONL é melhor para parsing programático, mas exige tooling para virar legível. Como o template é usado por humanos + IA (sem dashboards), markdown ganha: o agente escreve nativamente, o humano lê direto. Se no futuro virar volume grande, migrar para JSONL é trivial (formato já é estruturado por seções).

## Consumidores

- **`/status-agentes`**: lê o trace do dia atual para gerar tabela "últimas execuções"
- **`/licoes-aprendidas`**: lê o trace do dia para identificar TENTATIVAS falhadas (candidatas a virar lições)

## Versionamento

Traces são **locais por sessão** e não devem entrar no Git (ver `.gitignore` nesta pasta). Apenas o `README.md` e o `.gitignore` são versionados.
