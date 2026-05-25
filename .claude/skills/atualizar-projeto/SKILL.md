---
name: atualizar-projeto
description: Sincroniza CLAUDE.md e mapa-projeto.md com o estado real do projeto
allowed-tools: Read, Glob, Grep, Edit, Write
---

Analise tudo que foi produzido até agora neste projeto.

## Registro de execução (camada Harness)

Ao **iniciar**, escreva em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] atualizar-projeto — INÍCIO
**Missão**: sincronizar CLAUDE.md e mapa-projeto.md com o estado real
```

Ao **terminar**:

```markdown
### [HH:MM] atualizar-projeto — FIM
**Status**: ok | parcial | erro
**Arquivos tocados**: CLAUDE.md, docs/mapa-projeto.md{, outros}
**Próximo passo sugerido**: {1 linha ou "nenhum"}
```

Ver [`.claude/traces/README.md`](../../traces/README.md).

Execute na ordem:

1. **Levantar estado atual**
   - Liste todos os arquivos e pastas existentes
   - Identifique o que foi implementado vs o que está pendente
   - Verifique se há .env, configs, dependências instaladas

2. **Atualizar CLAUDE.md com:**
   - Estado atual do projeto (o que existe, o que funciona)
   - Decisões técnicas tomadas (stack, padrões, bibliotecas escolhidas)
   - Padrões que emergiram no código
   - Próximos passos identificados
   - Riscos ou débitos técnicos detectados

3. **Atualizar docs/mapa-projeto.md (CRÍTICO)**
   - Liste TODOS os arquivos reais do projeto
   - CADA arquivo deve estar listado com descritivo
   - Adicione arquivos novos, remova referências a arquivos que não existem
   - Marque pastas vazias
   - Atualize a data

4. **Verificar consistência**
   - Specs refletem o que foi implementado?
   - Testes cobrem o código existente?
   - Há código sem spec ou spec sem código?

5. **Resumo executivo**
   - Estado conciso do projeto
   - O que precisa de atenção imediata

6. **Análise crítica final**
   - Avalie criticamente tudo que foi produzido
   - Informe o que falta
   - Nunca assuma completude — declare o estado real

Ao final, faça uma análise crítica do que foi produzido e informe o que ainda falta fazer.
