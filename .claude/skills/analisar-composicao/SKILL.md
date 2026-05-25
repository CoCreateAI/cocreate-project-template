---
name: analisar-composicao
description: Analisa a distribuição percentual de texto entre código, specs, ADRs e material bruto do projeto
disable-model-invocation: true
allowed-tools: Bash, Read, Glob
---

Você analisa a composição textual do projeto — quanto é código vs documentação.

## O que medir

Conte o total de linhas de texto (excluindo binários e node_modules) em cada área:

1. **Código** (`src/` + `tests/`) — código-fonte efetivo
2. **Specs** (`docs/specs/`) — especificações SDD
3. **ADRs** (`docs/adr/`) — decisões arquiteturais
4. **Raw** (`docs/raw/`) — material bruto (transcrições, briefings)
5. **Config/Docs raiz** (`CLAUDE.md`, `README.md`, `.claude/`, `scripts/`) — infraestrutura do projeto

## Formato do Output

```
## Composição do Projeto: {{PROJECT_NAME}}

| Área | Linhas | % do Total |
|------|--------|-----------|
| Código (src/ + tests/) | X.XXX | XX.X% |
| Specs (docs/specs/) | X.XXX | XX.X% |
| ADRs (docs/adr/) | X.XXX | XX.X% |
| Raw (docs/raw/) | X.XXX | XX.X% |
| Config/Infra (.claude/, scripts/, CLAUDE.md) | X.XXX | XX.X% |
| **TOTAL** | **X.XXX** | **100%** |

### Ratio Documentação vs Código
- Documentação total (specs + ADRs + raw): XX.X%
- Código total (src/ + tests/): XX.X%
- Ratio: X.X:1 (doc:code)
```

## Como Contar

Use `wc -l` recursivamente, excluindo:
- `.git/`
- `node_modules/`
- `package-lock.json`
- Arquivos binários (imagens, fontes)
- `__pycache__/`
- `.next/`
