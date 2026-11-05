import { useEffect, useId, useLayoutEffect, useRef, useState } from 'preact/hooks';
import { Button } from '../components/Button';
import { cx } from '../components/cx';
import { Icon } from '../components/Icon';
import type { NavGroup, NavLink, NavSection } from '../data/navigation';
import '../styles/komponenten/felder.css';
import '../styles/komponenten/header.css';

/** Spalten eines Dropdowns: die Gruppen der Kategorie oder die flache Liste, ab fünf Links zweispaltig. */
function spaltenVon(sektion: NavSection): NavGroup[] {
  if (sektion.groups && sektion.groups.length) return sektion.groups.slice(0, 3);
  const links = sektion.links ?? [];
  if (links.length <= 4) return [{ links }];
  const haelfte = Math.ceil(links.length / 2);
  return [{ links: links.slice(0, haelfte) }, { links: links.slice(haelfte) }];
}

export interface SiteHeaderProps {
  brand: string;
  homeHref?: string;
  /** Sechs Kategorien, jede mit eigener Übersichtsseite */
  sections: NavSection[];
  /** Kategorie der aktuellen Seite */
  activeId?: string;
  /** Adresse der aktuellen Seite – markiert den Link im Dropdown */
  currentHref?: string;
  /** Button rechts bzw. unten in der Schublade */
  cta?: NavLink;
  /** Suchformular; Standard: GET /suche/ mit Feld q */
  search?: { action?: string; name?: string; placeholder?: string };
  /** Ziel des Skip-Links, die id des main-Elements */
  skipTo?: string;
}

/**
 * Kopfzeile aus dem Design System: Wortmarke, sechs anklickbare Kategorien mit schlankem Dropdown, Suche und Button;
 * unter 1200 px Breite eine Menü-Schublade. Insel mit client:idle; ohne JavaScript bleiben alle Kategorien Links.
 */
