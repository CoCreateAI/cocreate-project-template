# Análise Estratégica — cocreate-project-template (EXEMPLO)

> **Este é um exemplo de output da Fase 5 da skill `/iniciar-projeto`.**
> Mostra como a análise fica após o usuário responder as perguntas das rodadas 1 e 2.
> Usa o próprio template como projeto-exemplo (consistente com os outros exemplos).

---

## Sumário Executivo

O `cocreate-project-template` é open-source mas serve como base de cursos pagos da CoCreateAI. Os 3 riscos críticos são: (1) **fragilidade por dependência dupla** de evolução do Claude Code e do Codex CLI, (2) **bus factor de 1** — só o Rodrigo entende a metodologia SDD profundamente hoje, e (3) **falta de testes de paridade** entre as duas cascas, que podem divergir silenciosamente. Compliance é baixo (template público, sem dados de aluno), mas curso comercial vai exigir LGPD para inscrições.

---

## 1. Mapa de Riscos

### 1.1 Riscos Técnicos

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| T1 | Claude Code muda formato de skills/agents → template quebra | Média | Alto | Aberto |
| T2 | Codex CLI muda API/triggers → casca Codex quebra | Média | Médio | Aberto |
| T3 | Divergência silenciosa entre casca Claude e Codex (skill funciona num lado, no outro não) | Alta | Médio | Aberto |
| T4 | Bancos de perguntas em `docs/perguntas/` ficam grandes demais → estoura context window | Baixa | Baixo | Aceito |

### 1.2 Riscos Comerciais

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| C1 | Aluno do curso usa template e abandona porque acha complexo demais | Média | Alto | Em mitigação |
| C2 | Outro template open-source com tração maior ganha mercado SDD | Baixa | Médio | Aberto |
| C3 | Comunidade CoCreate não adota porque prefere ferramentas próprias | Baixa | Médio | Aberto |

### 1.3 Riscos Regulatórios (Compliance)

| # | Regulação | Probabilidade de não-conformidade | Impacto | Status |
|---|-----------|------------------------------------|---------|--------|
| R1 | LGPD — se o curso pago coletar dados de aluno | Baixa | Médio (multa + reputação) | Em mitigação (DPIA na fase comercial) |
| R2 | Direitos autorais — exemplos do template usam código aberto? | Baixa | Baixo | Aceito (MIT license clara) |

### 1.4 Riscos Humanos

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| H1 | Bus factor 1 — só Rodrigo entende SDD em profundidade hoje | Alta | Crítico | **Em mitigação** (objetivo do próprio curso) |
| H2 | Comunidade espera suporte 1-on-1 que não escala | Média | Médio | Aberto |

### 1.5 Riscos Operacionais

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| O1 | Manutenção dupla (Claude + Codex) consome tempo desproporcional | Alta | Médio | Aceito (decisão estratégica do ADR-001) |
| O2 | Não há CI para testar paridade entre as cascas | Alta | Médio | Aberto (roadmap) |

---

## 2. Análise de Compliance

### 2.1 LGPD — Lei Geral de Proteção de Dados (Brasil)

| Campo | Conteúdo |
|-------|----------|
| **Por que se aplica** | O template em si não trata dados pessoais (é código open-source). MAS o curso comercial baseado nele coleta nome, email, CPF de alunos para emissão de NF + certificado. Compliance acontece no SISTEMA DO CURSO, não no template. |
| **Artigos relevantes** | Art. 5º (dados pessoais), Art. 7º (bases legais), Art. 18 (direitos do titular), Art. 37 (ROPA) |
| **Dados sensíveis tratados** | Nenhum diretamente. CPF é dado pessoal, não sensível. |
| **Bases legais** | Execução de contrato (matrícula) + obrigação legal (NF) + consentimento (newsletter) |
| **Controles a implementar** | (No sistema do curso, não no template) HTTPS, retenção limitada, opt-out de marketing |
| **Direitos do titular** | Processo de atendimento a solicitação implementado no sistema do curso |
| **DPO / Encarregado** | A definir antes do primeiro aluno pagante |
| **Risco de multa** | Baixo (volume pequeno, dados não sensíveis) |

#### Checklist LGPD (escopo: curso comercial — não o template em si)

