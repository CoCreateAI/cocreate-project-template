# Macro Processo do Negócio — {{PROJECT_NAME}}

> Gerado pela skill `/iniciar-projeto` em {{DATE}}.
> Este arquivo é **evolutivo** — atualize sempre que o entendimento do processo mudar.
> O macro processo descreve o **fluxo do negócio**, não a arquitetura técnica.

---

## Visão Sistêmica

```mermaid
flowchart TD
    A[1. {{ETAPA_A}}] --> B[2. {{ETAPA_B}}]
    B --> C[3. {{ETAPA_C}}]
    C -->|condição X| D[4. {{ETAPA_D}}]
    C -->|condição Y| E[4b. {{ETAPA_ALT}}]
    D --> F[5. {{ETAPA_F}}]
    E --> F
```

> Substitua o esqueleto acima pelo diagrama real do processo. Use `flowchart TD` (top-down) para fluxos lineares, `flowchart LR` para muitos parallelos, ou `journey`/`sequenceDiagram` quando apropriado.

---

## Etapas

### 1. {{ETAPA_A}}

- **Atores**: {{quem participa — pessoas, papéis, sistemas, agentes IA}}
- **Inputs**: {{o que entra na etapa}}
- **Outputs**: {{o que sai pronto pra próxima etapa}}
- **Sistemas envolvidos**: {{ferramentas, software, integrações}}
- **IA agrega valor em**: {{automação, sugestão, validação, geração}}
- **Métrica de sucesso**: {{como medir que essa etapa rodou bem}}

### 2. {{ETAPA_B}}

- **Atores**: {{...}}
- **Inputs**: {{...}}
- **Outputs**: {{...}}
- **Sistemas envolvidos**: {{...}}
- **IA agrega valor em**: {{...}}
- **Métrica de sucesso**: {{...}}

### 3. {{ETAPA_C}}

- **Atores**: {{...}}
- **Inputs**: {{...}}
- **Outputs**: {{...}}
- **Sistemas envolvidos**: {{...}}
- **IA agrega valor em**: {{...}}
- **Métrica de sucesso**: {{...}}

> Adicione mais blocos conforme o processo. Mantenha entre 3 e 7 etapas no nível macro — se passar disso, considere agrupar em subprocessos ou fazer subdiagramas com `subgraph`.

---

## Pontos de IA / Automação

> Mapa consolidado de onde IA entra no processo. Útil pra priorizar features.

| Etapa | Função da IA | Status |
|-------|--------------|--------|
| {{ETAPA}} | {{O QUE A IA FAZ}} | {{Planejado / Em uso / Roadmap}} |

---

## Gargalo Atual

> Etapa que prende, é cara, ou consome desproporcionalmente recursos. Documente pra orientar prioridades.

**Etapa:** {{...}}
**Por que é gargalo:** {{...}}
**Mitigação prevista:** {{...}}

---

## Conexões com Specs

> Quais specs implementam quais etapas? Atualize à medida que specs forem criadas.

| Etapa | Spec(s) relacionada(s) |
|-------|------------------------|
| {{ETAPA}} | spec-NNN-titulo.md |

---

## Evolução do Documento

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| {{DATE}} | v0.1 | Primeira versão gerada por `/iniciar-projeto` | {{USER}} |
