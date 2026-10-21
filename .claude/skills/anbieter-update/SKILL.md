---
name: anbieter-update
description: Legt Anbieterdaten an oder aktualisiert sie aus einer Quelle, mit Quelle und Stand je Feld.
disable-model-invocation: true
argument-hint: "[anbieter-slug] [quellen-url]"
---

Aktualisiere den Anbieter $0 aus der Quelle $1.

1. Wechsle auf einen neuen Branch daten/$0.
2. Lies die Quelle. Übernimm nur Werte, die dort ausdrücklich stehen.
3. Schreibe src/data/providers/$0.json nach dem Schema in src/content.config.ts. Jedes Feld: value, source (URL), asOf (heutiges Datum). Nicht gefunden: value null. Nie schätzen, nie von anderen Anbietern übernehmen.
4. Führe npm run build aus; das Schema muss passen.
5. Zeige eine Tabelle: Feld | alt | neu | Fundstelle (kurzes Zitat, höchstens 15 Wörter). Samuel prüft jede Zeile.
6. Öffne einen Pull Request mit dieser Tabelle in der Beschreibung.
