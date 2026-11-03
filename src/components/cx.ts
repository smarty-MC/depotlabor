/** Klassennamen zusammenfügen, leere Werte auslassen. */
export function cx(...teile: (string | false | null | undefined)[]): string {
  return teile.filter(Boolean).join(' ');
}
