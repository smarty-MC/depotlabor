# Komponenten

Stand: C.2 „Design übernehmen“, 03.11.2026. Grundlage ist das Design System „Depotlabor“ mit der letzten Änderung vom 31.10.2026 (Review WCAG 2.2 AA und Übergabe). Dazu kommen der Abschnitt „Übergabe an Astro“ und die Seiten-Designs „Depotlabor – Startseite, Header und Footer“, „Anbietervergleich Altersvorsorgedepot“, „Zulagen-Rechner 2027“ und „Depotlabor Seitenvorlagen“. Zahlen in den Designs sind Platzhalter; echte Werte kommen aus `src/calc` und `src/data`.

## So ist der Code aufgebaut

| Ort | Inhalt |
| --- | --- |
| `src/styles/tokens.css` | Farben hell und dunkel (über `prefers-color-scheme`), Abstände, Radien, Layout, Ebenen, Textstile mit den Klassen `.display` bis `.figure-md` |
| `src/styles/basis.css` | body, Links, Fokus, `avd-sr`, `avd-num`, `avd-mark`, Wortmarke, SkipLink, `avd-container`, `avd-section`, `avd-sticky-top` |
| `src/styles/komponenten/*.css` | je Komponente der passende Abschnitt aus `components/bundle.css`, unverändert bis auf die Ebene |
| `src/components/*.tsx` | Komponenten des Design Systems als Preact. Ohne `client:*` rendert Astro sie zu reinem HTML ohne JavaScript, deshalb sind sie auch in Inseln verwendbar. |
| `src/components/*.astro` | reine Rahmenteile: Container, Breadcrumbs, SiteHeader-Hülle, SiteFooter |
| `src/islands/*.tsx` | Inseln, die im Browser aktiv werden; bisher nur `SiteHeader` (`client:idle`) |
| `src/vorschau/*.astro` | Vorschauseiten unter `/komponenten/<name>/` mit erfundenen Werten, nur im Testbuild (`KOMPONENTEN_VORSCHAU=1`) |
| `src/assets/fonts/` | Figtree und Bricolage Grotesque als variable woff2, eingebunden über die Astro-Fonts-API |

**Kaskadenebenen:** Astro bündelt CSS je Seite und bettet kleine Teile direkt ein. Die Reihenfolge der Dateien ist deshalb nicht verlässlich. Darum liegt jede Datei in einer Ebene, und das Basislayout legt die Rangfolge als erstes Element im `<head>` fest: `avd-tokens` < `avd-basis` < `avd-bausteine` < `avd-komponenten`. Styles einer Seite ohne Ebene (`<style>` in einer .astro-Datei) stehen über allem. Seitenspezifische Klassen tragen die Präfixe `st-` (Startseite), `rs-` (Rechner), `vg-` (Vergleich) und `sv-` (Seitenvorlagen) wie in der Übergabe.

## Inventar

„gebaut“ heißt: Code, Vorschauseite und Screenshot-Test, hell und dunkel, auf Desktop und Pixel 9.

| Komponente | Umsetzung | Datei | Stand |
| --- | --- | --- | --- |
| Button | Preact, statisch | `components/Button.tsx` | gebaut |
| Icon | Preact, statisch, Lucide 0.460 | `components/Icon.tsx`, `components/icons.ts` | gebaut |
| Container, Section, StickyTop | Astro und CSS-Klassen | `components/Container.astro`, `styles/basis.css` | gebaut |
| SkipLink | Teil des Headers | `islands/SiteHeader.tsx` | gebaut |
| SiteHeader | Astro-Hülle und Preact-Insel (`client:idle`) | `components/SiteHeader.astro`, `islands/SiteHeader.tsx` | gebaut |
| Breadcrumbs | Astro | `components/Breadcrumbs.astro` | gebaut |
| SiteFooter | Astro | `components/SiteFooter.astro` | gebaut, ohne „Cookie-Einstellungen“ |
| StatusAmpel | Preact, statisch | `components/StatusAmpel.tsx` | gebaut |
| ProviderCard | Preact, statisch | `components/ProviderCard.tsx` | gebaut |
| SourceNote | Preact, statisch; das Alter rechnet der Build | `components/SourceNote.tsx` | gebaut |
| AdLabel | Preact, statisch, Popover-API | `components/AdLabel.tsx` | gebaut |
| ResultCard | Preact, Werte als Props | `components/ResultCard.tsx` | gebaut; Insel mit `src/calc` in C.3 |
| Field mit Input | Preact | `components/Field.tsx` | gebaut; Select folgt mit C.5 |
| Stepper, Checkbox | Preact | `components/Stepper.tsx`, `components/Checkbox.tsx` | gebaut |
| CalculatorLayout, ResultFigure, BreakdownBar, RangeField, Segmented, InfoTip | Preact-Insel | – | C.3 Zulagen-Rechner |
| Rechner-Muster `rs-` | Teil der Rechner-Insel | – | C.3 |
| ComparisonTable, Filter, BottomSheet, Vergleichsablage | Preact-Insel | – | C.5 Vergleich |
| Switch, Chip, Tag, EmptyState, Skeleton | CSS-Muster, in Inseln | – | C.5 |
| Direktvergleich `vg-cmp` | Preact-Insel | – | KW 47 |
| Monogram (eigenständig) | statisch | – | KW 47 Profile; in der ProviderCard steckt es schon als `avd-pcard__logo` |
| SourceBox, Callout, Stat, DataTable, IconList, LinkCard, LinkList, Panel | statisch | – | mit den ersten Seiten, die Zahlen und Inhalte haben |
| FaqAccordion | statisch mit details/summary | – | KW 47 Artikel |
| Inhaltsseiten-Muster `sv-` | Teil der Layouts für Artikel, Profil, Methodik | – | KW 47–48 |
| Startseiten-Muster `st-` | Teil von `pages/index.astro` | `pages/index.astro` | Hero gebaut; Mini-Rechner, Statusleiste, Artikel und Ticker kommen mit echten Daten |
| YouTubeConsent | Preact-Insel | – | mit dem ersten Video auf der Seite, danach auch „Cookie-Einstellungen“ im Footer |
| NewsletterBox | Preact-Insel | – | KW 49 |

