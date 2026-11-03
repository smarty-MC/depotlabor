// Platzhalter für Linkziele, zu denen es noch keine Seite gibt. So führt kein Link im Header oder Footer ins Leere,
// und sobald eine echte Seite existiert, fällt ihr Platzhalter von selbst weg.

/**
 * Adresse einer Datei aus src/pages, z. B. „./foerderung/grundzulage.astro“ → „/foerderung/grundzulage/“.
 * Dynamische Routen ([…]) und Dateien, die Astro ignoriert (_…), liefern null.
 */
export function routeAusDatei(datei: string): string | null {
  const pfad = datei.replace(/^\.\//, '').replace(/\.(astro|md|mdx)$/, '');
  if (pfad.includes('[') || pfad.split('/').some((teil) => teil.startsWith('_'))) return null;
  const ohneIndex = pfad === 'index' ? '' : pfad.replace(/\/index$/, '');
  return ohneIndex === '' ? '/' : `/${ohneIndex}/`;
}

/** Die Linkziele, zu denen keine der Seitendateien gehört. */
export function fehlendeSeiten<T extends { href: string }>(ziele: T[], seitendateien: string[]): T[] {
  const vorhanden = new Set(seitendateien.map(routeAusDatei).filter((route): route is string => route !== null));
  return ziele.filter((ziel) => !vorhanden.has(ziel.href));
}
