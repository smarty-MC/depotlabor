import { formatDatum, heuteIso, tageZwischen } from '../lib/datum';
import { cx } from './cx';
import { Icon } from './Icon';
import '../styles/komponenten/sourcenote.css';

/** Ab diesem Alter in Tagen gilt ein Stand als veraltet. */
export const VERALTET_AB_TAGEN = 30;

export interface SourceNoteProps {
  /** Name der Quelle, z. B. „Preisverzeichnis“ */
  label: string;
  /** Link zur Quelle: Original oder Anker auf die Quelle in der SourceBox */
  source: string;
  /** Stand der Angabe, ISO (JJJJ-MM-TT) */
  asOf: string;
  /** Vergleichsdatum für das Alter, Standard: Tag des Builds. Nur für Tests und Vorschauen setzen. */
  today?: string;
  class?: string;
}

/** Quelle und Stand direkt an einer Zahl oder Zeile; ist der Stand älter als 30 Tage, steht eine Warnung dabei. */
export function SourceNote({ label, source, asOf, today = heuteIso(), class: klasse }: SourceNoteProps) {
  const veraltet = tageZwischen(asOf, today) > VERALTET_AB_TAGEN;
  return (
    <span class={cx('avd-srcnote', 'body-sm', klasse)}>
      <span class="avd-srcnote__line">
        <Icon name="book-open" size={16} />
        <a href={source}>{label}</a>
      </span>
      <span class="avd-srcnote__stand caption">
        Stand: <time datetime={asOf}>{formatDatum(asOf)}</time>
      </span>
      {veraltet && (
        <span class="avd-stale caption">
          <Icon name="triangle-alert" size={16} />
          Stand älter als {VERALTET_AB_TAGEN} Tage
        </span>
      )}
    </span>
  );
}
