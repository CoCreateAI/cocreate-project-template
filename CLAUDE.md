# EK.OS — Contexto do Projeto

> Ultima atualizacao: 2026-03-31 (estrutura inicial criada, specs 000+001 draft)

## Identificacao

| Campo | Valor |
|-------|-------|
| **Projeto** | EK.OS (Enterprise Knowledge Operation System) |
| **Descricao** | Sistema de inteligencia organizacional proativa para o C-suite — produto enterprise da CoCreate AI |
| **Lider** | Rodrigo Trindade Coutinho (estrategista de IA, fundador CoCreate AI) |
| **Inicio** | Marco 2026 |
| **Deadline MVP** | A definir |

## Visao

Ser o sistema de inteligencia organizacional proativa que elimina a cegueira gerencial nas empresas brasileiras, transformando evidencias corporativas em clareza estrategica atraves de grafos semanticos e IA.

## Missao Corrente

| Campo | Valor |
|-------|-------|
| **Foco** | Estrutura inicial do projeto + specs fundacionais |
| **Tarefas Prioritarias** | 1. ~~Criar estrutura de pastas~~ FEITO  2. ~~spec-000 constitution~~ FEITO  3. ~~spec-001 estrategia~~ FEITO  4. Proxima: spec-002 arquitetura plataforma |
| **Agentes Necessarios** | `/processar-contexto`, `/executar-tarefa` |
| **Modo** | Rapido |
| **Restricoes** | Fase de specs — sem codigo ainda |
| **Atualizado em** | 2026-03-31 |

> Use `/preparar-missao` para definir o foco. O comando recomenda **Modo Rapido** (execucao direta) ou **Modo Orquestrado** (subagentes em paralelo) conforme a complexidade.

## Stack Tecnica

| Camada | Tecnologia | Status |
|--------|-----------|--------|
| **Frontend** | Next.js, React, Tailwind CSS, Radix UI | Nao iniciado |
| **Backend** | Python 3.11, FastAPI, Pydantic AI | Nao iniciado |
| **Banco de Dados** | Neo4j Aura (UNICO — grafo + vector search) | Nao iniciado |
| **AI/LLM** | Google Gemini (Flash + Pro + Embedding) | Nao iniciado |
| **Deploy** | Google Cloud Run + Artifact Registry + Secret Manager | Nao iniciado |
| **Ferramentas** | Git/GitHub, Claude Code | Em uso |

## Estrutura de Pastas

```
EK.OS/
  CLAUDE.md                                  — Este arquivo
  .env.example                               — Template de variaveis de ambiente
  .gitignore                                 — Regras de exclusao Git
  .github/
    workflows/deploy.yml                     — CI/CD pipeline (placeholder)
  .claude/
    commands/                                — Agent commands (10 agentes adaptados para EK.OS)
    settings.local.json                      — Config local do Claude Code
  scripts/
    deploy-backend.ps1 / .sh                 — Deploy backend para Cloud Run
    deploy-frontend.ps1 / .sh                — Deploy frontend para Cloud Run
  docs/
    mapa-projeto.md                          — Mapa completo do projeto
    adr/                                     — Architecture Decision Records
      adr-001-stack-choice.md                — Stack: Next.js + FastAPI + Neo4j + Gemini
    raw/
      ekos.txt                               — Conceito original do EK.OS (transcricao)
    specs/                                   — Especificacoes SDD
      spec-000-constitution.md               — Constitution: visao, principios, glossario, entidades
      spec-001-estrategia-produto.md         — Estrategia: horizontal-first, vertical-ready, fases
  src/
    backend/                                 — FastAPI + Neo4j (placeholder)
      Dockerfile
      main.py
      requirements.txt
      app/ (config, database, models, llm, routes/)
    frontend/                                — Next.js (placeholder)
      Dockerfile
      package.json
      src/app/
    shared/                                  — Tipos/utilitarios compartilhados (futuro)
  tests/
    backend/                                 — Testes backend (placeholder)
    frontend/                                — Testes frontend (placeholder)
```

## Glossario Canonico

| Termo | Definicao |
|-------|-----------|
| **EK.OS** | Enterprise Knowledge Operation System — sistema de inteligencia organizacional proativa |
| **EKS** | Enterprise Knowledge System — conceito/disciplina de conhecimento empresarial |
| **Ontologia Corporativa** | Modelagem estruturada do conhecimento organizacional |
| **Ficha Executiva** | Entregavel principal — documento com achados, evidencias e recomendacoes |
| **Assessment** | Processo inicial de coleta e analise das 4 evidencias corporativas |
| **Triangulo Semantico** | Modelo central: Intencao x Movimento x Tensao |
| **Inteligencia Proativa** | IA que gera entregas sem ser perguntada — oposto de chatbot |
| **Industry Pack** | Camada de configuracao vertical (templates ontologia + KPIs por setor) |
| **Bloco de Upload** | Conjunto tematico de documentos por custodiante |

## Regras do Projeto

