# Banco de Perguntas — Análise Estratégica (Riscos + Compliance + Dependências)

> Este arquivo é parte do template **cocreate-project-template** (metodologia SDD da CoCreate AI).
> É consumido pela Fase 5 da skill `/iniciar-projeto` (Claude Code) e `iniciar-projeto` (Codex).
> **Esta fase é crítica e não pode falhar** — é o "suporte todo" do projeto: identifica o que pode dar errado e o que precisa ser tratado antes de implementar.
> Também serve como artefato pedagógico independente.

## Propósito

Antes de qualquer linha de código, **mapear sistematicamente**:

1. **Riscos** que podem fazer o projeto falhar (técnicos, comerciais, regulatórios, humanos, operacionais)
2. **Compliance e regulação** que se aplicam concretamente ao projeto (não só "tem LGPD?", mas O QUE LGPD significa pra este projeto)
3. **Dependências críticas** (fornecedores, integrações, pessoas-chave, sistemas legados)
4. **Gargalos previstos** (etapas do processo que vão travar primeiro)
5. **Mitigações** específicas para os top 3-5 riscos

Esta fase é diferente da captura de "Tipo de Projeto" e "Escopo": aqui a IA **analisa criticamente** os dados coletados nas fases anteriores e produz um **relatório acionável**, não só checklist preenchido.

## Quando aplicar

- Como Fase 5 da skill `/iniciar-projeto`, depois de perfil + tipo + escopo + macro processo
- Pode ser re-executada quando o projeto mudar de fase (ex: passou de MVP pra escala, novo país, novo cliente B2G)
- Pode ser invocada isoladamente para revisão estratégica periódica

## Onde salvar a resposta

Arquivo `docs/analise-estrategica.md` (gerado a partir de `docs/analise-estrategica.template.md`). É **evolutivo** — atualize sempre que o cenário de riscos mudar.

---

## Perguntas + Análise

### Bloco 1 — Mapa de Riscos (5 dimensões)

Para cada dimensão, identifique riscos concretos (não genéricos):

#### 1.1 Riscos técnicos
- Tecnologias novas/imaturas que vão ser usadas?
- Integrações com sistemas legados sem documentação?
- Performance/escala como requisito desde o início?
- Dependência de modelos de IA (versões, custos, limites de rate)?

#### 1.2 Riscos comerciais
- Mercado validado ou hipótese?
- Concorrência direta já estabelecida?
- Modelo de receita testado em projetos similares?
- Cliente piloto comprometido ou apenas interessado?

#### 1.3 Riscos regulatórios (Compliance)
- LGPD: que dados pessoais o sistema processa?
- Setor regulado? (saúde, financeiro, educação, energia)
- Operação internacional? (GDPR, CCPA)
- Compliance corporativo do cliente B2B/B2G? (SOC2, ISO 27001, HIPAA)
- Direitos autorais / propriedade intelectual (especialmente com IA generativa)?

#### 1.4 Riscos humanos
- Equipe suficiente pra escopo?
- Conhecimento concentrado em 1 pessoa (bus factor)?
- Stakeholder-chave com agenda concorrente?
- Cultura organizacional resistente à mudança?

#### 1.5 Riscos operacionais
- Disponibilidade de infraestrutura (cloud, on-premise)?
- Custo recorrente conhecido ou estimado?
- Plano de continuidade (backup, disaster recovery)?
- Suporte pós-deploy planejado?

### Bloco 2 — Aprofundamento de Compliance

Para CADA regulação que aplicar ao projeto, capture:

| Campo | Perguntas |
|-------|-----------|
| **Regulação** | LGPD / GDPR / HIPAA / SOC2 / ISO 27001 / ANPD / CFM / outros |
| **Por que se aplica** | Que aspecto do projeto a regulação toca? (dados sensíveis, setor, geografia) |
| **Artigos/cláusulas relevantes** | Quais artigos específicos a IA precisa lembrar ao implementar? |
| **Dados sensíveis tratados** | Lista concreta (CPF, dados de saúde, financeiros, biométricos, etc.) |
| **Bases legais** | Consentimento / execução de contrato / interesse legítimo / obrigação legal |
| **Controles a implementar** | Criptografia em repouso, em trânsito, anonimização, pseudonimização, logs de acesso, retenção limitada |
| **Direitos do titular** | Acesso, retificação, exclusão, portabilidade — como o sistema atende? |
| **DPO / Encarregado** | Já definido? Quem? |
| **Risco de multa** | Baixo / Médio / Alto — com base em volume de dados + sensibilidade |

#### Checklist LGPD (uso recorrente em projetos brasileiros)

- [ ] O projeto trata dado pessoal? (Art. 5º, I)
- [ ] Algum dado é sensível? (origem racial, saúde, biometria — Art. 5º, II)
- [ ] Há transferência internacional de dados? (Art. 33)
- [ ] Há tratamento de dados de criança/adolescente? (Art. 14)
- [ ] Existe ROPA (Registro de Operações de Tratamento — Art. 37)?
- [ ] Política de privacidade atualizada para o sistema?
- [ ] Aviso de consentimento granular implementado?
- [ ] Processo de atendimento a solicitação de titular (Art. 18) definido?
- [ ] Plano de resposta a incidente de segurança? (Art. 48)
- [ ] DPIA / RIPD necessária? (Art. 5º, XVII)

### Bloco 3 — Dependências Críticas

Identifique tudo que, se falhar, derruba o projeto:

1. **Fornecedores de IA/LLM**: OpenAI, Anthropic, Google, Azure — limites de rate, mudanças de preço, descontinuação de modelo
2. **Infraestrutura**: GCP, AWS, Azure, Vercel — região, SLA, custo
3. **Bancos de dados**: Neo4j Aura, PostgreSQL, Supabase — versão, licença
4. **Integrações terceiras**: APIs externas, webhooks, sistemas legados — versão, contrato
5. **Pessoas-chave**: quem é insubstituível no curto prazo
6. **Conhecimento tácito**: o que está só na cabeça de alguém (não documentado)

### Bloco 4 — Gargalos Previstos

Olhando o macro processo (`docs/macro-processo.md`), identifique:

- Qual etapa vai travar primeiro quando o projeto escalar?
- Onde está o trabalho manual que não escala?
- Que decisão precisa de aprovação humana e cria gargalo de tempo?
- Onde a IA pode reduzir o gargalo (automação) e onde NÃO pode (juízo, regulação)?

### Bloco 5 — Mitigações para o Top 5

Para os 5 riscos mais críticos (priorize por **probabilidade x impacto**):

| Campo | Conteúdo |
|-------|----------|
| **Risco** | Descrição concreta |
| **Probabilidade** | Baixa / Média / Alta |
| **Impacto** | Baixo / Médio / Alto / Crítico |
| **Mitigação proativa** | O que fazer ANTES de o risco se materializar |
| **Plano de contingência** | O que fazer SE o risco se materializar |
| **Sinal de alerta antecipado** | Como detectar que o risco está aumentando |
| **Responsável** | Quem monitora |

---

## Output esperado

Arquivo `docs/analise-estrategica.md` no formato do template em [`docs/analise-estrategica.template.md`](../analise-estrategica.template.md).

A IA deve gerar um **relatório analítico**, não só checklist. Para cada bloco, além de capturar dados, deve:

- **Cruzar com o macro processo** — onde no fluxo o risco se materializa?
- **Cruzar com o tipo de projeto** — riscos diferentes pra projeto interno vs externo, B2B vs B2C
- **Cruzar com stakeholders** — quem é afetado por cada risco?
- **Propor decisões concretas** — "considerar adicionar X, evitar Y, validar Z antes de continuar"

## Exemplos de análise

