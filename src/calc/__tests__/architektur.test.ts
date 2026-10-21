import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const calcOrdner = fileURLToPath(new URL('..', import.meta.url));

function tsDateien(ordner: string): string[] {
  return readdirSync(ordner, { withFileTypes: true }).flatMap((eintrag) => {
    const pfad = join(ordner, eintrag.name);
    if (eintrag.isDirectory()) return eintrag.name === '__tests__' ? [] : tsDateien(pfad);
    return eintrag.name.endsWith('.ts') ? [pfad] : [];
  });
}

// Imports, die im Rechenkern nichts verloren haben: UI-Bibliotheken und Seitenbausteine.
const verbotenerImport =
  /from\s+['"](?:preact|astro|@astrojs)[^'"]*['"]|from\s+['"][^'"]*(?:\.astro|\/components\/|\/islands\/|\/layouts\/|\/pages\/)[^'"]*['"]/;

describe('Rechenkern src/calc', () => {
  it('importiert keine UI', () => {
    const verstoesse = tsDateien(calcOrdner)
      .filter((datei) => verbotenerImport.test(readFileSync(datei, 'utf8')))
      .map((datei) => relative(calcOrdner, datei));
    expect(verstoesse).toEqual([]);
  });
});
