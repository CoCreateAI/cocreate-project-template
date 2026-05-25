# Análise Estratégica — {{PROJECT_NAME}}

> Gerado pela Fase 5 da skill `/iniciar-projeto` em {{DATE}}.
> Este arquivo é **evolutivo** — atualize sempre que o cenário de riscos, compliance ou dependências mudar.
> **Documento crítico** — é referenciado pela `spec-000-constitution.md` e usado por `/preparar-missao` para calibrar decisões.

---

## Sumário Executivo

> 3-5 frases que qualquer stakeholder consiga ler em 30 segundos e entender o que pode dar errado neste projeto e o que precisa ser tratado agora.

{{SUMARIO}}

---

## 1. Mapa de Riscos

### 1.1 Riscos Técnicos

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| T1 | {{...}} | Baixa/Média/Alta | Baixo/Médio/Alto/Crítico | Aberto/Mitigado/Aceito |

### 1.2 Riscos Comerciais

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| C1 | {{...}} | Baixa/Média/Alta | Baixo/Médio/Alto/Crítico | Aberto/Mitigado/Aceito |

### 1.3 Riscos Regulatórios (Compliance)

Ver detalhamento na seção 2.

| # | Regulação | Probabilidade de não-conformidade | Impacto | Status |
|---|-----------|------------------------------------|---------|--------|
| R1 | {{LGPD / GDPR / ...}} | Baixa/Média/Alta | Multa, perda de licença, etc. | Aberto/Mitigado/Aceito |

### 1.4 Riscos Humanos

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| H1 | {{...}} | Baixa/Média/Alta | Baixo/Médio/Alto/Crítico | Aberto/Mitigado/Aceito |

### 1.5 Riscos Operacionais

| # | Risco | Probabilidade | Impacto | Status |
|---|-------|---------------|---------|--------|
| O1 | {{...}} | Baixa/Média/Alta | Baixo/Médio/Alto/Crítico | Aberto/Mitigado/Aceito |

---

## 2. Análise de Compliance

> Para cada regulação aplicável, preencha a tabela. Se nenhuma se aplica (raro), justifique no campo "Por que se aplica" com "Não se aplica porque...".

### 2.1 {{REGULAÇÃO_1}} (ex: LGPD)

| Campo | Conteúdo |
|-------|----------|
| **Por que se aplica** | {{...}} |
| **Artigos/cláusulas relevantes** | {{...}} |
| **Dados sensíveis tratados** | {{...}} |
| **Bases legais** | {{Consentimento / Execução de contrato / Interesse legítimo / Obrigação legal}} |
| **Controles a implementar** | {{...}} |
| **Direitos do titular — como o sistema atende** | {{...}} |
| **DPO / Encarregado** | {{Nome ou "A definir"}} |
| **Risco de multa** | {{Baixo / Médio / Alto}} |

#### Checklist específico {{REGULAÇÃO_1}}

- [ ] {{ITEM_CHECKLIST_1}}
- [ ] {{ITEM_CHECKLIST_2}}

### 2.2 {{REGULAÇÃO_2}}

> Repetir estrutura acima para cada regulação aplicável.

---

## 3. Dependências Críticas

| # | Dependência | Tipo | Criticidade | Plano B |
|---|-------------|------|-------------|---------|
| D1 | {{ex: OpenAI API}} | Fornecedor IA | Alta | {{ex: fallback Claude}} |
| D2 | {{ex: GCP Cloud Run}} | Infraestrutura | Alta | {{ex: Docker portátil → AWS}} |
| D3 | {{ex: Neo4j Aura}} | Banco de dados | Crítica | {{ex: backup diário + Neo4j self-hosted}} |
| D4 | {{ex: João, único arquiteto}} | Pessoa-chave | Crítica | {{ex: documentar decisões + onboard segundo dev}} |

---

## 4. Gargalos Previstos

> Onde o processo trava primeiro quando escala. Cruzar com `docs/macro-processo.md`.

| Etapa do macro processo | Gargalo | Onde IA agrega valor | Onde IA NÃO resolve |
|-------------------------|---------|----------------------|---------------------|
| {{ETAPA}} | {{descrição do gargalo}} | {{...}} | {{decisões com componente humano/regulatório}} |

---

## 5. Top 5 Riscos com Mitigações

> Os 5 riscos mais críticos (probabilidade × impacto), com plano concreto.

### 5.1 {{RISCO_1}}

| Campo | Conteúdo |
|-------|----------|
| **Descrição** | {{...}} |
| **Probabilidade** | Baixa / Média / Alta |
| **Impacto** | Baixo / Médio / Alto / Crítico |
| **Mitigação proativa** | {{O que fazer ANTES — ação concreta com responsável e prazo}} |
| **Plano de contingência** | {{O que fazer SE o risco se materializar}} |
| **Sinal de alerta antecipado** | {{Como detectar antes que vire problema}} |
| **Responsável** | {{Nome}} |
| **Status** | Aberto / Em mitigação / Resolvido / Aceito |

### 5.2 {{RISCO_2}}

> Repetir estrutura para top 5.

---

## 6. Decisões Estratégicas Recomendadas

> Lista priorizada de decisões/ações que a IA recomenda **antes** de iniciar a implementação. Cada item é uma ação concreta.

1. **{{DECISÃO_1}}** — Por que: {{...}}. Quando: antes de spec-001. Responsável: {{...}}.
2. **{{DECISÃO_2}}** — Por que: {{...}}. Quando: antes do primeiro deploy. Responsável: {{...}}.
3. **{{DECISÃO_3}}** — Por que: {{...}}. Quando: contínuo. Responsável: {{...}}.

---

## 7. Conexões com Specs

| Spec | Como esta análise afeta a spec |
|------|-------------------------------|
| spec-000-constitution.md | Restrições globais + glossário de compliance |
| spec-001-*.md | {{...}} |

---

## 8. Evolução do Documento

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| {{DATE}} | v0.1 | Análise inicial gerada por `/iniciar-projeto` Fase 5 | {{USER}} |
