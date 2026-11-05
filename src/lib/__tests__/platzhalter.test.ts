import { describe, expect, it } from 'vitest';
import { CTA, FUSSZEILE, HAUPTNAVIGATION, aktiveKategorie, alleZiele } from '../../data/navigation';
import { fehlendeSeiten, routeAusDatei } from '../platzhalter';

describe('routeAusDatei', () => {
  it('leitet die Adresse aus dem Dateipfad ab', () => {
    expect(routeAusDatei('./index.astro')).toBe('/');
    expect(routeAusDatei('./foerderung/grundzulage.astro')).toBe('/foerderung/grundzulage/');
    expect(routeAusDatei('./foerderung/index.mdx')).toBe('/foerderung/');
    expect(routeAusDatei('./impressum.md')).toBe('/impressum/');
  });

  it('übergeht dynamische Routen und ignorierte Dateien', () => {
    expect(routeAusDatei('./[...platzhalter].astro')).toBeNull();
    expect(routeAusDatei('./ratgeber/[slug].astro')).toBeNull();
    expect(routeAusDatei('./_entwurf.astro')).toBeNull();
  });
});

describe('fehlendeSeiten', () => {
  it('liefert nur Ziele ohne eigene Seite', () => {
    const ziele = [{ href: '/' }, { href: '/impressum/' }, { href: '/foerderung/' }];
    expect(fehlendeSeiten(ziele, ['./index.astro', './foerderung/index.astro'])).toEqual([{ href: '/impressum/' }]);
  });
});

describe('Navigation', () => {
  const ziele = alleZiele();

  it('nutzt nur saubere Adressen mit Schrägstrich am Ende', () => {
    for (const ziel of ziele) expect(ziel.href).toMatch(/^\/([a-z0-9-]+\/)*$/);
  });

  it('enthält jedes interne Ziel einmal, auch Button und Footer', () => {
    const hrefs = ziele.map((z) => z.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs).toContain(CTA.href);
    const intern = FUSSZEILE.flatMap((s) => s.links).filter((link) => link.href.startsWith('/'));
    for (const link of intern) expect(hrefs).toContain(link.href);
  });

  it('hält die Grenzen des Designs ein: sechs Kategorien, höchstens drei Spalten und acht Links', () => {
    expect(HAUPTNAVIGATION).toHaveLength(6);
    for (const sektion of HAUPTNAVIGATION) {
      const links = sektion.groups ? sektion.groups.flatMap((g) => g.links) : (sektion.links ?? []);
      expect(sektion.groups?.length ?? 1).toBeLessThanOrEqual(3);
      expect(links.length).toBeLessThanOrEqual(8);
    }
  });

  it('erkennt die aktive Kategorie an der Adresse', () => {
    expect(aktiveKategorie('/foerderung/')).toBe('foerderung');
    expect(aktiveKategorie('/foerderung/kinderzulage/')).toBe('foerderung');
    expect(aktiveKategorie('/rechner/zulagen')).toBe('rechner');
    expect(aktiveKategorie('/')).toBeUndefined();
    expect(aktiveKategorie('/impressum/')).toBeUndefined();
  });
});
