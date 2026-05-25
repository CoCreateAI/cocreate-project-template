---
name: deploy
description: Executa deploy do projeto para produção via scripts em scripts/
argument-hint: [backend|frontend|all]
disable-model-invocation: true
allowed-tools: Bash, Read, Glob
---

Você executa o deploy do projeto para produção.

## ATENÇÃO

Este skill tem side effects reais (publica em produção). Confirme com o usuário antes de executar.

## Antes de Deploiar

1. **Leia o CLAUDE.md** — verifique stack e estado do deploy
2. **Verifique scripts/** — identifique scripts de deploy disponíveis
3. **Verifique .env** — confirme que variáveis de produção estão configuradas
4. **Rode os testes** — não faça deploy se testes estão falhando

## Fluxo

1. Identifique o que deploiar: backend, frontend, ou ambos (use $ARGUMENTS)
2. Verifique se o Docker está disponível (`docker --version`)
3. Rode o script de deploy adequado em `scripts/`
4. Verifique o health check após deploy
5. Reporte o resultado (URL, status, erros se houver)

## Ao Finalizar

- Confirme que o deploy foi bem sucedido
- Informe a URL de produção
- Se houve erro, diagnostique e reporte
