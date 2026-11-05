import { formatDatum, istIsoDatum } from '../lib/datum';
import { cx } from './cx';
import { Icon, type IconName } from './Icon';
import '../styles/komponenten/statusampel.css';

/** announced = Angekündigt · certified = Zertifiziert · available = Abschließbar */
export type ProviderStatus = 'announced' | 'certified' | 'available';

export const STATUS_META: Record<ProviderStatus, { label: string; lamps: number; icon: IconName; rank: number }> = {
  announced: { label: 'Angekündigt', lamps: 1, icon: 'megaphone', rank: 1 },
  certified: { label: 'Zertifiziert', lamps: 2, icon: 'file-check', rank: 2 },
  available: { label: 'Abschließbar', lamps: 3, icon: 'circle-check', rank: 3 },
};

export interface StatusAmpelProps {
  status: ProviderStatus;
  /** Datum des Statuswechsels, ISO (JJJJ-MM-TT) */
  since?: string;
  /** sm für Tabellen und Listen */
  size?: 'sm' | 'md';
  /** Nur Lampen zeigen; das Wort bleibt für Screenreader erhalten. */
  hideLabel?: boolean;
  class?: string;
}

/** Status eines Anbieters als Ampel: Lampen plus Wort plus Icon, nie Farbe allein. */
export function StatusAmpel({ status, since, size = 'md', hideLabel = false, class: klasse }: StatusAmpelProps) {
  const m = STATUS_META[status];
  const sinceText = since ? formatDatum(since) : '';
  return (
    <span class={cx('avd-status', `avd-status--${status}`, size === 'sm' && 'avd-status--sm', klasse)}>
      <span class="avd-status__lamps" aria-hidden="true">
        {[1, 2, 3].map((i) => <i class={i <= m.lamps ? 'is-on' : undefined} />)}
      </span>
      {hideLabel ? (
        <span class="avd-sr">Status: {m.label}{sinceText ? `, seit ${sinceText}` : ''}</span>
      ) : (
        <>
          <span class="avd-status__pill caption">
            <Icon name={m.icon} size={16} />
            <span><span class="avd-sr">Status: </span>{m.label}</span>
          </span>
          {since && (
            <span class="avd-status__since caption">
              seit {istIsoDatum(since) ? <time datetime={since}>{sinceText}</time> : sinceText}
            </span>
          )}
        </>
      )}
    </span>
  );
}
