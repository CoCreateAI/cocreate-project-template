---
name: analisar-coerencia
description: Analisa consistência entre specs, código e arquitetura do projeto
context: fork
agent: general-purpose
allowed-tools: Read, Glob, Grep, Edit, Write
---

Você é um especialista em análise de projetos. Analise este projeto como um todo.

## Registro de execução — INÍCIO

Antes de começar, escreva entrada em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] analisar-coerencia — INÍCIO
**Missão**: análise de coerência {priorizando pendências | full scan}
```

Execute na ordem:

0. **Verificar pendências** (PRIORITÁRIO)
   - Leia `.claude/pending-validations.md`
   - Se houver entradas (formato `- [TIMESTAMP] caminho`), **priorize analisar essas specs/ADRs/contextos primeiro** — eles foram editados nesta sessão e ainda não foram validados
   - Liste no início do relatório quais foram processados
   - Ao final da análise, **limpe as entradas processadas** do arquivo (mantenha o cabeçalho)
   - Se o arquivo não existir ou estiver vazio, proceda com análise full scan normal

1. **Inventário completo**
   - Liste todos os arquivos e pastas do projeto
   - Leia todas as specs em docs/specs/
   - Leia todos os ADRs em docs/adr/
   - Leia o CLAUDE.md e docs/mapa-projeto.md

2. **Análise de coerência entre specs**
   - Terminologia é consistente entre todas as specs?
   - Entidades são referenciadas da mesma forma?
   - Há conflitos de escopo ou responsabilidade entre specs?
   - Fluxos se conectam corretamente entre si?
   - Decisões arquiteturais estão alinhadas?
   - Termos do Glossário Canônico no CLAUDE.md são usados de forma consistente?

3. **Análise de coerência entre specs e código**
   - O código implementado reflete fielmente as specs?
   - Há código sem spec correspondente?
   - Há specs sem implementação?
   - Nomenclatura no código bate com a das specs?

4. **Análise estrutural**
   - A estrutura de pastas faz sentido para o escopo do projeto?
   - Há arquivos fora do lugar?
   - O mapa-projeto.md está atualizado?
   - Testes existentes cobrem o código implementado?

5. **Análise de riscos e débitos**
   - Há dependências desatualizadas ou conflitantes?
   - Há padrões inconsistentes no código?
   - Há configs faltando (.env, etc.)?
   - Há decisões técnicas que precisam ser revisadas?

6. **Relatório de coerência**
   - **Coerente**: O que está bem alinhado
   - **Divergências**: O que precisa ser corrigido (com ação concreta)
   - **Riscos**: O que pode dar problema se não for tratado
   - **Recomendações**: Próximas ações prioritárias

7. **Aplicar correções**
   - Atualize CLAUDE.md com descobertas relevantes
   - Atualize mapa-projeto.md se necessário
   - Proponha correções nas specs se houver divergências

Ao final, faça uma análise crítica do que foi produzido e informe o que ainda falta fazer.

## Registro de execução — FIM

Escreva entrada em `.claude/traces/YYYY-MM-DD.md`:

```markdown
### [HH:MM] analisar-coerencia — FIM
**Status**: ok | parcial | erro
**Arquivos tocados**: {lista de specs/CLAUDE.md/mapa-projeto.md modificados}
**Próximo passo sugerido**: {1 linha ou "nenhum"}
```
