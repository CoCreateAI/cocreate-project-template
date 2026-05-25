#!/usr/bin/env bash
# post-spec-edit.sh
# Hook PostToolUse para Edit|Write. Registra em .claude/pending-validations.md
# quando uma spec, ADR ou CLAUDE.md é editado.
#
# Contrato:
#   - Recebe payload JSON via stdin
#   - Extrai tool_input.file_path (usa jq se disponível, senão grep)
#   - Idempotente; sempre exit 0

set +e

input_raw="$(cat)"
[ -z "$input_raw" ] && exit 0

if command -v jq >/dev/null 2>&1; then
  file_path="$(printf '%s' "$input_raw" | jq -r '.tool_input.file_path // empty')"
  cwd="$(printf '%s' "$input_raw" | jq -r '.cwd // empty')"
else
  # Fallback grep — frágil mas funcional para casos comuns
  file_path="$(printf '%s' "$input_raw" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"file_path"[[:space:]]*:[[:space:]]*"\(.*\)"/\1/')"
  cwd="$(printf '%s' "$input_raw" | grep -o '"cwd"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"cwd"[[:space:]]*:[[:space:]]*"\(.*\)"/\1/')"
fi

[ -z "$file_path" ] && exit 0

# Normalizar para path relativo
if [ -n "$cwd" ] && [[ "$file_path" == "$cwd"* ]]; then
  rel="${file_path#$cwd}"
  rel="${rel#/}"
  rel="${rel#\\}"
else
  rel="$file_path"
fi
rel_normalized="${rel//\\//}"

# Filtro
is_target=0
case "$rel_normalized" in
  docs/specs/*.md) is_target=1 ;;
  docs/adr/*.md) is_target=1 ;;
  CLAUDE.md|AGENTS.md) is_target=1 ;;
  docs/mapa-projeto.md|docs/macro-processo.md|docs/analise-estrategica.md) is_target=1 ;;
esac

[ "$is_target" -eq 0 ] && exit 0

pending_file="${cwd}/.claude/pending-validations.md"

if [ ! -f "$pending_file" ]; then
  cat > "$pending_file" <<'EOF'
# Validações Pendentes

Arquivos editados nesta sessão que devem ser validados pela skill `/analisar-coerencia`.
Gerenciado automaticamente pelo hook `post-spec-edit.sh`. Entradas são limpas pela skill após processamento.

EOF
fi

# Idempotência
if grep -qF "$rel_normalized" "$pending_file"; then
  exit 0
fi

ts="$(date '+%Y-%m-%d %H:%M')"
printf -- "- [%s] %s\n" "$ts" "$rel_normalized" >> "$pending_file"

exit 0
