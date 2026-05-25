# docs/raw/ — Material Bruto

Coloque aqui o material de contexto do seu projeto:

- **Transcrições** de reuniões (áudio transcrito)
- **Briefings** ou documentos de visão
- **Chats** ou discussões relevantes
- **Notas** de brainstorming
- **Qualquer texto** que descreva o domínio, problema, requisitos ou ideias

## Como usar

1. Salve seu arquivo aqui (`.txt`, `.md`, ou qualquer formato texto)
2. Rode o comando `/processar-contexto`
3. A IA vai analisar o conteúdo e gerar:
   - **spec-000-constitution.md** — documento raiz (visão, princípios, glossário, entidades)
   - **spec-001** — primeira spec de feature ou arquitetura
   - **adr-001** — primeira decisão arquitetural
   - Atualização do **CLAUDE.md** com dados extraídos

## Dica

Quanto mais detalhado o material, melhor o resultado. Inclua:
- O que o projeto faz e para quem
- Problemas que resolve
- Entidades do domínio (usuários, produtos, processos, etc.)
- Restrições técnicas ou de negócio
- Decisões já tomadas
- Stack preferida (se houver)
