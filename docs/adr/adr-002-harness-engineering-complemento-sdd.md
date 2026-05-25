# ADR 002 — Harness Engineering como camada complementar ao SDD

**Data**: 2026-05-21 | **Status**: Aceita

---

## Contexto

O template `cocreate-project-template` adota Spec-Driven Development (SDD) como metodologia: specs são a fonte da verdade, código é gerado a partir delas. Em 2026, o conceito de **Harness Engineering** começou a ganhar tração na comunidade (post "Spec Driven chegou no limite — Harness Engineering é o próximo passo"), argumentando que apenas especificar não é suficiente.

A tese central do Harness: além do prompt e da spec, é preciso preparar **todo o ambiente onde o modelo opera** — contexto, ferramentas, memória, validações, regras, observabilidade, feedback, testes, permissões e limites de ação. Sintomas que motivam essa evolução:

- Specs enormes ficam frágeis e difíceis de manter
- Modelo interpreta a spec corretamente mas falha no contexto real
- Pequenas ambiguidades geram comportamentos inesperados
- Falta validação automática e loops de correção
- Agente sabe o que fazer mas não tem estrutura para executar bem
- Mudanças no sistema quebram comportamentos silenciosamente

Inventário feito em 2026-05-21 mostrou que o template tem cobertura **forte na camada estática** do Harness (CLAUDE.md global e local, AGENTS.md, specs, ADRs, memória persistente, glossário canônico, skills, subagents, MCPs, Regra de Ouro e Regra de Diamante) e **fraca na camada dinâmica**: zero hooks configurados, zero observabilidade estruturada de execução, zero loop de correção automática quando testes falham.

## Decisão

Adotar **Harness Engineering como camada complementar ao SDD**, não como substituição. SDD continua sendo a metodologia core. A camada Harness adiciona 3 componentes aditivos:

1. **Hooks de sinal** (`.claude/hooks/` + `.claude/settings.json`) que registram eventos do agente em arquivos de estado (`.claude/pending-validations.md`, `.claude/session-end-hint.md`). Hooks **não disparam skills automaticamente** — apenas registram sinais que skills consomem quando o usuário roda.
2. **Traces estruturados** (`.claude/traces/YYYY-MM-DD.md`) onde cada skill não-readonly registra início, eventos relevantes (incluindo tentativas de correção) e fim. `/status-agentes` evolui para ler esse histórico.
3. **Loop de correção em `/executar-tarefa`**: até 3 tentativas de corrigir testes que falham, com cada tentativa registrada no trace. Nunca silenciar testes para "passar".

Componentes **fora do escopo** desta rodada (registrados para ADR futuro):
- Detector automático de spec ficando frágil (tamanho, contradições, termos fora do glossário)
- Testes de regressão de comportamento das skills (`tests/skills/`)
- Permissões granulares por skill em `settings.local.json`
- Migração de traces de markdown para JSONL com dashboard
- Hooks adicionais (PreToolUse com validação de schema, etc.)

## Justificativa

**Por que aditivo e não substitutivo**: SDD funciona. O gap é dinâmico, não estático. Substituir SDD por Harness seria descaracterizar uma metodologia que já tem cobertura forte em 70-80% do que Harness propõe.

**Por que hooks registram em arquivo e não disparam skills**: skills custam tokens. Hooks que disparam skills automaticamente queimam orçamento do usuário sem ele pedir. Hooks que **registram em arquivo são gratuitos** e idempotentes — o usuário decide quando rodar a skill apropriada, e a skill agora sabe **o que** priorizar.

**Por que markdown e não JSONL para traces**: JSONL é melhor para parsing programático mas exige tooling. Markdown é nativo para o agente escrever e para o humano ler. Para o estágio atual do template (uso por humanos + IA, sem dashboards), markdown ganha. Migração futura é trivial.

**Por que 3 tentativas no loop de correção**: 1 é pouco (sem espaço para iteração), 5+ vira looping cego sem reflexão. 3 é o ponto onde o agente é forçado a parar e pedir ajuda com contexto, em vez de mascarar o problema.

## Consequências

### Positivas
- Fecha o gap dinâmico do SDD sem quebrar compatibilidade
- Skills existentes continuam funcionando exatamente como antes, ganhando apenas instruções extras
- Observabilidade real do que cada skill fez (não só `/status-agentes` sob demanda lendo arquivos pontuais)
- Loop de correção evita o anti-padrão de "agente desiste no primeiro erro" e o pior anti-padrão de "agente silencia teste para passar"
- Hooks dão visibilidade do que o agente está mexendo sem o usuário precisar acompanhar tudo
- Material pedagógico forte: o template vira referência de como combinar SDD + Harness na prática (útil para o curso do Rodrigo)

### Negativas
- **Hooks dependem de PowerShell ou Bash instalado** na máquina do usuário. PowerShell 7+ (`pwsh`) ou fallback para `powershell` 5.1 no Windows. Bash padrão no Linux/Mac.
- **Codex (OpenAI) não tem sistema de hooks equivalente**. Loop de correção (P0-C) e traces (P0-B) funcionam igual via instrução na skill, mas hooks (P0-A) só funcionam na casca Claude. Registrado em `AGENTS.md` como gap conhecido — usuário Codex precisa rodar `/analisar-coerencia` manualmente após editar specs.
- **Traces locais podem ficar grandes** se o usuário não limpa. Arquivos diários ajudam, mas projetos longos acumulam. `.gitignore` evita versionar, mas disco local cresce.
- **Adiciona uma curva de aprendizado pequena**: usuário precisa entender que `.claude/pending-validations.md` é gerenciado por hook, não por humano.

## Alternativas Consideradas

1. **Disparar skills automaticamente via hook**: rejeitada por custo de tokens silencioso. Usuário não autoriza explicitamente cada chamada de `/analisar-coerencia` após cada edição. Anti-padrão de UX e de economia.

2. **JSONL para traces com tooling Python para parsing**: rejeitada por excesso de complexidade no estágio atual. Sem dashboard que consuma, o JSONL fica ilegível. Markdown resolve o problema imediato; migração futura é trivial se necessário.

3. **Implementar P1 (guardrails de spec + testes de regressão das skills) na mesma rodada**: rejeitada para evitar plano inflado. P1 é valioso mas não bloqueante. ADR futuro quando o uso real mostrar dor concreta.

4. **Substituir SDD por Harness "puro"**: rejeitada por destruir base já validada. Harness é uma camada de execução, não de especificação. As duas se complementam.

5. **Implementar observabilidade via comando externo (telemetria, log agregador)**: rejeitada por overengineering. O template é local-first, single-user (Rodrigo + equipes pequenas da CoCreateAI). Markdown em pasta local atende.
