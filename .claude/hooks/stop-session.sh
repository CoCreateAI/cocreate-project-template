#!/usr/bin/env bash
# stop-session.sh
# Hook Stop. Se houve specs editadas, escreve lembrete em session-end-hint.md.

set +e

input_raw="$(cat)"
[ -z "$input_raw" ] && exit 0

if command -v jq >/dev/null 2>&1; then
  cwd="$(printf '%s' "$input_raw" | jq -r '.cwd // empty')"
else
  cwd="$(printf '%s' "$input_raw" | grep -o '"cwd"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"cwd"[[:space:]]*:[[:space:]]*"\(.*\)"/\1/')"
fi

[ -z "$cwd" ] && exit 0

pending_file="${cwd}/.claude/pending-validations.md"
[ ! -f "$pending_file" ] && exit 0

entries="$(grep -c '^- \[' "$pending_file" 2>/dev/null || echo 0)"
[ "$entries" -eq 0 ] && exit 0

hint_file="${cwd}/.claude/session-end-hint.md"
ts="$(date '+%Y-%m-%d %H:%M')"

cat > "$hint_file" <<EOF
# Lembrete de Fim de Sessão

Gerado em: ${ts}

Você editou ${entries} arquivo(s) de spec/ADR/contexto nesta sessão.
Considere rodar \`/analisar-coerencia\` antes de fechar a missão para validar consistência.

Pendências em \`.claude/pending-validations.md\`.
EOF

exit 0
