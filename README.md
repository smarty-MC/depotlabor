# Depotlabor

Unabhängige Info- und Vergleichsseite zum Altersvorsorgedepot (AVD): einfach erklärt, ehrlich nachgerechnet. Keine Anlageberatung.

Gebaut mit Astro, Preact, Vitest und Playwright. Bis zum Launch trägt jede Seite `noindex` (Schalter `SITE_LIVE` in `src/config.ts`).

## Befehle

| Befehl | Was passiert |
| --- | --- |
| `npm ci` | installiert die Pakete genau nach `package-lock.json` |
| `npm run dev` | Entwicklungsserver auf http://localhost:4321 |
| `npm run vorschau` | Entwicklungsserver mit den Komponenten-Vorschauen unter `/komponenten/<name>/` |
| `npm run check` | Typprüfung mit `astro check` |
| `npm test` | Unit-Tests mit Vitest |
| `npm run build` | baut die Seite nach `dist/` |
| `npm run test:e2e:container` | Browser-Tests mit Playwright, axe und Screenshots im Playwright-Container (wie in der CI) |
| `npm run test:e2e:container -- --update-snapshots` | erzeugt die Screenshots nach einer gewollten Änderung neu |

Voraussetzung ist Node.js 22.22 oder neuer, für die Browser-Tests zusätzlich Podman. `npm run test:e2e` startet dieselben Tests ohne Container; das nutzt die CI, die schon im Container läuft.

Das Design kommt aus dem Design System „Depotlabor“. Komponenten, Stand und Abweichungen stehen in `docs/komponenten.md`.

## Regeln

Die Regeln für Claude Code stehen in `CLAUDE.md`. Prüffälle (`*.cases.ts`) und `src/calc/konstanten-2027.ts` ändert nur ein Mensch; ein Hook in `.claude/hooks/` sperrt sie für Claude.
