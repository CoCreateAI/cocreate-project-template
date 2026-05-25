# post-spec-edit.ps1
# Hook PostToolUse para Edit|Write. Registra em .claude/pending-validations.md
# quando uma spec, ADR ou CLAUDE.md é editado.
#
# Contrato:
#   - Recebe payload JSON via stdin
#   - Extrai tool_input.file_path
#   - Se o arquivo é uma spec/ADR/CLAUDE.md, adiciona entrada em pending-validations.md
#   - Idempotente: não duplica entradas pelo mesmo caminho
#   - Sempre sai com exit 0 (hooks não devem quebrar o fluxo)

$ErrorActionPreference = "SilentlyContinue"

try {
    $input_raw = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($input_raw)) { exit 0 }

    $payload = $input_raw | ConvertFrom-Json
    $file_path = $payload.tool_input.file_path
    if ([string]::IsNullOrWhiteSpace($file_path)) { exit 0 }

    # Normalizar para path relativo ao cwd quando possível
    $cwd = $payload.cwd
    if ($cwd -and $file_path.StartsWith($cwd)) {
        $rel = $file_path.Substring($cwd.Length).TrimStart('\', '/')
    } else {
        $rel = $file_path
    }
    $rel_normalized = $rel -replace '\\', '/'

    # Filtro: spec, ADR, CLAUDE.md, AGENTS.md, mapa-projeto.md, macro-processo.md, analise-estrategica.md
    $is_target = $false
    if ($rel_normalized -match '^docs/specs/.+\.md$') { $is_target = $true }
    elseif ($rel_normalized -match '^docs/adr/.+\.md$') { $is_target = $true }
    elseif ($rel_normalized -match '^(CLAUDE|AGENTS)\.md$') { $is_target = $true }
    elseif ($rel_normalized -match '^docs/(mapa-projeto|macro-processo|analise-estrategica)\.md$') { $is_target = $true }

    if (-not $is_target) { exit 0 }

    $pending_file = Join-Path $cwd ".claude/pending-validations.md"
    if (-not (Test-Path $pending_file)) {
        $header = @"
# Validações Pendentes

Arquivos editados nesta sessão que devem ser validados pela skill ``/analisar-coerencia``.
Gerenciado automaticamente pelo hook ``post-spec-edit.ps1``. Entradas são limpas pela skill após processamento.

"@
        Set-Content -Path $pending_file -Value $header -Encoding utf8
    }

    # Idempotência: não duplica entrada com mesmo caminho
    $existing = Get-Content -Path $pending_file -Raw -Encoding utf8
    if ($existing -match [regex]::Escape($rel_normalized)) { exit 0 }

    $ts = Get-Date -Format "yyyy-MM-dd HH:mm"
    $entry = "- [$ts] $rel_normalized"
    Add-Content -Path $pending_file -Value $entry -Encoding utf8
} catch {
    # Hooks nunca devem quebrar o fluxo
}

exit 0
