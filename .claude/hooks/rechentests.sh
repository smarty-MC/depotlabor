#!/bin/bash
# Startet die Rechentests nach jeder Änderung in src/calc. Rot heißt: erst reparieren.
FILE=$(jq -r '.tool_input.file_path // empty')
case "$FILE" in
  */src/calc/*)
    cd "$CLAUDE_PROJECT_DIR" || exit 0
    if ! npx vitest run src/calc --reporter=dot >&2; then
      echo "Rechentests rot – erst reparieren, dann weiter." >&2
      exit 2
    fi ;;
esac
exit 0
