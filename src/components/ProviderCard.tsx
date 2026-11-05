import type { ComponentChildren } from 'preact';
import { useId } from 'preact/hooks';
import { formatDatum, istIsoDatum } from '../lib/datum';
import { AdLabel } from './AdLabel';
import { Button } from './Button';
import { cx } from './cx';
import { StatusAmpel, type ProviderStatus } from './StatusAmpel';
import '../styles/komponenten/providercard.css';

export interface ProviderFact {
  label: string;
  value: ComponentChildren;
}

export interface ProviderCardProps {
  name: string;
  /** Art des Anbieters, z. B. „Direktbank“, „Neobroker“, „Versicherer“ */
  kind?: string;
  /** Eigenes Logo-Element, nur mit Nutzungsrecht; sonst Monogramm */
  logo?: ComponentChildren;
  monogram?: string;
  status: ProviderStatus;
  /** Datum des letzten Statuswechsels, ISO */
  statusSince?: string;
  /** Zwei bis vier Fakten, bei allen Karten dieselben Bezeichnungen in derselben Reihenfolge */
  facts: ProviderFact[];
  note?: ComponentChildren;
  /** Abschluss-Link beim Anbieter (nur bei „Abschließbar“ als Button) */
  href?: string;
  /** Provisionslink: zeigt AdLabel und setzt rel="sponsored" */
  affiliate?: boolean;
  detailsHref?: string;
  notifyHref?: string;
  /** Stand der Daten, ISO */
  updated?: string;
}

/** Anbieter-Kachel mit Status-Ampel, gleichen Fakten für alle und einer Aktion, die vom Status abhängt. */
export function ProviderCard(p: ProviderCardProps) {
  const id = 'pc' + useId();
  const mono = p.monogram
    || p.name.split(/[\s-]+/).filter(Boolean).slice(0, 2).map((wort) => wort[0]).join('').toUpperCase();

  let aktionen: ComponentChildren;
  if (p.status === 'available' && p.href) {
    aktionen = (
      <>
        <Button href={p.href} external sponsored={p.affiliate} iconRight="external-link">Zum Anbieter</Button>
        {p.affiliate && <AdLabel kind="affiliate" />}
        {p.detailsHref && <Button variant="ghost" href={p.detailsHref}>Details</Button>}
      </>
    );
  } else if (p.status === 'certified') {
    aktionen = <Button variant="secondary" href={p.detailsHref}>Details ansehen</Button>;
  } else {
    aktionen = <Button variant="ghost" href={p.notifyHref} iconLeft="mail">Benachrichtigen</Button>;
  }

  return (
    <article class={cx('avd-pcard', `avd-pcard--${p.status}`)} aria-labelledby={`${id}-n`}>
      <header class="avd-pcard__head">
        <span class="avd-pcard__logo label" aria-hidden="true">{p.logo || mono}</span>
        <div class="avd-pcard__id">
          <h3 class="avd-pcard__name title" id={`${id}-n`}>{p.name}</h3>
          {p.kind && <p class="avd-pcard__kind caption">{p.kind}</p>}
        </div>
      </header>
      <StatusAmpel status={p.status} since={p.statusSince} />
      <dl class="avd-pcard__facts">
        {p.facts.map((f) => (
          <div class="avd-pcard__fact">
            <dt class="caption">{f.label}</dt>
            <dd class="figure-md avd-num">{f.value}</dd>
          </div>
        ))}
      </dl>
      {p.note && <p class="avd-pcard__note body-sm">{p.note}</p>}
      <footer class="avd-pcard__foot">
        <div class="avd-pcard__actions">{aktionen}</div>
        {p.updated && (
          <p class="avd-pcard__updated caption">
            Stand: {istIsoDatum(p.updated) ? <time datetime={p.updated}>{formatDatum(p.updated)}</time> : p.updated}
          </p>
        )}
      </footer>
    </article>
  );
}
