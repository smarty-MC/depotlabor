// Datumsangaben für Quellen und Stand: intern als ISO-Datum (JJJJ-MM-TT), angezeigt deutsch (27.10.2026).

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
const TAG_MS = 86_400_000;

const anzeige = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
// en-CA liefert das Datum in der Form JJJJ-MM-TT
const isoBerlin = new Intl.DateTimeFormat('en-CA', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Europe/Berlin' });

/** Millisekunden seit 1970 für ein gültiges ISO-Datum (Mitternacht UTC), sonst null. */
function alsUtc(iso: string): number | null {
  const teile = ISO.exec(iso);
  if (!teile) return null;
  const [jahr, monat, tag] = [Number(teile[1]), Number(teile[2]), Number(teile[3])];
  const ms = Date.UTC(jahr, monat - 1, tag);
  const d = new Date(ms);
  return d.getUTCFullYear() === jahr && d.getUTCMonth() === monat - 1 && d.getUTCDate() === tag ? ms : null;
}

/** true, wenn der Wert ein gültiges ISO-Datum ist (2026-02-30 ist es nicht). */
export function istIsoDatum(wert: string | undefined): wert is string {
  return wert !== undefined && alsUtc(wert) !== null;
}

/** „2026-10-27“ wird zu „27.10.2026“; andere Eingaben bleiben unverändert. */
export function formatDatum(iso: string): string {
  const ms = alsUtc(iso);
  return ms === null ? iso : anzeige.format(ms);
}

/** Ganze Tage von `von` bis `bis`, negativ, wenn `bis` früher liegt. Wirft bei ungültigem Datum. */
export function tageZwischen(von: string, bis: string): number {
  const a = alsUtc(von);
  const b = alsUtc(bis);
  if (a === null) throw new RangeError(`Kein gültiges ISO-Datum: „${von}“`);
  if (b === null) throw new RangeError(`Kein gültiges ISO-Datum: „${bis}“`);
  return Math.round((b - a) / TAG_MS);
}

/** Heutiges Datum in Deutschland als ISO-Datum, z. B. für das Alter von Daten beim Build. */
export function heuteIso(jetzt: Date = new Date()): string {
  return isoBerlin.format(jetzt);
}
