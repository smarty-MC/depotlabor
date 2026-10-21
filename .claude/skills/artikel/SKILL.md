---
name: artikel
description: Schreibt einen Ratgeber-Artikel als MDX nach dem Depotlabor-Muster und lässt ihn vom Faktenprüfer prüfen.
disable-model-invocation: true
argument-hint: "[Thema]"
---

Schreibe einen Artikel zum Thema: $ARGUMENTS

1. Lege src/content/artikel/<slug>.mdx an. Frontmatter: title, description (max. 155 Zeichen), datePublished, dateModified, rechtsstand: "BGBl. 2026 I Nr. 156", quellen (Liste mit url und titel).
2. Aufbau: Box „Das Wichtigste in 30 Sekunden“ mit 3 Punkten, Erklärung in kurzen Abschnitten, mindestens eine Beispielrechnung mit Werten aus src/calc, FAQ mit 3–5 Fragen, Quellen.
3. Stil: Du-Ansprache, Sätze unter 20 Wörtern, Zahlen mit Einheit und Zeitraum. Keine Anlageberatung, keine Kaufempfehlung.
4. Jede Zahl stammt aus src/calc, src/data oder einer Quelle in der Frontmatter. Nichts schätzen.
5. Rufe danach den Subagenten faktenpruefer für die neue Datei auf und hänge seine Tabelle an deine Antwort.
6. Nenne am Ende die Stellen, an denen Samuel ein eigenes Beispiel oder eine eigene Einschätzung ergänzen sollte.
