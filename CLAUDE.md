# Depotlabor – Regeln für Claude Code

## Projekt
Unabhängige Info- und Vergleichsseite zum Altersvorsorgedepot (AVD), Förderstart 01.01.2027.
Rechtsgrundlage: Altersvorsorgereformgesetz, BGBl. 2026 I Nr. 156 (= BT-Drs. 21/4996).
Nie als Quelle: BMF-FAQ zur Reform und Regierungsentwurf BT-Drs. 21/4088 (Entwurfsstand).

## Stack
- Astro 7, statisch. In astro.config: compressHTML: true (sonst fehlen Leerzeichen zwischen Inline-Elementen).
- Preact-Islands in src/islands, Inhalte als MDX in src/content, Anbieterdaten in src/data/providers/*.json.
- Schemas in src/content.config.ts, Zod aus 'astro/zod'.
- Rechenlogik nur in src/calc: reines TypeScript, keine UI-Imports.
- Styles: CSS-Custom-Properties in src/styles/tokens.css, kein Tailwind. Schriften lokal über die Astro-Fonts-API.

## Befehle
- npm run dev | npm run build | npm run preview
- npm run check (astro check) | npm test (Vitest) | npm run test:e2e (Playwright + axe)
- Einzeltest: npx vitest run src/calc

## Harte Regeln
- Geld intern immer als ganze Cent (Integer), nie als Gleitkommazahl. Prozentsätze in Basispunkten.
- Rundung kaufmännisch auf volle Cent, nur an einer Stelle (src/calc/geld.ts).
- Prüffälle (*.cases.ts) und src/calc/konstanten-2027.ts ändert nur Samuel; ein Hook sperrt sie. Widerspricht etwas einem Prüffall: anhalten und fragen.
- Rechenlogik nur testgetrieben: erst Test rot, dann Code.
- Jedes Feld in Anbieterdaten hat value, source (URL) und asOf (ISO-Datum). Unbekannt: value null, nie schätzen.
- Keine externen Requests ohne Einwilligung: keine Schrift-CDNs, YouTube erst nach Klick, keine Tracker.
- Barrierefreiheit: semantisches HTML, Label an jedem Eingabefeld, Fehler per aria-live, Farbe nie allein.
- Texte: Du-Ansprache, Deutsch, Zahlen mit Intl.NumberFormat('de-DE'), immer mit Einheit und Zeitraum.
- Bis zum Launch: SITE_LIVE = false in src/config.ts, also noindex auf jeder Seite.

## Design
Komponentennamen aus dem Design System „Depotlabor“: StatusBadge, ResultCard, SourceNote, AdLabel, ProviderCard.
Zahlen in Designs sind Platzhalter; echte Werte kommen aus src/calc und src/data.

## Arbeitsweise
Erst Plan, dann Umsetzung. Ein Branch pro Aufgabe, kleine Commits (Conventional Commits).
Vor jedem Commit: npm run check && npm test. Immer per Pull Request, nie direkt auf main.
