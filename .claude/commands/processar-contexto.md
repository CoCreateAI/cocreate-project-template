## Modo de Execucao

Se o arquivo `.claude/missao-atual.md` existir:
1. Leia-o e use como contexto adicional (sua tarefa especifica esta la, na secao do seu agente)
2. Foque APENAS nos arquivos/escopo atribuidos a voce na missao
3. Ao finalizar, edite `.claude/missao-atual.md` adicionando seu resumo na secao "Resultados > ### processar-contexto"

Se o arquivo NAO existir, execute normalmente como comando standalone.

---

Leia os arquivos de contexto bruto do projeto EK.OS (qualquer .md ou .txt com conteudo bruto de reuniao, transcricao, chat ou briefing) na pasta `docs/raw/`.

## Contexto do Projeto

EK.OS (Enterprise Knowledge Operation System) e o produto enterprise da CoCreate AI. Lider: Rodrigo Trindade Coutinho (estrategista de IA, fundador). Sistema de inteligencia organizacional proativa para o C-suite, baseado em ontologia corporativa, grafos semanticos (Neo4j) e IA (Gemini).

Execute na ordem:

1. **Analisar o contexto bruto**
   - Identifique o objetivo, escopo, entidades, relacionamentos, restricoes
   - Extraia requisitos funcionais e nao-funcionais
   - Identifique decisoes ja tomadas vs pontos em aberto
   - Mapeie conceitos-chave: EK.OS, assessment, Triangulo Semantico, Ficha Executiva, Blocos de Upload, ontologia corporativa, Intencao/Movimento/Tensao
   - Identifique stakeholders e seus papeis

2. **Gerar/atualizar Spec em docs/specs/**
   - Crie a spec seguindo Spec-Driven Development
   - Inclua: objetivo, escopo, entidades, fluxos, restricoes, criterios de aceitacao
   - Use diagramas Mermaid para fluxos e arquitetura
   - Nomeie como `spec-NNN-titulo.md`

3. **Gerar ADR em docs/adr/**
   - Documente decisoes arquiteturais identificadas no contexto
   - Formato: Contexto, Decisao, Consequencias, Alternativas consideradas
   - Nomeie como `adr-NNN-titulo.md`

4. **Propor estrutura de pastas do projeto**
   - Baseada na stack e no escopo identificado
   - Inclua pasta `tests/` espelhando a estrutura do codigo
   - Crie a estrutura fisica (pastas e arquivos base)
   - Atualize `docs/mapa-projeto.md` com descritivo de cada pasta

5. **Atualizar CLAUDE.md do projeto**
   - Preencha stack, decisoes tecnicas, estrutura
   - Atualize status e proximos passos

6. **Verificar pre-requisitos**
   - Liste comandos que o usuario precisa rodar para setup (npm install, pip install, etc.)
   - Forneca comandos completos prontos para copiar/colar
   - Identifique .env ou configs necessarias

7. **Analise critica final**
   - Avalie criticamente tudo que foi produzido
   - Informe explicitamente o que ainda falta fazer
   - Se a janela de contexto nao permitiu completar tudo, liste os pendentes
   - Nunca assuma que esta completo — declare o estado real

Ao final, faca uma analise critica do que foi produzido e informe o que ainda falta fazer.