## Bewusste Abweichungen vom Design System

- Hell und dunkel folgen `prefers-color-scheme`; `data-theme` entfällt, weil es keinen Umschalter gibt.
- AdLabel öffnet seine Erklärung über die HTML-Popover-API und hängt per CSS-Anker-Positionierung am Label. Esc und Klick daneben schließen sie ohne JavaScript. Browser ohne Anker-Positionierung zeigen das Panel unten am Bildschirmrand.
- Der Header bekommt ab dem Scrollen `shadow-md`, wie es `SiteHeader/README.md` beschreibt. Die Listener für Esc und Klick daneben hängen per `useLayoutEffect`, damit auch ein sofortiges Esc wirkt.
- ResultCard rechnet nicht. `calcZulage` und `parseEuro` aus dem Bundle sind nur für die Vorschauen des Design Systems gedacht.
- Die Icons `shield-check` und `badge-check` fehlen: keine Siegel als Vertrauenszeichen.
- „Cookie-Einstellungen“ erscheint erst, wenn die Seite etwas speichert.
- Fließtext schreibt Daten aus („Ab dem 1. Januar 2027“), wie es die Schreibweisen im Design System verlangen. Der Hero im Design hatte „01.01.2027“.

## Platzhalterseiten

Header und Footer verlinken alle geplanten Seiten (`src/data/navigation.ts`). Für jedes Ziel ohne eigene Datei in `src/pages` erzeugt `src/pages/[...platzhalter].astro` die Seite „Diese Seite entsteht gerade“. Legst du die echte Seite an, fällt der Platzhalter von selbst weg. Mit `SITE_LIVE = true` bricht der Build ab, solange noch Platzhalter übrig sind.

## Tests

- Unit-Tests: `src/lib/__tests__` (Datum, Platzhalter, Navigation).
- Browser-Tests: `tests/e2e`. `komponenten.spec.ts` prüft die Vorschauseiten, `layout.spec.ts` das Basislayout und den Header, `startseite.spec.ts` die Grundregeln. Jede Seite muss axe ohne Verstöße gegen WCAG 2.2 AA bestehen, in beiden Themes.
- Screenshots liegen in `tests/e2e/__screenshots__`. Sie entstehen nur im offiziellen Container `mcr.microsoft.com/playwright:v<Version>-noble`, lokal wie in der CI; sonst unterscheiden sich die Pixel je nach Betriebssystem.
  - Lokal: `npm run test:e2e:container`. Das Skript nutzt Podman, in der Distrobox das Podman des Hosts.
  - Nach einer gewollten Änderung am Aussehen: `npm run test:e2e:container -- --update-snapshots`. Danach die geänderten Bilder im Pull Request ansehen.
  - Wer `@playwright/test` aktualisiert, ändert auch die Version des Containers in `.github/workflows/ci.yml`.
- Die Vorschauseiten selbst ansehen: `npm run vorschau`, dann zum Beispiel <http://localhost:4321/komponenten/providercard/>.

## Design System aktualisieren

1. Den geänderten Abschnitt aus `components/bundle.css` in die passende Datei unter `src/styles/komponenten/` übernehmen. Die Hülle `@layer …` bleibt.
2. Neue oder geänderte Tokens in `src/styles/tokens.css` eintragen, hell in `:root` und dunkel in der Media-Query.
3. Props und Markup der Komponente mit `components/src/*.tsx` des Design Systems abgleichen. Preact nutzt `class` statt `className` und `onFocusOut` statt `onBlur`.
4. Screenshots neu erzeugen und die Unterschiede prüfen.

## Lizenzen

- Figtree und Bricolage Grotesque: SIL Open Font License 1.1, Texte in `src/assets/fonts/OFL-*.txt`.
- Icons: Lucide 0.460, ISC-Lizenz, Copyright Lucide Contributors (<https://lucide.dev/license>).