- [x] Identificação de dado pessoal (CPF, email)
- [ ] Identificação de dado sensível (não há)
- [ ] Transferência internacional? (Stripe internacional, sim — analisar)
- [x] ROPA documentado — pendente para fase comercial
- [ ] Política de privacidade publicada
- [ ] Aviso de consentimento granular
- [ ] Processo Art. 18 definido
- [ ] Plano de resposta a incidente
- [ ] DPIA — necessária se houver tratamento automatizado de decisão (matrícula automática? sim, fazer DPIA)

### 2.2 Direitos autorais / Licenciamento

| Campo | Conteúdo |
|-------|----------|
| **Por que se aplica** | Template é MIT, mas integra bibliotecas (Next.js MIT, FastAPI MIT, Neo4j Apache 2.0 driver). Compatibilidade está OK. |
| **Risco** | Aluno usar template em projeto comercial e questionar atribuição — mitigado pela licença MIT clara |
| **Status** | Resolvido — arquivo LICENSE deixa MIT explícito |

---

## 3. Dependências Críticas

| # | Dependência | Tipo | Criticidade | Plano B |
|---|-------------|------|-------------|---------|
| D1 | Claude Code (Anthropic) | Plataforma IA | Alta | Codex já é alternativa nativa via ADR-001 |
| D2 | Codex CLI (OpenAI) | Plataforma IA | Alta | Claude Code já é alternativa nativa |
| D3 | Anthropic API (modelos Opus/Sonnet) | Modelo IA | Alta | Configuração em CLAUDE.md permite trocar |
| D4 | GitHub (hospedagem do template) | Infraestrutura | Média | Migrável para GitLab/Codeberg se necessário |
| D5 | Rodrigo (conhecimento SDD profundo) | Pessoa-chave | **Crítica** | **Objetivo do curso é dissipar esse conhecimento** |
| D6 | Comunidade WhatsApp CoCreate (~100 profissionais) | Canal de distribuição | Média | Backup: LinkedIn da CoCreate |

---

## 4. Gargalos Previstos

| Etapa do macro processo | Gargalo | Onde IA agrega valor | Onde IA NÃO resolve |
|-------------------------|---------|----------------------|---------------------|
| 1. Onboarding (`/iniciar-projeto`) | Aluno fica preso na primeira pergunta se não entende a metodologia | Exemplos didáticos em `docs/exemplos/` + perguntas guiadas | Calibração de expectativa (precisa contexto do curso) |
| 2. Geração de specs (`/processar-contexto`) | Constitution gerada genérica quando briefing é raso | Guarda detecta e sugere `/iniciar-projeto` antes | Profundidade do briefing depende do usuário |
| 7. Evolução (lições) | Aluno não documenta lições → não cresce metodologicamente | Skill `/licoes-aprendidas` lembra Regra de Diamante | Disciplina de uso recorrente é humana |

---

## 5. Top 5 Riscos com Mitigações

### 5.1 H1 — Bus factor de 1 no conhecimento SDD

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Apenas o Rodrigo domina SDD em profundidade. Se ele ficar indisponível, evolução do template trava. |
| **Probabilidade** | Alta (situação atual) |
| **Impacto** | Crítico |
| **Mitigação proativa** | Curso público de SDD (já em planejamento) — formar 10-20 "embaixadores" da metodologia em 6 meses |
| **Plano de contingência** | Documentação metodológica em `docs/` está completa o suficiente para outra pessoa continuar — testado por aluno piloto |
| **Sinal de alerta antecipado** | Mais de 30 dias sem evolução do template = revisar |
| **Responsável** | Rodrigo + alunos do curso piloto |
| **Status** | Em mitigação |

### 5.2 T3 — Divergência silenciosa entre cascas Claude e Codex

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Skill funciona perfeitamente no Claude Code, mas no Codex tem bug. Aluno Codex acha que template é ruim. |
| **Probabilidade** | Alta |
| **Impacto** | Médio |
| **Mitigação proativa** | Roadmap do ADR-001 inclui "testes automatizados para garantir paridade Claude/Codex em skills críticas" |
| **Plano de contingência** | Quando aluno Codex relatar bug, priorizar fix em até 48h |
| **Sinal de alerta antecipado** | Issue em GitHub com label "codex-only-bug" |
| **Responsável** | Mantenedor do template (Rodrigo no v1) |
| **Status** | Aberto |

