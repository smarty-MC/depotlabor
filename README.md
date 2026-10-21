# Depotlabor

Unabhängige Info- und Vergleichsseite zum Altersvorsorgedepot (AVD): einfach erklärt, ehrlich nachgerechnet. Keine Anlageberatung.

Gebaut mit Astro, Preact, Vitest und Playwright. Bis zum Launch trägt jede Seite `noindex` (Schalter `SITE_LIVE` in `src/config.ts`).

## Befehle

| Befehl | Was passiert |
| --- | --- |
| `npm ci` | installiert die Pakete genau nach `package-lock.json` |
| `npm run dev` | Entwicklungsserver auf http://localhost:4321 |
| `npm run check` | Typprüfung mit `astro check` |
| `npm test` | Rechentests mit Vitest |
| `npm run build` | baut die Seite nach `dist/` |
| `npm run test:e2e` | Browser-Tests mit Playwright und axe |

Voraussetzung ist Node.js 22.22 oder neuer.

## Regeln

Die Regeln für Claude Code stehen in `CLAUDE.md`. Prüffälle (`*.cases.ts`) und `src/calc/konstanten-2027.ts` ändert nur ein Mensch; ein Hook in `.claude/hooks/` sperrt sie für Claude.
