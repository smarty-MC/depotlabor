import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { formatDatum, heuteIso, istIsoDatum, tageZwischen } from '../datum';

describe('formatDatum', () => {
  it('schreibt ISO-Daten deutsch', () => {
    expect(formatDatum('2026-10-27')).toBe('27.10.2026');
    expect(formatDatum('2027-01-01')).toBe('01.01.2027');
  });

  it('lässt andere Eingaben unverändert', () => {
    expect(formatDatum('2026-02-30')).toBe('2026-02-30');
    expect(formatDatum('Herbst 2026')).toBe('Herbst 2026');
  });
});

describe('istIsoDatum', () => {
  it('erkennt gültige und ungültige Daten', () => {
    expect(istIsoDatum('2028-02-29')).toBe(true);
    expect(istIsoDatum('2027-02-29')).toBe(false);
    expect(istIsoDatum('27.10.2026')).toBe(false);
    expect(istIsoDatum(undefined)).toBe(false);
  });
});

describe('tageZwischen', () => {
  it('zählt ganze Tage, auch über die Zeitumstellung', () => {
    expect(tageZwischen('2026-10-01', '2026-10-31')).toBe(30);
    expect(tageZwischen('2026-03-28', '2026-03-30')).toBe(2);
    expect(tageZwischen('2026-12-31', '2027-01-01')).toBe(1);
  });

  it('ist negativ, wenn das Ziel früher liegt', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31'), noInvalidDate: true }),
        fc.date({ min: new Date('2000-01-01'), max: new Date('2100-12-31'), noInvalidDate: true }),
        (a, b) => {
          const von = a.toISOString().slice(0, 10);
          const bis = b.toISOString().slice(0, 10);
          expect(tageZwischen(von, bis) + tageZwischen(bis, von)).toBe(0);
          // ISO-Daten lassen sich als Text sortieren
          expect(Math.sign(tageZwischen(von, bis))).toBe(Math.sign(bis.localeCompare(von)));
        },
      ),
    );
  });

  it('bricht bei ungültigem Datum ab', () => {
    expect(() => tageZwischen('2026-13-01', '2026-10-01')).toThrow(RangeError);
  });
});

describe('heuteIso', () => {
  it('nimmt den Tag in Deutschland, nicht in UTC', () => {
    expect(heuteIso(new Date('2026-11-03T23:30:00Z'))).toBe('2026-11-04');
    expect(heuteIso(new Date('2026-07-01T21:59:00Z'))).toBe('2026-07-01');
  });
});