### 5.3 C1 — Aluno abandona por complexidade

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Aluno do curso chega no template, vê 13 skills + 4 bancos de perguntas + ADR + camada compartilhada + 2 cascas, e desiste. |
| **Probabilidade** | Média |
| **Impacto** | Alto (taxa de conclusão do curso) |
| **Mitigação proativa** | Quick Start no README com fluxo "Claude Code: 3 comandos para começar". Pedagogia do curso: introduzir 1 conceito por aula. |
| **Plano de contingência** | Versão "minimal" do template (subset de skills) se conclusão < 50% no piloto |
| **Sinal de alerta antecipado** | Aluno piloto leva > 30 min só lendo o README sem rodar `/iniciar-projeto` |
| **Responsável** | Rodrigo + autor do curso |
| **Status** | Em mitigação |

### 5.4 T1 — Claude Code muda formato de skills

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Anthropic muda especificação de SKILL.md ou agents/, todas as skills do template quebram. |
| **Probabilidade** | Média (plataforma jovem ainda) |
| **Impacto** | Alto |
| **Mitigação proativa** | Manter camada compartilhada em `docs/` independente da casca — minimiza retrabalho |
| **Plano de contingência** | Migração em 1-2 semanas para novo formato. Comunicar alunos no canal CoCreate. |
| **Sinal de alerta antecipado** | Acompanhar release notes do Claude Code |
| **Responsável** | Rodrigo |
| **Status** | Aberto (monitorado) |

### 5.5 R1 — LGPD no curso comercial

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | Curso vai cobrar inscrição, coletar CPF para NF. LGPD se aplica ao sistema do curso. |
| **Probabilidade** | Baixa (volume inicial pequeno) |
| **Impacto** | Médio (multa máxima R$ 50M, mas ANPD prioriza casos grandes) |
| **Mitigação proativa** | Antes do primeiro aluno: política de privacidade + ROPA + DPO externo contratado |
| **Plano de contingência** | Se houver incidente, comunicar ANPD em 24h e titulares em 72h (Art. 48) |
| **Sinal de alerta antecipado** | Solicitação de titular Art. 18 sem processo definido = alerta vermelho |
| **Responsável** | Rodrigo + DPO externo (a contratar) |
| **Status** | Em mitigação (parte da fase comercial) |

---

## 6. Decisões Estratégicas Recomendadas

1. **Implementar CI de paridade Claude/Codex antes da v1.0 pública.** Por que: T3 é Alta+Médio. Quando: antes de abrir o template para a comunidade. Responsável: Rodrigo.

2. **Recrutar 3 alunos piloto antes do lançamento do curso.** Por que: valida pedagogia + reduz risco C1. Quando: nas próximas 4 semanas. Responsável: Rodrigo.

3. **Contratar DPO externo antes da primeira matrícula paga.** Por que: LGPD R1 + due diligence comercial. Quando: junto com a abertura comercial do curso. Responsável: Rodrigo + jurídico.

4. **Manter `docs/` rigidamente independente das cascas.** Por que: mitiga T1, T2, T3 simultaneamente. Como aplicar: revisar todo PR que toca `.claude/` ou `.codex/` pra garantir que conteúdo metodológico ficou em `docs/`. Responsável: revisor do PR.

5. **Documentar decisões da metodologia em ADRs.** Por que: dissipa conhecimento + mitiga H1. Quando: contínuo. Responsável: quem implementa a decisão.

---

## 7. Conexões com Specs

| Spec | Como esta análise afeta a spec |
|------|-------------------------------|
| spec-000-constitution.md | Restrições globais: "Camada compartilhada é fonte única", "Paridade Claude/Codex obrigatória em skills críticas" |
| spec-001-paridade-cascas (a criar) | Especifica testes automatizados de paridade entre `.claude/` e `.codex/` |
| spec-002-curso-piloto (a criar) | Especifica formato do curso piloto: 3 alunos, 8 semanas, NPS alvo > 8 |

---

## 8. Evolução do Documento

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| 2026-05-13 | v0.1 | Exemplo inicial criado como referência didática | Rodrigo + IA |

---

> **Como este exemplo foi gerado**: imaginando a sessão real de `/iniciar-projeto` Fase 5 aplicada ao próprio template. Note como a IA **CRUZOU** os dados das fases anteriores: perfil (CEO não-dev) + tipo (open-source mas base de curso pago) + escopo (cursos públicos) + macro processo (uso recorrente em projetos) → riscos específicos. Note também como a IA **TROUXE PROATIVAMENTE** a análise de LGPD ao perceber que curso comercial coleta dados, mesmo sem o usuário ter mencionado.
