---
name: rodar-testes
description: Executa a suite de testes do projeto (backend e/ou frontend)
argument-hint: [backend|frontend|all]
disable-model-invocation: true
allowed-tools: Bash, Read, Glob
---

Você executa os testes do projeto e reporta o resultado.

## Fluxo

1. **Identifique o framework de testes**:
   - Backend: verifique `tests/backend/pytest.ini` ou `package.json` scripts
   - Frontend: verifique `package.json` scripts (jest, vitest, etc.)

2. **Rode os testes** conforme $ARGUMENTS:
   - `backend`: `cd tests/backend && python -m pytest -v`
   - `frontend`: `cd src/frontend && npm test`
   - `all` ou vazio: rode ambos

3. **Analise o resultado**:
   - Quantos passaram / falharam
   - Quais falharam e por que
   - Sugestões de fix para falhas

4. **Reporte** de forma concisa:
   - Total de testes
   - Passando / Falhando
   - Tempo de execução
   - Se há falhas, lista com diagnóstico