1. **EK.OS NAO e chatbot** — e inteligencia proativa, gera entregas sem ser perguntado
2. **EK.OS NAO e BI/dashboard** — e sistema de deteccao e recomendacao com evidencia rastreavel
3. **Neo4j e o UNICO banco** — sem bancos relacionais
4. **Horizontal-first, vertical-ready** — produto unico, Industry Packs como configuracao
5. **Friccao minima** — 4 evidencias, nao "acesso a empresa toda"
6. **Assessment como porta de entrada** — vende prova de valor antes do sistema completo
7. **PT-BR como idioma primario** — EN quando necessario
8. **Mermaid obrigatorio** — em toda spec e artefato arquitetural
9. **SDD (Spec-Driven Development)** — specs sao verdade, codigo e gerado a partir delas
10. **Testes em tests/** — nunca misturar testes com codigo fonte
11. **Porta 8004** — para nao conflitar com CoCreate.Hub (8003)

## Sistema de Agentes

O projeto usa um sistema multi-agent com dois modos de execucao, identico ao CoCreate.Hub.

### Comandos de Controle

| Comando | Papel |
|---------|-------|
| `/preparar-missao` | **Cerebro da sessao** — entende a mensagem, atualiza Missao Corrente, recomenda modo |
| `/orquestrar` | **Executor** — executa a missao no modo recomendado |
| `/status-agentes` | Consulta resultados da ultima orquestracao |

### Agentes Especializados

| Agente | Quando usar | Especialidade |
|--------|-------------|--------------|
| `/processar-contexto` | Material novo em `docs/raw/` | Transcricoes, reunioes → specs + ADRs |
| `/analisar-coerencia` | Mudanca grande que pode conflitar | Gap analysis: specs vs codigo vs arquitetura |
| `/executar-tarefa` | Implementacao de codigo | Backend + frontend + testes |
| `/refinar-conteudo` | Textos precisam de trabalho | Copy executivo, posicionamento, narrativa |
| `/diretor-experiencias-web-generativas` | Componentes visuais | UX premium, experiencias generativas |
| `/atualizar-projeto` | Mudancas significativas | Sincroniza CLAUDE.md + mapa-projeto.md |
| `/licoes-aprendidas` | Erros ou decisoes nao-obvias | Regra de Diamante |

### Modos de Execucao

**Modo Rapido** (padrao):
```
/preparar-missao → aprova → execucao direta → /atualizar-projeto (se necessario)
```

**Modo Orquestrado** (missoes complexas):
```
/preparar-missao → /orquestrar → subagentes em paralelo → consolidacao
```

## Estado Atual

### Documentacao (~5% — specs iniciais)
- [x] spec-000-constitution.md — visao, principios, glossario, entidades, personas, Triangulo Semantico
- [x] spec-001-estrategia-produto.md — decisao horizontal-first, 5 features, fases, posicionamento
- [ ] spec-002 — Arquitetura da Plataforma
- [ ] spec-003 — Assessment Flow
- [ ] spec-004 — Modelo de Dados Neo4j
- [ ] spec-005 — Ontologia do Triangulo Semantico
- [ ] spec-006 — Pipeline de Ingestao de Documentos
- [ ] spec-007 — Ficha de Desalinhamento Estrategico
- [ ] specs 008-013 — Features Fase 2 + Auth + Deploy

### Frontend (0% — nao iniciado)
- [ ] Projeto Next.js inicializado

### Backend (0% — nao iniciado)
- [ ] FastAPI configurado

### Testes (0% — nao iniciado)
- [ ] Suite de testes configurada

### Deploy (0% — nao iniciado)
- [ ] Dockerfiles
- [ ] Cloud Run

## Relacao com CoCreate.Hub

| Aspecto | CoCreate.Hub | EK.OS |
|---------|-------------|-------|
| **Natureza** | Hub de comunidade + educacao | Produto enterprise |
| **Persona** | Profissionais tecnicos e de negocios | C-suite, board, diretoria |
| **Modelo** | Freemium (Free/Premium/Business) | B2B enterprise (Assessment → Contrato) |
| **Conexao** | Hub fala sobre EK.OS, gera awareness e leads | EK.OS valida a tese e gera receita |

## Proximos Passos (por prioridade)

### P0 — Fundacao
1. ~~Criar estrutura do projeto~~ **FEITO**
2. ~~spec-000 constitution~~ **FEITO**
3. ~~spec-001 estrategia de produto~~ **FEITO**
4. spec-002 — Arquitetura da Plataforma (multi-tenant, API design, componentes)
5. spec-003 — Assessment Flow (fluxo completo de assessment)
6. spec-005 — Ontologia do Triangulo Semantico (modelagem Neo4j)
7. spec-007 — Ficha de Desalinhamento Estrategico (output principal)

### P1 — MVP
8. spec-004 — Modelo de Dados Neo4j
9. spec-006 — Pipeline de Ingestao de Documentos
10. spec-012 — Autenticacao e Multi-tenancy
11. spec-013 — Deploy e Infraestrutura
12. Backend: FastAPI + Neo4j + Auth + Pipeline
13. Frontend: Upload + Dashboard + Ficha

### P2 — Expansao
14. specs 008-011 — Features Fase 2 (Radar, Navegador, Cockpit, Mapa)
15. Industry Packs (templates por setor)

## Stakeholders

| Pessoa | Papel | Foco |
|--------|-------|------|
| **Rodrigo Trindade Coutinho** | Fundador, estrategista de IA | Visao, arquitetura EKS, produto, execucao |
