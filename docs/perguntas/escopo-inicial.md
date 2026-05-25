# Banco de Perguntas — Escopo Inicial

> Este arquivo é parte do template **cocreate-project-template** (metodologia SDD da CoCreate AI).
> É consumido pelas skills `/iniciar-projeto` (Claude Code) e `iniciar-projeto` (Codex).
> Também serve como artefato pedagógico independente.

## Propósito

Capturar o escopo do projeto **como faria um especialista de negócio + projeto experiente**, antes de qualquer linha de código. O objetivo é gerar um briefing estruturado que vai alimentar a constitution (`spec-000`) e dar à IA contexto suficiente pra propor arquitetura calibrada.

## Quando aplicar

- Após perfil do usuário ([perfil-usuario.md](perfil-usuario.md)) e tipo de projeto ([tipo-projeto.md](tipo-projeto.md))
- Antes do macro processo do negócio ([macro-processo.md](macro-processo.md))

## Onde salvar a resposta

Arquivo `docs/raw/00-perfil-projeto.md` — vai ser consumido pelo `/processar-contexto` em seguida.

---

## Perguntas

### Bloco 1 — Problema

1. **Que problema este projeto resolve?** Em 1-3 frases, descreva a dor central. Evite descrever a solução; foque na dor.
2. **Quem sente essa dor hoje?** Persona, departamento, mercado, organização.
3. **Como essa dor é resolvida hoje (se já é)?** Solução manual, ferramenta concorrente, processo ad-hoc, ou não é resolvida.
4. **Qual é o custo de não resolver?** Financeiro, operacional, estratégico, humano.

### Bloco 2 — Usuário final

5. **Quem é o usuário final principal?** Nome de persona, perfil, contexto de uso.
6. **Em que momento/situação ele usa?** Frequência, gatilho, ambiente (mobile/desktop, sozinho/em grupo, online/offline).
7. **Que dispositivos ele usa?** Web, mobile iOS/Android, desktop, CLI, integração via API.
8. **Que nível de sofisticação técnica ele tem?** Power user, usuário casual, leigo total.

### Bloco 3 — Solução (sem prescrever ainda)

9. **Como o projeto VAI resolver o problema?** Em 2-4 frases, descreva a abordagem (não a implementação técnica). Ex: "vai centralizar X num único lugar", "vai automatizar Y".
10. **Quais 3-5 capacidades principais o produto/projeto precisa ter?** Pense em verbos: "permite cadastrar", "envia alerta", "gera relatório", "integra com X". Não é lista exaustiva.

### Bloco 4 — Sucesso e fronteiras

11. **Como você vai saber que o projeto teve sucesso?** Métrica clara, evento, comportamento observável. Ex: "10 clientes pagantes em 6 meses", "tempo de processo cai de 5h pra 1h", "feedback NPS > 8 em piloto".
12. **O que está claramente FORA DO ESCOPO?** Liste 3-5 coisas que você NÃO quer que entrem no projeto neste momento. Isso evita scope creep.

### Bloco 5 — Riscos conhecidos

13. **Qual o risco maior do projeto hoje?** Técnico, comercial, regulatório, humano.
14. **Há alguma decisão estratégica já tomada que NÃO pode mudar?** Ex: "vai rodar em GCP", "tem que usar o banco que já temos".

### Bloco 6 — Recursos disponíveis

15. **Quem está disponível pra trabalhar nisso?** Você sozinho? Você + IA? Tem equipe?
16. **Há ativos preexistentes que vão ser reaproveitados?** Código, dados, integrações, dashboards.

---

## Output esperado

A skill deve gerar `docs/raw/00-perfil-projeto.md` no formato:

```markdown
# Briefing Inicial — {{PROJECT_NAME}}

> Gerado pela skill /iniciar-projeto em {{DATA}}.
> Este arquivo serve de input pra /processar-contexto, que vai gerar a spec-000 (constitution).

## 1. Problema
- **Dor central**: {{...}}
- **Quem sente**: {{...}}
- **Solução atual**: {{...}}
- **Custo de não resolver**: {{...}}

## 2. Usuário final
- **Persona principal**: {{...}}
- **Momento de uso**: {{...}}
- **Dispositivos**: {{...}}
- **Sofisticação técnica**: {{...}}

## 3. Solução proposta (alto nível)
{{2-4 frases}}

### Capacidades principais
1. {{...}}
2. {{...}}
3. {{...}}

## 4. Sucesso
- **Métrica/evento**: {{...}}

## 5. Fora do escopo
- {{...}}
- {{...}}
- {{...}}

## 6. Riscos
- **Maior risco**: {{...}}
- **Decisões imutáveis**: {{...}}

## 7. Recursos
- **Equipe**: {{...}}
- **Ativos preexistentes**: {{...}}

## 8. Próximos passos sugeridos
1. Revisar este briefing
2. Construir macro processo do negócio (gerado em paralelo em docs/macro-processo.md)
3. Rodar /processar-contexto pra gerar spec-000-constitution.md
```

## Exemplos de resposta

### Exemplo A — Ferramenta interna

> **Problema**: Time comercial perde 3h/dia compilando dados de propostas que estão espalhados em Notion, e-mail e planilhas. Custa fechamento. **Usuário**: 5 comerciais sênior, usam no desktop antes de reunião com cliente. **Solução**: agregador que puxa dados dos 3 sistemas e gera um briefing único em 2 cliques. **Sucesso**: tempo cai pra 15min em 2 meses. **Fora**: app mobile, integração com CRM (fase 2), automação de envio.

### Exemplo B — Curso de SDD

> **Problema**: Empresas que querem aplicar IA não sabem por onde começar; viram um ChatGPT premium em vez de transformar processos. **Usuário**: gerentes de inovação e CTOs de média empresa. **Solução**: curso de 8 módulos ensinando a metodologia SDD aplicada com Claude Code + Codex. **Sucesso**: 30 alunos no piloto, NPS > 8, 3 estudos de caso gerados pelos alunos. **Fora**: comunidade paga, certificação, consultoria pós-curso.

## Como aplicar (instruções pro agente)

1. Apresente os 6 blocos **agrupados** ao usuário, **NÃO um por um**. Idealmente bloco a bloco se a sessão for via voz, ou tudo de uma vez se via texto.
2. Aceite respostas em linguagem natural. Extraia os campos do texto.
3. Para o bloco 3 (solução), seja firme: **não deixe o usuário pular pra implementação técnica**. Se ele disser "vai ser um SaaS em React/Python", redirecione: "antes da stack, me conta como o produto resolve o problema?".
4. Para o bloco 4 (sucesso), insista em algo MENSURÁVEL ou OBSERVÁVEL. "Cliente feliz" não é sucesso; "feedback NPS > 8 em 2 meses" é.
5. Para o bloco 4 (fora do escopo), force pelo menos 3 itens. Escopo sem fronteiras é receita pra falha.
6. Após capturar, gere o arquivo `docs/raw/00-perfil-projeto.md` e confirme com o usuário antes de salvar.
