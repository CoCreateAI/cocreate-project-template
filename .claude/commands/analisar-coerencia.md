## Modo de Execucao

Se o arquivo `.claude/missao-atual.md` existir:
1. Leia-o e use como contexto adicional (sua tarefa especifica esta la, na secao do seu agente)
2. Foque APENAS nos arquivos/escopo atribuidos a voce na missao
3. Ao finalizar, edite `.claude/missao-atual.md` adicionando seu resumo na secao "Resultados > ### analisar-coerencia"

Se o arquivo NAO existir, execute normalmente como comando standalone.

---

Voce e um especialista em analise de projetos. Analise o projeto EK.OS como um todo.

Execute na ordem:

1. **Inventario completo**
   - Liste todos os arquivos e pastas do projeto
   - Leia todas as specs em docs/specs/
   - Leia todos os ADRs em docs/adr/
   - Leia o CLAUDE.md e docs/mapa-projeto.md

2. **Analise de coerencia entre specs**
   - Terminologia e consistente entre todas as specs?
   - Entidades sao referenciadas da mesma forma?
   - Ha conflitos de escopo ou responsabilidade entre specs?
   - Fluxos se conectam corretamente entre si?
   - Decisoes arquiteturais estao alinhadas?
   - Conceitos-chave (EK.OS, assessment, Triangulo Semantico, Ficha Executiva, Blocos de Upload, ontologia corporativa) sao usados de forma consistente?

3. **Analise de coerencia entre specs e codigo**
   - O codigo implementado reflete fielmente as specs?
   - Ha codigo sem spec correspondente?
   - Ha specs sem implementacao?
   - Nomenclatura no codigo bate com a das specs?

4. **Analise estrutural**
   - A estrutura de pastas faz sentido para o escopo do projeto?
   - Ha arquivos fora do lugar?
   - O mapa-projeto.md esta atualizado?
   - Testes existentes cobrem o codigo implementado?

5. **Analise de riscos e debitos**
   - Ha dependencias desatualizadas ou conflitantes?
   - Ha padroes inconsistentes no codigo?
   - Ha configs faltando (.env, etc.)?
   - Ha decisoes tecnicas que precisam ser revisadas?

6. **Relatorio de coerencia**
   Apresente um relatorio estruturado:
   - **Coerente**: O que esta bem alinhado
   - **Divergencias**: O que precisa ser corrigido (com acao concreta)
   - **Riscos**: O que pode dar problema se nao for tratado
   - **Recomendacoes**: Proximas acoes prioritarias

7. **Aplicar correcoes**
   - Atualize CLAUDE.md com descobertas relevantes
   - Atualize mapa-projeto.md se necessario
   - Proponha correcoes nas specs se houver divergencias

Ao final, faca uma analise critica do que foi produzido e informe o que ainda falta fazer.