### Exemplo A — SaaS B2B com dados de saúde no Brasil

**Compliance**: LGPD + CFM (Conselho Federal de Medicina) + ANS se for plano de saúde.

- **Dados sensíveis**: prontuário, diagnóstico, prescrição (Art. 5º, II, LGPD)
- **Base legal**: execução de contrato + consentimento granular para uso secundário (analytics, treinamento de IA)
- **Controles obrigatórios**: criptografia ponta-a-ponta, logs de acesso por usuário, retenção máxima de 20 anos (CFM Res. 1.821/2007)
- **Risco crítico**: vazamento de prontuário — multa LGPD até 2% do faturamento (limite R$ 50M)
- **Mitigação**: pseudonimização em ambientes de dev/staging, MFA obrigatório, treinamento da equipe trimestral
- **Decisão recomendada**: contratar DPO externo antes de captar primeiro paciente real; fazer DPIA antes do MVP

### Exemplo B — Ferramenta interna de produtividade comercial

**Compliance**: LGPD (dados de leads e clientes B2B — geralmente menos sensível, mas ainda dados pessoais de contatos comerciais).

- **Dados pessoais**: nome, email, telefone de pessoas físicas em empresas-clientes
- **Base legal**: interesse legítimo (relação comercial existente) + consentimento para marketing
- **Controles mínimos**: HTTPS, controle de acesso por usuário, opt-out de comunicações
- **Risco baixo**: volume pequeno, dados não sensíveis
- **Decisão recomendada**: política de privacidade interna + treinamento básico; não precisa de DPO dedicado

### Exemplo C — Plataforma dMRV (carbono/biochar)

**Compliance**: ISO 14064 (gases efeito estufa) + padrões VCS/Verra + ANEEL (se tokenização envolve energia) + LGPD (dados de produtores).

- **Riscos regulatórios**: emissão de crédito sem validação científica adequada — perda de credibilidade no mercado de carbono
- **Dependências críticas**: validador certificado (terceiro), registro VCS, oracles de dados ambientais
- **Mitigação**: validação por amostragem + auditoria independente anual + revisão de metodologia por painel científico

---

## Como aplicar (instruções pro agente)

1. **Esta fase é OBRIGATÓRIA** se o projeto for externo (B2B, B2C, B2G). Para projeto interno simples, ainda assim faça versão enxuta (mínimo: bloco 1 + bloco 5).

2. **Leia primeiro** os artefatos das fases anteriores:
   - `~/.claude/CLAUDE.md` (Perfil do Usuário)
   - `CLAUDE.md` local (Tipo de Projeto)
   - `docs/raw/00-perfil-projeto.md` (Escopo)
   - `docs/macro-processo.md` (Fluxo do negócio)

3. **Não pergunte tudo de uma vez**. Faça em duas rodadas:
   - **Rodada 1**: blocos 1, 2 e 3 (mapeamento — perguntas + capturas)
   - **Rodada 2**: blocos 4 e 5 (análise crítica — você ANALISA, propõe, valida com usuário)

4. **No bloco 2 (Compliance)**, seja PROATIVO: se o usuário disse "B2C, Brasil, dados de saúde" — VOCÊ traz LGPD + CFM + checklist sem esperar ele lembrar. Compliance que falta é o que mais derruba projeto na fase de validação.

5. **No bloco 5 (Mitigações)**, force decisões concretas. Frases como "atenção a X" não são mitigação. "Implementar criptografia AES-256 em campo Y antes do primeiro deploy" é mitigação.

6. **Termine com análise crítica** (Regra de Ouro): liste explicitamente os top 3 riscos que precisam ação ANTES de qualquer linha de código.

7. **Confirme o relatório** com o usuário antes de salvar. Permita revisão linha a linha — este documento vira parte da constitution (referenciado em spec-000).

8. **Acentuação PT-BR sempre correta** (regra crítica).
