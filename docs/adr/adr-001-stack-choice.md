# ADR 001 — Escolha de Stack Tecnologica

**Data**: 2026-03-31 | **Status**: Aceita

---

## Contexto

O EK.OS (Enterprise Knowledge Operation System) precisa de uma stack que suporte:
- Modelagem de conhecimento organizacional em grafo (ontologia corporativa)
- Processamento de linguagem natural em documentos e transcricoes
- Busca semantica por similaridade (vector search)
- Multi-tenancy (multiplas empresas clientes)
- Interface web moderna para upload e visualizacao de fichas executivas
- Deploy em cloud com seguranca enterprise

A CoCreate AI ja possui experiencia validada com esta stack no projeto CoCreate.Hub, o que reduz risco de adocao e acelera o desenvolvimento.

## Decisao

Reutilizar a mesma stack do CoCreate.Hub:

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Backend** | Python 3.11, FastAPI, Pydantic AI | Maturidade, tipagem, async nativo, ecossistema IA |
| **Frontend** | Next.js, React, Tailwind CSS | SSR, componentes, DX, performance |
| **Banco de Dados** | Neo4j Aura (UNICO) | Grafo + vector search nativo, ontologia como 1st class, Cypher |
| **AI/LLM** | Google Gemini (Flash + Pro + Embedding) | 3 modelos otimizados por custo/capacidade, 1M tokens contexto |
| **Deploy** | Google Cloud Run + Artifact Registry + Secret Manager | Serverless, auto-scale, secrets seguros |

### Diferencas em relacao ao CoCreate.Hub

| Aspecto | CoCreate.Hub | EK.OS |
|---------|-------------|-------|
| **Porta API** | 8003 | 8004 |
| **Multi-tenancy** | Single tenant (comunidade unica) | Multi-tenant (1 empresa = 1 tenant) |
| **Pipeline** | Livro/capitulos | Documentos corporativos (PDF, DOCX, transcricoes) |
| **Vector search** | Persona embeddings | Document embeddings, similarity search |
| **Auth** | JWT simples (membro individual) | JWT + tenant isolation |

## Consequencias

### Positivas
- **Reutilizacao de conhecimento**: equipe ja domina a stack
- **Patterns validados**: auth, Neo4j connection, Gemini integration ja testados no Hub
- **Ecossistema compartilhado**: mesmos scripts de deploy, Dockerfiles, configs
- **Neo4j como unico banco**: ontologia, vector search e dados em um so lugar

### Negativas
- **Neo4j Aura custo**: pode escalar com volume de dados de multiplos clientes
- **Gemini lock-in**: dependencia de Google AI Studio (mitigado por abstrair em llm.py)
- **Python + Node**: dois runtimes (mitigado por Docker)

## Alternativas Consideradas

1. **PostgreSQL + pgvector**: Rejeitado — perde a modelagem de grafo nativa que e core do EK.OS
2. **LangChain**: Rejeitado — abstraction overhead desnecessaria, google-genai direto e mais simples
3. **Azure OpenAI**: Considerado para futuro — Gemini cobre o MVP com melhor custo
4. **Supabase**: Rejeitado — nao suporta grafos nativamente
