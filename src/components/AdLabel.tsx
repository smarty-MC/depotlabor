import type { ComponentChildren } from 'preact';
import { useId } from 'preact/hooks';
import { cx } from './cx';
import { Icon } from './Icon';
import '../styles/komponenten/adlabel.css';

const AD_TEXT = { anzeige: 'Anzeige', affiliate: 'Affiliate-Link' } as const;
const AD_INFO = {
  anzeige:
    'Bezahlte Platzierung: Der Anbieter bezahlt für diese Anzeige. Auf unsere Vergleiche und Bewertungen hat das keinen Einfluss.',
  affiliate:
    'Schließt du über diesen Link ab, bekommen wir eine Provision. Für dich ändert sich am Preis nichts, und auf unsere Bewertung hat das keinen Einfluss.',
} as const;

export interface AdLabelProps {
  /** anzeige = bezahlte Platzierung · affiliate = Provisionslink */
  kind?: 'anzeige' | 'affiliate';
  /** Eigener Erklärtext; false blendet den Info-Button aus. */
  info?: ComponentChildren | false;
  class?: string;
}

/**
 * Werbekennzeichnung direkt am Link oder Button, mit Erklärung per Klick.
 * Das Panel nutzt die Popover-API: Esc und Klick daneben schließen es, ganz ohne JavaScript.
 */
export function AdLabel({ kind = 'affiliate', info, class: klasse }: AdLabelProps) {
  const id = 'ad' + useId();
  const text = info === undefined ? AD_INFO[kind] : info;
  return (
    <span class={cx('avd-ad', text === false && 'avd-ad--plain', klasse)} style={`anchor-name: --${id}`}>
      <span class="avd-ad__tag caption">{AD_TEXT[kind]}</span>
      {text !== false && (
        <>
          <button type="button" class="avd-ad__btn" popovertarget={id} aria-label={`Was bedeutet „${AD_TEXT[kind]}“?`}>
            <Icon name="info" size={16} />
          </button>
          <span class="avd-ad__pop body-sm" id={id} popover="auto" role="note" style={`position-anchor: --${id}`}>
            {text}
          </span>
        </>
      )}
    </span>
  );
}
