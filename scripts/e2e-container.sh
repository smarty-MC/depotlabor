#!/bin/sh
# Browser-Tests im offiziellen Playwright-Container – dieselbe Umgebung wie in der CI, damit die
# Screenshots lokal und dort pixelgleich sind. Alle Argumente gehen an „playwright test“, z. B.:
#   npm run test:e2e:container -- --update-snapshots
set -eu
cd "$(dirname "$0")/.."

version=$(node -p "require('@playwright/test/package.json').version")
bild="mcr.microsoft.com/playwright:v${version}-noble"

if command -v podman >/dev/null 2>&1; then
  podman="podman"
elif command -v distrobox-host-exec >/dev/null 2>&1; then
  # In der Distrobox: Podman des Hosts
  podman="distrobox-host-exec podman"
else
  echo "Podman fehlt. Die Browser-Tests laufen im Container $bild." >&2
  exit 1
fi

# CI bleibt leer: Der Testlauf baut die Seite selbst (siehe playwright.config.ts).
# shellcheck disable=SC2086
exec $podman run --rm --init --shm-size=2g --security-opt label=disable \
  --volume "$PWD:/work" --workdir /work --env CI= \
  "$bild" npx playwright test "$@"
