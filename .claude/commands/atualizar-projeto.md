## Modo de Execucao

Se o arquivo `.claude/missao-atual.md` existir:
1. Leia-o e use como contexto adicional (sua tarefa especifica esta la, na secao do seu agente)
2. Foque APENAS nos arquivos/escopo atribuidos a voce na missao
3. Ao finalizar, edite `.claude/missao-atual.md` adicionando seu resumo na secao "Resultados > ### atualizar-projeto"

Se o arquivo NAO existir, execute normalmente como comando standalone.

---

Analise tudo que foi produzido ate agora no projeto EK.OS.

Execute na ordem:

1. **Levantar estado atual**
   - Liste todos os arquivos e pastas existentes
   - Identifique o que foi implementado vs o que esta pendente
   - Verifique se ha .env, configs, dependencias instaladas

2. **Atualizar CLAUDE.md com:**
   - Estado atual do projeto (o que existe, o que funciona)
   - Decisoes tecnicas tomadas (stack, padroes, bibliotecas escolhidas)
   - Padroes que emergiram no codigo (convencoes de nomes, estrutura, etc.)
   - Proximos passos identificados
   - Riscos ou debitos tecnicos detectados

3. **Atualizar docs/mapa-projeto.md (CRITICO)**
   - Liste TODOS os arquivos reais do projeto
   - Compare com o mapa-projeto.md atual
   - CADA arquivo deve estar listado com descritivo — nao apenas pastas
   - Adicione arquivos novos que foram criados
   - Remova referencias a arquivos que nao existem mais
   - Marque pastas vazias como "Vazio — sera populado conforme..."
   - Atualize a data de ultima atualizacao no final do arquivo

4. **Verificar consistencia**
   - Specs em docs/specs/ refletem o que foi implementado?
   - Testes em tests/ cobrem o codigo existente?
   - Ha codigo sem spec ou spec sem codigo?

5. **Resumo executivo**
   - Apresente um resumo conciso do estado do projeto
   - Destaque o que precisa de atencao imediata

6. **Analise critica final**
   - Avalie criticamente tudo que foi produzido nesta atualizacao
   - Informe explicitamente o que ainda falta fazer
   - Se a janela de contexto nao permitiu completar tudo, liste os pendentes
   - Nunca assuma que esta completo — declare o estado real

Ao final, faca uma analise critica do que foi produzido e informe o que ainda falta fazer.
