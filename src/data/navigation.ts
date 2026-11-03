// Navigation aus dem Design „Startseite, Header und Footer“: sechs Kategorien im Header, drei Spalten im Footer.
// Jede Kategorie ist selbst ein Link auf ihre Übersichtsseite. Die Adressen lassen sich bis zum Launch frei ändern;
// solange es zu einem Ziel keine Seite gibt, entsteht ein Platzhalter (src/pages/[...platzhalter].astro).
import { YOUTUBE_KANAL } from '../config';

export interface NavLink {
  label: string;
  href: string;
}

/** Eine Spalte im Dropdown, optional mit Überschrift. */
export interface NavGroup {
  title?: string;
  links: NavLink[];
}

export interface NavSection {
  id: string;
  /** Name der Kategorie – im Menü selbst ein Link. */
  label: string;
  /** Übersichtsseite der Kategorie */
  href: string;
  /** Höchstens drei Spalten mit zusammen höchstens acht Links */
  groups?: NavGroup[];
  /** Alternativ eine flache Liste (höchstens acht); ab fünf Links zweispaltig */
  links?: NavLink[];
}

export interface FooterSpalte {
  title: string;
  links: NavLink[];
}

export const HAUPTNAVIGATION: NavSection[] = [
  {
    id: 'verstehen', label: 'Verstehen', href: '/verstehen/', groups: [
      { title: 'Grundlagen', links: [
        { label: 'Das AVD in fünf Minuten', href: '/verstehen/avd-in-fuenf-minuten/' },
        { label: 'Standarddepot', href: '/verstehen/standarddepot/' },
        { label: 'Varianten mit Garantie', href: '/verstehen/garantie/' },
      ] },
      { title: 'Geld und Regeln', links: [
        { label: 'Kosten und Kostendeckel', href: '/verstehen/kosten/' },
        { label: 'Auszahlung im Alter', href: '/verstehen/auszahlung/' },
      ] },
      { title: 'Nachschlagen', links: [
        { label: 'Riester und das AVD', href: '/verstehen/riester/' },
        { label: 'Glossar', href: '/glossar/' },
      ] },
    ],
  },
  {
    id: 'foerderung', label: 'Förderung', href: '/foerderung/', groups: [
      { title: 'Zulagen', links: [
        { label: 'Grundzulage', href: '/foerderung/grundzulage/' },
        { label: 'Kinderzulage', href: '/foerderung/kinderzulage/' },
        { label: 'Berufseinsteigerbonus', href: '/foerderung/berufseinsteigerbonus/' },
      ] },
      { title: 'Regeln', links: [
        { label: 'Mindesteigenbeitrag', href: '/foerderung/mindesteigenbeitrag/' },
        { label: 'Steuervorteil', href: '/foerderung/steuervorteil/' },
        { label: 'Ehepaare', href: '/foerderung/ehepaare/' },
      ] },
    ],
  },
  {
    id: 'vergleich', label: 'Anbieter-Vergleich', href: '/anbieter/', groups: [
      { title: 'Vergleichen', links: [
        { label: 'Alle Anbieter', href: '/anbieter/vergleich/' },
        { label: 'Status-Tracker', href: '/anbieter/status/' },
        { label: 'Kosten-Vergleich', href: '/anbieter/kosten/' },
        { label: 'So vergleichen wir', href: '/methodik/' },
      ] },
      { title: 'Nach Art', links: [
        { label: 'Banken', href: '/anbieter/banken/' },
        { label: 'Neobroker', href: '/anbieter/neobroker/' },
        { label: 'Robo-Advisor', href: '/anbieter/robo-advisor/' },
        { label: 'Versicherer', href: '/anbieter/versicherer/' },
      ] },
    ],
  },
  {
    id: 'rechner', label: 'Rechner', href: '/rechner/', links: [
      { label: 'Zulagen-Rechner', href: '/rechner/zulagen/' },
      { label: 'Depot-Rechner', href: '/rechner/depot/' },
      { label: 'Kosten-Rechner', href: '/rechner/kosten/' },
      { label: 'Riester-Wechsel-Rechner', href: '/rechner/riester-wechsel/' },
    ],
  },
  {
    id: 'fuer-wen', label: 'Für wen?', href: '/fuer-wen/', links: [
      { label: 'Berufseinsteiger', href: '/fuer-wen/berufseinsteiger/' },
      { label: 'Familien', href: '/fuer-wen/familien/' },
      { label: 'Riester-Sparer', href: '/fuer-wen/riester-sparer/' },
      { label: 'Selbstständige', href: '/fuer-wen/selbststaendige/' },
      { label: 'Ehepaare und Partner', href: '/fuer-wen/ehepaare/' },
    ],
  },
  {
    id: 'news', label: 'News und Wissen', href: '/wissen/', links: [
      { label: 'Neuigkeiten', href: '/news/' },
      { label: 'AVD-Ticker', href: '/news/ticker/' },
      { label: 'Zeitplan bis zum Start', href: '/news/zeitplan/' },
      { label: 'Ratgeber-Artikel', href: '/ratgeber/' },
      { label: 'Videos', href: '/videos/' },
      { label: 'Newsletter', href: '/newsletter/' },
    ],
  },
];

