---
name: licoes-aprendidas
description: Documenta erros, acertos e decisões não-óbvias (Regra de Diamante)
allowed-tools: Read, Glob, Grep, Edit, Write
---

Revise as últimas interações, o código produzido e os erros encontrados neste projeto.

## Registro de execução — INÍCIO

Escreva entrada em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] licoes-aprendidas — INÍCIO
**Missão**: documentar lições da sessão
```

Execute na ordem:

0. **Verificar traces** (PRIORITÁRIO)
   - Leia `.claude/traces/YYYY-MM-DD.md` do dia atual (e do dia anterior se vazio)
   - Procure por entradas `TENTATIVA n/3` da skill `/executar-tarefa` com `**Resultado**: falhou`
   - Essas falhas registradas são **candidatos prioritários** para virarem lições aprendidas
   - Para cada TENTATIVA falhada, considere se vale uma entrada de lição (causa raiz + como evitar)

1. **Analisar a sessão**
   - O que foi produzido nesta sessão?
   - Quais problemas surgiram?
   - O que funcionou bem?
   - O que foi inesperado?

2. **Documentar em docs/licoes-aprendidas.md**
   Adicione novas entradas (não sobrescreva as anteriores):

   ```markdown
   ## [DATA] — Título da Lição

   **Contexto**: O que estava sendo feito
   **Problema**: O que deu errado ou foi inesperado
   **Causa Raiz**: Por que aconteceu
   **Solução**: O que foi feito para resolver
   **Lição**: O que aprender para o futuro
   **Impacto**: Outros pontos do projeto afetados
   ```

3. **Registrar também o que funcionou bem**

   ```markdown
   ## [DATA] — [SUCESSO] Título

   **O que**: O que foi feito
   **Por que funcionou**: Razão do sucesso
   **Replicar**: Como aplicar isso de novo
   ```

4. **Refinar CLAUDE.md do projeto**
   - Adicione padrões que devem ser seguidos
   - Adicione alertas sobre o que evitar
   - Atualize decisões técnicas se houve mudança

5. **Sugestões de melhoria no processo**
   - Há algo nas skills que deveria mudar?
   - Há algo na estrutura que não está funcionando?
   - Proponha ajustes concretos

6. **Análise crítica final**
   - Avalie criticamente tudo que foi documentado
   - Nunca assuma completude — declare o estado real

Ao final, faça uma análise crítica do que foi produzido e informe o que ainda falta fazer.

## Registro de execução — FIM

Escreva entrada em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] licoes-aprendidas — FIM
**Status**: ok | parcial | erro
**Arquivos tocados**: docs/licoes-aprendidas.md{, CLAUDE.md se atualizado}
**Próximo passo sugerido**: {1 linha ou "nenhum"}
```
