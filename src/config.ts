// Zentrale Schalter für die ganze Seite.

/** Bis zum Launch false: Jede Seite trägt dann noindex. Umstellen nur mit Prompt C.6. */
export const SITE_LIVE = false;

export const SITE_NAME = 'Depotlabor';

/** Rechtsgrundlage aller Zahlen; so steht sie im Footer jeder Seite. */
export const RECHTSSTAND = 'Altersvorsorgereformgesetz, BGBl. 2026 I Nr. 156';

/**
 * Tag, an dem jemand den Rechtsstand wirklich geprüft hat (ISO). Ändert nur Samuel.
 * Vorläufig das Datum aus dem Design – bitte bestätigen oder ersetzen.
 */
export const RECHTSSTAND_GEPRUEFT_AM = '2026-10-30';

/** Adresse des YouTube-Kanals; solange null, fehlt der Link im Footer. */
export const YOUTUBE_KANAL: string | null = null;
