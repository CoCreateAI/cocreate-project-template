## Modo de Execucao

Se o arquivo `.claude/missao-atual.md` existir:
1. Leia-o e use como contexto adicional (sua tarefa especifica esta la, na secao do seu agente)
2. Foque APENAS nos arquivos/escopo atribuidos a voce na missao
3. Ao finalizar, edite `.claude/missao-atual.md` adicionando seu resumo na secao "Resultados > ### licoes-aprendidas"

Se o arquivo NAO existir, execute normalmente como comando standalone.

---

Revise as ultimas interacoes, o codigo produzido e os erros encontrados no projeto EK.OS.

Execute na ordem:

1. **Analisar a sessao**
   - O que foi produzido nesta sessao?
   - Quais problemas surgiram?
   - O que funcionou bem?
   - O que foi inesperado?

2. **Documentar em docs/licoes-aprendidas.md**
   Adicione novas entradas (nao sobrescreva as anteriores) no formato:

   ```markdown
   ## [DATA] — Titulo da Licao

   **Contexto**: O que estava sendo feito
   **Problema**: O que deu errado ou foi inesperado
   **Causa Raiz**: Por que aconteceu
   **Solucao**: O que foi feito para resolver
   **Licao**: O que aprender para o futuro
   **Impacto**: Outros pontos do projeto afetados
   ```

3. **Registrar tambem o que funcionou bem**
   Use o formato:

   ```markdown
   ## [DATA] — [SUCESSO] Titulo

   **O que**: O que foi feito
   **Por que funcionou**: Razao do sucesso
   **Replicar**: Como aplicar isso de novo
   ```

4. **Refinar CLAUDE.md do projeto**
   - Adicione padroes que devem ser seguidos
   - Adicione alertas sobre o que evitar
   - Atualize decisoes tecnicas se houve mudanca

5. **Sugestoes de melhoria no processo**
   - Ha algo nos commands que deveria mudar?
   - Ha algo na estrutura que nao esta funcionando?
   - Proponha ajustes concretos

6. **Analise critica final**
   - Avalie criticamente tudo que foi documentado
   - Informe explicitamente se ha licoes adicionais que deveriam ser capturadas
   - Se a janela de contexto nao permitiu completar tudo, liste os pendentes
   - Nunca assuma que esta completo — declare o estado real

Ao final, faca uma analise critica do que foi produzido e informe o que ainda falta fazer.
