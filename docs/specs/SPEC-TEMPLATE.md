# Spec NNN — {{SPEC_TITLE}}

**Criado**: {{DATE}} | **Status**: Draft
**Prioridade**: P0/P1/P2 | **Dependências**: spec-000, {{OTHER_DEPS}}

---

## 1. Contexto e Problema

{{Qual problema esta spec resolve? Por que é necessária agora?}}

---

## 2. Objetivo

{{O que será alcançado quando esta spec for implementada? 1-3 frases.}}

---

## 3. Escopo

### Incluído
- {{SCOPE_ITEM_1}}
- {{SCOPE_ITEM_2}}

### Excluído
- {{OUT_OF_SCOPE_1}}

---

## 4. Entidades e Modelo de Dados

```mermaid
erDiagram
    {{ENTITY_A}} ||--o{ {{ENTITY_B}} : "{{RELATIONSHIP}}"
```

| Entidade | Propriedades | Descrição |
|----------|-------------|-----------|
| **{{ENTITY}}** | {{PROPS}} | {{DESC}} |

---

## 5. Fluxos

```mermaid
flowchart TB
    A[{{STEP_1}}] --> B[{{STEP_2}}]
    B --> C[{{STEP_3}}]
```

### Fluxo Principal
1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}

### Fluxos Alternativos
- {{ALT_FLOW}}

---

## 6. API / Endpoints

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| {{METHOD}} | {{ROUTE}} | {{DESC}} | {{AUTH}} |

---

## 7. Restrições e Regras de Negócio

- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}

---

## 8. Critérios de Aceitação

- [ ] {{CRITERION_1}}
- [ ] {{CRITERION_2}}
- [ ] {{CRITERION_3}}

---

## 9. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| {{RISK}} | {{IMPACT}} | {{MITIGATION}} |