/** Der eine Button im Header */
export const CTA: NavLink = { label: 'Zulage berechnen', href: '/rechner/zulagen/' };

/** Spalten im Footer. „Cookie-Einstellungen“ kommt dazu, sobald die Seite etwas speichert. */
export const FUSSZEILE: FooterSpalte[] = [
  { title: 'Depotlabor', links: [
    { label: 'Über mich', href: '/ueber-mich/' },
    { label: 'Methodik und Transparenz', href: '/methodik/' },
    { label: 'So finanziert sich Depotlabor', href: '/finanzierung/' },
  ] },
  { title: 'Rechtliches', links: [
    { label: 'Impressum', href: '/impressum/' },
    { label: 'Datenschutz', href: '/datenschutz/' },
  ] },
  { title: 'Mitmachen', links: [
    { label: 'Newsletter', href: '/newsletter/' },
    ...(YOUTUBE_KANAL ? [{ label: 'YouTube', href: YOUTUBE_KANAL }] : []),
    { label: 'Fehler melden', href: '/fehler-melden/' },
  ] },
];

/** Ziele außerhalb der Menüs, die trotzdem erreichbar sein müssen (Suchformular im Header) */
const WEITERE_ZIELE: NavLink[] = [{ label: 'Suche', href: '/suche/' }];

export interface Ziel extends NavLink {
  /** Kategorie, in deren Dropdown das Ziel steht */
  kategorie?: NavSection;
}

function linksVon(sektion: NavSection): NavLink[] {
  return sektion.groups ? sektion.groups.flatMap((g) => g.links) : (sektion.links ?? []);
}

/** Alle internen Linkziele aus Header, Footer und Suche, jedes einmal. */
export function alleZiele(): Ziel[] {
  const ziele = new Map<string, Ziel>();
  const merke = (ziel: Ziel) => {
    if (ziel.href.startsWith('/') && !ziele.has(ziel.href)) ziele.set(ziel.href, ziel);
  };
  for (const sektion of HAUPTNAVIGATION) {
    merke({ label: sektion.label, href: sektion.href });
    for (const link of linksVon(sektion)) merke({ ...link, kategorie: sektion });
  }
  merke(CTA);
  for (const spalte of FUSSZEILE) spalte.links.forEach((link) => merke(link));
  WEITERE_ZIELE.forEach((link) => merke(link));
  return [...ziele.values()];
}

/** Kategorie der Seite unter `pfad`: die Übersichtsseite selbst oder ein Link aus ihrem Dropdown. */
export function aktiveKategorie(pfad: string): string | undefined {
  const mitSchraegstrich = pfad.endsWith('/') ? pfad : `${pfad}/`;
  return HAUPTNAVIGATION.find(
    (sektion) => sektion.href === mitSchraegstrich || linksVon(sektion).some((link) => link.href === mitSchraegstrich),
  )?.id;
}
