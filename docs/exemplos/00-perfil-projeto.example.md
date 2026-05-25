# Briefing Inicial — cocreate-project-template (EXEMPLO)

> **Este é um exemplo de output da skill `/iniciar-projeto`.**
> Mostra como o briefing fica após o usuário responder as perguntas das fases 1-3 (perfil, tipo de projeto, escopo).
> Use como referência ao revisar o briefing real gerado para seu projeto em `docs/raw/00-perfil-projeto.md`.
>
> O exemplo usa o próprio `cocreate-project-template` como projeto, porque ele é real e autoexplicativo. Você pode comparar este briefing com o estado atual do template e ver como a metodologia foi aplicada.

---

## 1. Problema

- **Dor central**: Empresas que querem aplicar IA em projetos sérios não têm uma metodologia clara que separe "estratégia" de "implementação técnica". Profissionais não-dev (CEOs, gerentes, estrategistas) sabem o que querem mas não conseguem orquestrar IA como executor técnico de forma estruturada. Devs sêniores fazem cada projeto do zero, sem reusar padrões. Resultado: projetos travam, viram "ChatGPT premium", e a IA não transforma processo.
- **Quem sente**: Gerentes de inovação, CTOs de média empresa, fundadores não-dev, consultores de IA, professores que querem ensinar IA aplicada.
- **Solução atual**: Cada um inventa seu próprio fluxo. Alguns usam Cursor ou Copilot ad-hoc. Outros copiam estrutura de outros projetos. Não há metodologia compartilhada.
- **Custo de não resolver**: Projetos de IA corporativa demoram 3-6 meses para sair do papel. Conhecimento gerado em um projeto não escala para os próximos. CoCreateAI perde oportunidade de liderar o movimento de SDD.

## 2. Usuário final

- **Persona principal**: "Estrategista que usa IA como executor" — fundador/CEO/PM de empresa que aplica IA em transformação digital. Não escreve código, mas entende arquitetura.
- **Persona secundária**: Aluno de curso CoCreate de SDD — pode ser dev iniciante, dev sênior aprendendo metodologia, ou outro estrategista replicando o método.
- **Momento de uso**: Início de qualquer projeto novo de software ou automação inteligente. Uso recorrente durante o ciclo de vida (planejamento, refactor, evolução).
- **Dispositivos**: Desktop (VS Code + Claude Code ou Codex CLI). PowerShell ou bash. Git/GitHub.
- **Sofisticação técnica**: Vai de não-dev a arquiteto. O template precisa servir aos dois extremos.

## 3. Solução proposta (alto nível)

Template de projeto com metodologia SDD (Spec-Driven Development) embutida. Conduz o usuário do zero (sem briefing nem código) até um projeto estruturado com constitution, specs, ADRs e macro processo do negócio — tudo via perguntas guiadas e skills automatizadas. Funciona tanto com Claude Code quanto com Codex CLI, sem amarrar a metodologia a uma plataforma.

### Capacidades principais

1. **Onboarding guiado** — skill `/iniciar-projeto` faz perguntas estruturadas (perfil, tipo, escopo, macro processo) e gera briefing + macro processo do negócio em Mermaid
2. **Geração de specs a partir de raw** — skill `/processar-contexto` lê briefing e produz spec-000 (constitution) + spec-001 (primeira feature)
3. **Bancos de perguntas reusáveis** — `docs/perguntas/` serve tanto skills quanto alunos lendo isoladamente
4. **Compatibilidade dupla** — Claude Code e Codex compartilham a mesma metodologia em `docs/`
5. **Evolução metodológica** — adicionar nova skill ou novo banco de perguntas é editar arquivos `.md`, sem reimplementar lógica

## 4. Sucesso

- **Métrica/evento**:
  - **3 meses**: 30 alunos do curso piloto SDD da CoCreate concluem onboarding com este template, geram suas próprias specs, e publicam pelo menos 1 case interno
  - **6 meses**: template tem >50 forks no GitHub, >10 issues abertas pela comunidade, e 2 outras empresas o adotam como padrão interno
  - **NPS do curso piloto** > 8 com este template como ferramenta principal

## 5. Fora do escopo

- Curso de SDD em si (este template é APENAS a ferramenta; o curso é produto separado)
- Comunidade paga ou certificação
- Suporte 24/7 ou SLA empresarial
- Auto-deploy de projetos gerados (cada projeto faz seu deploy)
- Integração com sistemas de gestão (Jira, Linear, Asana) — fica como roadmap
- Tradução para outros idiomas (PT-BR no v1)

## 6. Riscos

- **Maior risco**: Dependência de evolução das plataformas (Claude Code e Codex). Se uma das duas mudar drasticamente API/formato de skills, manutenção dobra. **Mitigação**: camada compartilhada em `docs/` minimiza acoplamento; ADR-001 documenta a arquitetura defensiva.
- **Decisões imutáveis**:
  - Metodologia SDD permanece o coração (specs são verdade, código gerado)
  - PT-BR como idioma principal
  - Acentuação correta sempre (regra crítica)
  - Mermaid obrigatório em artefatos arquiteturais

## 7. Recursos

- **Equipe**: Rodrigo (sponsor, arquiteto da metodologia, autor do curso) + IA executora (Claude Opus, Codex). Sem dev humano dedicado no v1.
- **Ativos preexistentes**:
  - Metodologia SDD já desenvolvida e validada em projetos CoCreate (EKS, CarbonForge)
  - Comunidade WhatsApp da CoCreate (~100 profissionais) como primeiro público
  - Presença no LinkedIn para distribuição
  - Templates de spec e ADR já criados em projetos anteriores

## 8. Próximos passos sugeridos

1. Revisar este briefing
2. Construir macro processo do negócio (paralelo: `docs/macro-processo.md`)
3. Rodar `/processar-contexto` para gerar `spec-000-constitution.md`
4. Validar com 1-2 usuários piloto (não-dev + dev) antes de abrir para curso

---

> **Como este exemplo foi gerado**: imaginando a sessão real de `/iniciar-projeto` aplicada ao próprio template. Cada bloco corresponde a um conjunto de perguntas do banco em [`../perguntas/escopo-inicial.md`](../perguntas/escopo-inicial.md). Note como a "Solução" descreve abordagem (não tecnologia), e como "Sucesso" tem métricas mensuráveis e datas concretas.
