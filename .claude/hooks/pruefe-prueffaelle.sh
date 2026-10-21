#!/bin/bash
# Sperrt Prüffälle und Gesetzeskonstanten für Claude. Nur Samuel ändert sie.
FILE=$(jq -r '.tool_input.file_path // empty')
case "$FILE" in
  *.cases.ts|*konstanten-2027.ts)
    echo "Gesperrt: $FILE ändert nur Samuel. Schlag die Änderung im Chat vor." >&2
    exit 2 ;;
esac
exit 0
