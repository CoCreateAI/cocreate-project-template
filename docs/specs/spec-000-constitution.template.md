# Spec 000 — Constitution: {{PROJECT_NAME}}

**Criado**: {{DATE}} | **Status**: Draft
**Prioridade**: P0 | **Dependências**: Nenhuma (documento raiz)

> Este documento é gerado automaticamente pelo `/processar-contexto` a partir do material em `docs/raw/`. Revise e ajuste conforme necessário.
>
> **Documentos complementares obrigatórios**:
> - [`docs/macro-processo.md`](../macro-processo.md) — fluxo macro do negócio em Mermaid (Fase 4 de `/iniciar-projeto`). A constitution descreve PRINCÍPIOS e ENTIDADES; o macro processo descreve o FLUXO.
> - [`docs/analise-estrategica.md`](../analise-estrategica.md) — riscos + compliance + dependências (Fase 5 de `/iniciar-projeto`). As **restrições globais** desta constitution incorporam os controles obrigatórios identificados lá.

---

## 1. Visão e Missão

### Visão
{{PROJECT_VISION — 1-2 frases sobre onde o projeto quer chegar}}

### Missão
{{PROJECT_MISSION — o que o projeto faz concretamente}}

---

## 2. Princípios Fundamentais

### P1 — {{PRINCIPLE_NAME}}
{{Descrição do princípio e por que ele importa para este projeto}}

### P2 — {{PRINCIPLE_NAME}}
{{Descrição}}

### P3 — {{PRINCIPLE_NAME}}
{{Descrição}}

> Adicione quantos princípios forem necessários. Cada um deve guiar decisões de design e implementação.

---

## 3. Glossário Canônico

| Termo | Definição | Uso Correto | Uso Incorreto |
|-------|-----------|-------------|---------------|
| **{{TERM}}** | {{DEFINITION}} | {{CORRECT_USAGE}} | {{INCORRECT_USAGE}} |

> Termos devem ser usados consistentemente em todas as specs, no código e na comunicação.

---

## 4. Entidades Canônicas

```mermaid
erDiagram
    {{ENTITY_A}} ||--o{ {{ENTITY_B}} : "{{RELATIONSHIP}}"
```

### Tabela de Entidades

| Entidade | Descrição | Propriedades-chave |
|----------|-----------|-------------------|
| **{{ENTITY}}** | {{DESCRIPTION}} | {{PROPERTIES}} |

---

## 5. Personas

| Persona | Nome | Perfil | Dor Central |
|---------|------|--------|-------------|
| **{{ROLE}}** | {{NAME}} | {{PROFILE}} | {{PAIN_POINT}} |

> Toda spec que defina conteúdo visível ao usuário deve indicar a persona primária.

---

## 6. Restrições Globais

### Tecnologia
- {{TECH_CONSTRAINT_1 — ex: "Neo4j é o único banco"}}
- {{TECH_CONSTRAINT_2 — ex: "Credenciais nunca em hardcode"}}

### Processo
- **Spec-Driven Development (SDD)** — specs são verdade, código é gerado a partir delas
- **Mermaid obrigatório** em toda spec e artefato arquitetural
- **Regra de Ouro** — ao final de toda fase, análise crítica + lista do que falta
- **Regra de Diamante** — registrar lições em toda falha ou ajuste inesperado
- **Testes em tests/** — nunca misturar com código fonte

### Negócio
- {{BUSINESS_CONSTRAINT_1}}
- {{BUSINESS_CONSTRAINT_2}}

---

## 7. Tom de Voz

| Atributo | Descrição | Exemplo |
|----------|-----------|---------|
| **{{ATTRIBUTE}}** | {{DESCRIPTION}} | {{EXAMPLE}} |

---

## 8. Macro Processo do Negócio (referência)

Ver [`docs/macro-processo.md`](../macro-processo.md) — diagrama Mermaid + descrição das etapas, atores, inputs/outputs e pontos onde IA agrega valor.

> Esta seção **referencia** o arquivo dedicado para evitar duplicação. O macro processo é evolutivo — atualize lá, não aqui.

---

## 9. Análise Estratégica (referência)

Ver [`docs/analise-estrategica.md`](../analise-estrategica.md) — mapa de riscos (técnico, comercial, regulatório, humano, operacional), análise de compliance (LGPD/GDPR/HIPAA/etc.), dependências críticas, gargalos previstos e top 5 mitigações.

> Os **controles e restrições** identificados na análise estratégica complementam a seção 6 desta constitution. Restrições críticas devem ser duplicadas em "6. Restrições Globais > Compliance" para visibilidade. Demais detalhes ficam no arquivo dedicado.

---

## 10. Referência Cruzada de Specs

| Spec | Título | Status | Prioridade |
|------|--------|--------|-----------|
| 000 | Constitution (este documento) | Draft | P0 |
| 001 | {{FIRST_SPEC_TITLE}} | Pendente | P0 |
