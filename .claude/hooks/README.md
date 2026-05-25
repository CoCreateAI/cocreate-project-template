# Hooks do Claude Code

Hooks são scripts que o Claude Code executa automaticamente em eventos do ciclo de vida (PreToolUse, PostToolUse, Stop, etc.). Configurados em [`.claude/settings.json`](../settings.json).

Esta pasta implementa a **camada Harness** sobre o SDD do template (ver [ADR-002](../../docs/adr/adr-002-harness-engineering-complemento-sdd.md)).

## Princípio Central

**Hooks registram sinais em arquivos. Não disparam skills.**

Skills custam tokens. Hooks devem ser gratuitos e idempotentes. Quando um hook detecta algo relevante, ele escreve em um arquivo de estado. A próxima vez que o usuário rodar a skill apropriada, a skill consome esse arquivo.

## Contrato dos Hooks

Todo script aqui dentro segue o mesmo contrato:

1. **Recebe payload JSON via stdin** (formato Claude Code: `session_id`, `cwd`, `hook_event_name`, `tool_name`, `tool_input`, `tool_response`, etc.)
2. **Saída ignorada** pelo Claude Code (não polua stdout)
3. **Sempre exit 0** — hooks nunca devem quebrar o fluxo do agente, mesmo em caso de erro interno
4. **Sem efeitos colaterais pesados** — não rode testes, não chame APIs, não abra processos longos. Apenas leia/escreva arquivos pequenos.
5. **Idempotente** — chamadas repetidas com mesmo input produzem mesmo resultado

## Hooks Implementados

### `post-spec-edit.ps1` / `.sh`

- **Evento**: `PostToolUse` com matcher `Edit|Write`
- **O que faz**: se o arquivo editado é uma spec (`docs/specs/*.md`), ADR (`docs/adr/*.md`), CLAUDE.md, AGENTS.md, mapa-projeto.md, macro-processo.md ou analise-estrategica.md, adiciona entrada em `.claude/pending-validations.md`
- **Consumido por**: skill `/analisar-coerencia` (etapa 0)

### `stop-session.ps1` / `.sh`

- **Evento**: `Stop` (fim da sessão Claude)
- **O que faz**: se houve specs editadas (entradas em `pending-validations.md`), escreve lembrete em `.claude/session-end-hint.md` sugerindo rodar `/analisar-coerencia`
- **Consumido por**: usuário na próxima sessão (arquivo aparece e pode ser lido manualmente)

## Compatibilidade

- **Windows**: `pwsh` (PowerShell 7+). Se a máquina só tem `powershell.exe` (5.1), substitua `pwsh` por `powershell` em [`settings.json`](../settings.json).
- **Linux/Mac**: scripts `.sh` equivalentes. Para usá-los, troque os comandos em `settings.json` para apontar para `.sh`.
- **Codex (OpenAI)**: não tem sistema de hooks equivalente. As skills mantêm comportamento via instruções diretas. Ver [`AGENTS.md`](../../AGENTS.md).

## Debug

- Hooks rodam silenciosamente. Para depurar, adicione `Write-Host "..."` ou `echo "..."` em arquivo de log dentro do script.
- Erros em hooks não aparecem ao usuário. Se um hook não funciona, valide manualmente rodando o script com input JSON simulado:
  ```powershell
  '{"cwd":"C:/caminho/projeto","tool_input":{"file_path":"docs/specs/spec-001-teste.md"}}' | pwsh -File .claude/hooks/post-spec-edit.ps1
  ```
