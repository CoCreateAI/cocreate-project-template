# stop-session.ps1
# Hook Stop. Se houve specs editadas nesta sessão (pending-validations.md tem entradas),
# escreve lembrete em .claude/session-end-hint.md para a próxima sessão.

$ErrorActionPreference = "SilentlyContinue"

try {
    $input_raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($input_raw)) { exit 0 }

    $payload = $input_raw | ConvertFrom-Json
    $cwd = $payload.cwd
    if ([string]::IsNullOrWhiteSpace($cwd)) { exit 0 }

    $pending_file = Join-Path $cwd ".claude/pending-validations.md"
    if (-not (Test-Path $pending_file)) { exit 0 }

    $content = Get-Content -Path $pending_file -Raw -Encoding utf8
    $entries = ($content -split "`n" | Where-Object { $_ -match '^- \[' }).Count
    if ($entries -eq 0) { exit 0 }

    $hint_file = Join-Path $cwd ".claude/session-end-hint.md"
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm"
    $hint = @"
# Lembrete de Fim de Sessão

Gerado em: $ts

Você editou $entries arquivo(s) de spec/ADR/contexto nesta sessão.
Considere rodar ``/analisar-coerencia`` antes de fechar a missão para validar consistência.

Pendências em ``.claude/pending-validations.md``.
"@
    Set-Content -Path $hint_file -Value $hint -Encoding utf8
} catch {
    # Hooks nunca devem quebrar o fluxo
}

exit 0
