# Banco de Perguntas — Tipo de Projeto

> Este arquivo é parte do template **cocreate-project-template** (metodologia SDD da CoCreate AI).
> É consumido pelas skills `/iniciar-projeto` (Claude Code) e `iniciar-projeto` (Codex).
> Também serve como artefato pedagógico independente.

## Propósito

Classificar o projeto **antes de escrever a constitution**. A natureza do projeto (interno vs externo, produto vs consultoria, estágio) muda radicalmente que perguntas fazer no escopo, que decisões arquiteturais priorizar, e que tom o material vai ter.

## Quando aplicar

- Após capturar o perfil do usuário ([perfil-usuario.md](perfil-usuario.md))
- Antes do escopo inicial ([escopo-inicial.md](escopo-inicial.md))

## Onde salvar a resposta

Seção "Tipo de Projeto" no `CLAUDE.md` local do projeto.

---

## Perguntas

### Bloco 1 — Orientação (interno vs externo)

1. **Este projeto é para uso INTERNO ou EXTERNO?**
   - **Interno**: uso próprio, da empresa, do time. Ex: ferramenta de produtividade interna, dashboard interno, automação de processo.
   - **Externo**: vai pra fora — clientes, mercado, comunidade, alunos. Ex: SaaS, produto comercial, ferramenta open source, projeto de consultoria entregue ao cliente.
   - **Híbrido**: começa interno mas pode virar externo (ou vice-versa).

### Bloco 2 — Categoria

2. **Qual a categoria principal do projeto?** Escolha a mais próxima:
   - **SaaS / Produto digital**: software com usuários, recorrência, evolução contínua
   - **Consultoria / Entrega pontual**: projeto com escopo fechado, entregue a cliente específico
   - **Pesquisa / Experimentação**: explorar uma ideia, validar hipótese, gerar conhecimento
   - **Ferramenta / Utilitário**: resolve uma dor específica do usuário/time
   - **Curso / Material educacional**: ensinar metodologia, conceito ou tecnologia
   - **Plataforma de dados / Analytics**: ingestão, transformação, visualização de dados
   - **dMRV / Sustentabilidade**: medição/relato/verificação digital (créditos de carbono, biochar, ESG)
   - **Agente / Automação IA**: orquestração de IA para executar processos
   - **Outro**: descreva.

### Bloco 3 — Modelo (se EXTERNO)

3. **Se externo, qual é o modelo de monetização/distribuição?**
   - **B2B**: vende pra empresas
   - **B2C**: vende pro consumidor final
   - **B2G**: vende pro governo
   - **B2B2C**: empresa intermediária leva ao consumidor final
   - **Open source**: gratuito, código aberto, monetização indireta (serviços/suporte)
   - **Educacional**: curso pago, material premium
   - **Consultoria**: entrega projeto + horas/suporte

### Bloco 4 — Estágio

4. **Em que estágio o projeto está?**
   - **Ideia**: ainda validando se faz sentido
   - **Discovery**: confirmando problema/usuário/solução, sem código ainda
   - **MVP**: construindo a versão mínima testável
   - **Produto em evolução**: já tem usuários, está iterando
   - **Refactor / Migração**: produto existente sendo reescrito
   - **Manutenção**: produto maduro, mudanças pontuais

### Bloco 5 — Stakeholders

5. **Quem são os 3-5 stakeholders principais?** Para cada um:
   - Nome (ou papel se não for pessoa específica)
   - Papel no projeto (ex: sponsor, usuário final, cliente, equipe técnica, parceiro)
   - Interesse central (o que ele/ela quer que aconteça)
   - Quando ele/ela é envolvido(a) (no início, em decisões, na entrega, contínuo)

### Bloco 6 — Restrições estruturais

6. **Há restrições já decididas que afetam a arquitetura?** Marque o que se aplica:
   - **Deadline**: quando precisa estar pronto? Data.
   - **Orçamento**: limite (zero, baixo, médio, alto, sem limite)
   - **Stack obrigatória**: alguma tecnologia já definida (ex: "tem que ser .NET", "Neo4j é exigência")
   - **Compliance/Regulatório**: LGPD, SOC2, HIPAA, ISO, etc.
   - **Integrações obrigatórias**: sistemas legados que precisam conversar

---

## Output esperado

```markdown
## Tipo de Projeto

| Campo | Valor |
|-------|-------|
| **Orientação** | {{Interno / Externo / Híbrido}} |
| **Categoria** | {{CATEGORIA}} |
| **Modelo** | {{B2B / B2C / B2G / B2B2C / Open source / Educacional / Consultoria / N/A}} |
| **Estágio** | {{Ideia / Discovery / MVP / Em evolução / Refactor / Manutenção}} |
| **Deadline** | {{DATA ou N/A}} |
| **Orçamento** | {{Zero / Baixo / Médio / Alto / Sem limite}} |
| **Stack obrigatória** | {{LISTA ou Nenhuma}} |
| **Compliance** | {{LISTA ou Nenhum}} |
| **Integrações obrigatórias** | {{LISTA ou Nenhuma}} |

### Stakeholders

| Stakeholder | Papel | Interesse central | Quando envolver |
|-------------|-------|-------------------|-----------------|
| {{NOME}} | {{PAPEL}} | {{INTERESSE}} | {{QUANDO}} |
```

## Exemplos de resposta

### Exemplo A — SaaS B2B em MVP

> Externo. SaaS B2B. Estágio MVP. Deadline 90 dias. Orçamento médio (1 dev + IA). Stack obrigatória: Neo4j (exigência do produto). Compliance: LGPD. Stakeholders: eu (sponsor, decisões), cliente piloto (usuário final, validação semanal), CTO parceiro (revisão técnica, milestones).

### Exemplo B — Projeto interno de produtividade

> Interno. Ferramenta/utilitário. Estágio Discovery. Sem deadline rígido. Orçamento zero (eu+IA). Stack livre. Sem compliance. Stakeholders: eu (sponsor + usuário), time comercial (usuários secundários).

### Exemplo C — Material de curso

> Externo. Curso/educacional. Estágio Ideia, indo pra MVP. Deadline: gravar até 30/06. Orçamento baixo. Stack: Notion + GitHub + Claude Code + Codex. Stakeholders: eu (autor), alunos da comunidade CoCreate (usuários), parceiros que vão indicar (canal de distribuição).

## Como aplicar (instruções pro agente)

1. Apresente os 6 blocos **agrupados**, não pergunta por pergunta.
2. Para o bloco 5 (stakeholders), aceite linguagem natural — extraia nomes/papéis/interesses do texto.
3. Se algum item não fizer sentido pro tipo do projeto (ex: "modelo de monetização" pra projeto interno), pule.
4. Após capturar, gere o bloco de output e adicione/atualiza no `CLAUDE.md` local na seção "Tipo de Projeto".
5. Confirme com o usuário antes de salvar.