export function SiteHeader({
  brand, homeHref = '/', sections, activeId, currentHref, cta, search, skipTo = '#inhalt',
}: SiteHeaderProps) {
  const uid = 'hd' + useId();
  const suche = { action: '/suche/', name: 'q', placeholder: 'Suchen, z. B. Kinderzulage', ...search };
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const toggleRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const focusFirst = useRef(false);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Ab dem Scrollen hebt ein Schatten den klebenden Header ab
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Klick daneben schließt alles; Esc schließt die oberste Ebene und setzt den Fokus zurück.
  // useLayoutEffect: Die Listener hängen schon, bevor die geöffnete Ebene sichtbar wird.
  useLayoutEffect(() => {
    if (!openId && !mobileOpen && !searchOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenId(null);
        setMobileOpen(false);
        setSearchOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (openId) {
        const toggle = toggleRefs.current[openId];
        setOpenId(null);
        toggle?.focus();
      } else if (searchOpen) {
        setSearchOpen(false);
        searchBtnRef.current?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openId, mobileOpen, searchOpen]);

  // Pfeil ↓ auf dem Pfeil-Button: Dropdown öffnen und in den ersten Link springen
  useEffect(() => {
    if (openId && focusFirst.current) {
      focusFirst.current = false;
      document.getElementById(`${uid}-dd-${openId}`)?.querySelector('a')?.focus();
    }
  }, [openId]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  // Maus: Überfahren öffnet nach kurzer Verzögerung, Verlassen schließt nach 250 ms
  const openSoon = (id: string) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenId(id), openId ? 0 : 120);
  };
  const closeSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenId(null), 250);
  };

  return (
    <header class={cx('avd-header', (openId || mobileOpen || searchOpen) && 'is-open', scrolled && 'is-scrolled')} ref={rootRef}>
      <a class="avd-skip label" href={skipTo}>Zum Inhalt springen</a>
      <div class="avd-header__bar">
        <a class="avd-wordmark h3 avd-header__brand" href={homeHref}>{brand}</a>

        <nav class="avd-header__nav" aria-label="Hauptnavigation">
          <ul class="avd-nav">
            {sections.map((sektion, i) => {
              const open = openId === sektion.id;
              const spalten = spaltenVon(sektion);
              const panelId = `${uid}-dd-${sektion.id}`;
              return (
                <li
                  key={sektion.id}
                  class={cx('avd-nav__item', open && 'is-open', activeId === sektion.id && 'is-active')}
                  onMouseEnter={() => openSoon(sektion.id)}
                  onMouseLeave={closeSoon}
                  onFocusOut={(e) => {
                    if (open && !e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenId(null);
                  }}
                >
                  <a class="avd-nav__link label" href={sektion.href} aria-current={activeId === sektion.id ? 'true' : undefined}>
                    {sektion.label}
                  </a>
                  <button
                    type="button"
                    ref={(el) => { toggleRefs.current[sektion.id] = el; }}
                    class="avd-nav__toggle"
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={`Untermenü ${sektion.label}`}
                    onClick={() => {
                      clearTimeout(timer.current);
                      setOpenId((aktuell) => (aktuell === sektion.id ? null : sektion.id));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        focusFirst.current = true;
                        setOpenId(sektion.id);
                      }
                    }}
                  >
                    <Icon name="chevron-down" size={16} />
                  </button>
                  <div class={cx('avd-dd', i >= sections.length - 2 && 'avd-dd--end')} id={panelId} hidden={!open}>
                    <div class={cx('avd-dd__cols', `avd-dd__cols--${spalten.length}`)}>
                      {spalten.map((gruppe) => (
                        <div class="avd-dd__col">
                          {gruppe.title && <p class="avd-dd__title caption">{gruppe.title}</p>}
                          <ul>
                            {gruppe.links.map((link) => (
                              <li key={link.href}>
                                <a class="avd-dd__link body-sm" href={link.href} aria-current={currentHref === link.href ? 'page' : undefined}>
                                  {link.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div class="avd-header__tools">
          <button
            type="button"
            ref={searchBtnRef}
            class="avd-iconbtn avd-header__searchbtn"
            aria-expanded={searchOpen}
            aria-controls={`${uid}-search`}
            aria-label={searchOpen ? 'Suche schließen' : 'Suche öffnen'}
            onClick={() => setSearchOpen((offen) => !offen)}
          >
            <Icon name={searchOpen ? 'x' : 'search'} size={20} />
          </button>
          {cta && <Button size="sm" href={cta.href} class="avd-header__cta">{cta.label}</Button>}
          <button
            type="button"
            ref={burgerRef}
            class="avd-iconbtn avd-header__burger"
            aria-expanded={mobileOpen}
            aria-controls={`${uid}-drawer`}
            aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setMobileOpen((offen) => !offen)}
          >
            <Icon name={mobileOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      <div class="avd-searchbar" id={`${uid}-search`} hidden={!searchOpen}>
        <form class="avd-searchbar__form" role="search" action={suche.action}>
          <label class="avd-sr" for={`${uid}-q`}>Suche</label>
          <span class="avd-input avd-searchbar__field">
            <input ref={searchInput} id={`${uid}-q`} class="avd-input__el body" type="search" name={suche.name} placeholder={suche.placeholder} />
          </span>
          <Button type="submit" variant="secondary">Suchen</Button>
        </form>
      </div>

      <div class="avd-drawer" id={`${uid}-drawer`} hidden={!mobileOpen}>
        <form class="avd-drawer__search" role="search" action={suche.action}>
          <label class="avd-sr" for={`${uid}-qm`}>Suche</label>
          <span class="avd-input">
            <input id={`${uid}-qm`} class="avd-input__el body" type="search" name={suche.name} placeholder={suche.placeholder} />
            <button type="submit" class="avd-iconbtn avd-drawer__searchbtn" aria-label="Suchen">
              <Icon name="search" size={20} />
            </button>
          </span>
        </form>
        <nav aria-label="Hauptnavigation">
          <ul class="avd-drawer__list">
            {sections.map((sektion) => {
              const open = mobileSection === sektion.id;
              const panelId = `${uid}-dr-${sektion.id}`;
              return (
                <li key={sektion.id} class={cx(open && 'is-open')}>
                  <div class="avd-drawer__row">
                    <a
                      class={cx('avd-drawer__cat title', activeId === sektion.id && 'is-active')}
                      href={sektion.href}
                      aria-current={activeId === sektion.id ? 'true' : undefined}
                    >
                      {sektion.label}
                    </a>
                    <button
                      type="button"
                      class="avd-drawer__toggle"
                      aria-expanded={open}
                      aria-controls={panelId}
                      aria-label={`Untermenü ${sektion.label}`}
                      onClick={() => setMobileSection((aktuell) => (aktuell === sektion.id ? null : sektion.id))}
                    >
                      <Icon name="chevron-down" size={20} />
                    </button>
                  </div>
                  <div class="avd-drawer__panel" id={panelId} hidden={!open}>
                    {spaltenVon(sektion).map((gruppe) => (
                      <div class="avd-drawer__group">
                        {gruppe.title && <p class="avd-drawer__gtitle caption">{gruppe.title}</p>}
                        <ul>
                          {gruppe.links.map((link) => (
                            <li key={link.href}>
                              <a class="avd-drawer__link body" href={link.href} aria-current={currentHref === link.href ? 'page' : undefined}>
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>
        {cta && (
          <div class="avd-drawer__foot">
            <Button href={cta.href} fullWidth>{cta.label}</Button>
          </div>
        )}
      </div>
      {mobileOpen && <div class="avd-scrim" aria-hidden="true" onClick={() => setMobileOpen(false)} />}
    </header>
  );
}
