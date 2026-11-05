import { useId } from 'preact/hooks';
import { Checkbox } from './Checkbox';
import { cx } from './cx';
import { Field, Input } from './Field';
import { Icon } from './Icon';
import { Stepper } from './Stepper';
import '../styles/komponenten/resultcard.css';

/** Fertig formatierte Beträge, z. B. „540 €“. Gerechnet wird nur in src/calc. */
export interface ResultCardResult {
  total: string;
  grund: string;
  kind: string;
}

export interface ResultCardProps {
  title?: string;
  /** Eigenbeitrag pro Jahr, so wie er im Feld steht, z. B. „1.800“ */
  contribution: string;
  kids: number;
  maxKids?: number;
  /** Antwort auf „Am 1. Januar jünger als 25“ */
  young: boolean;
  /** Ergebnis aus src/calc. Fehlt es, ist die Rechnung pausiert und zeigt „– €“. */
  result?: ResultCardResult;
  /** Fehlermeldung am Feld; sagt, was zu tun ist. */
  error?: string;
  /** Hinweis unter dem Feld, z. B. zu den Grenzen; entfällt bei einem Fehler. */
  hint?: string;
  /** Hinweis unter dem Ergebnis, z. B. unter dem Mindesteigenbeitrag. */
  note?: string;
  /** Zeile zum Berufseinsteigerbonus, z. B. „einmalig 200 € Berufseinsteigerbonus“ */
  bonus?: string;
  detailsHref?: string;
  detailsLabel?: string;
  onContributionInput?: (text: string) => void;
  onContributionBlur?: () => void;
  onKidsChange?: (kids: number) => void;
  onYoungChange?: (young: boolean) => void;
}

/**
 * Mini-Rechner für die Zulage: Eigenbeitrag, Kinder, Berufseinstieg – Ergebnis direkt darunter, Fehler am Feld.
 * Die Karte rechnet nicht selbst; sie zeigt, was die Insel aus src/calc übergibt.
 */
export function ResultCard({
  title = 'Wie viel Zulage bekommst du?', contribution, kids, maxKids = 5, young, result, error, hint, note, bonus,
  detailsHref = '#', detailsLabel = 'Ausführlich rechnen',
  onContributionInput, onContributionBlur, onKidsChange, onYoungChange,
}: ResultCardProps) {
  const id = 'rc' + useId();
  return (
    <section class="avd-rcard" aria-labelledby={`${id}-t`}>
      <h2 class="avd-rcard__title h3" id={`${id}-t`}>{title}</h2>
      <div class="avd-rcard__fields">
        <Field label="Eigenbeitrag pro Jahr" hint={error ? undefined : hint} error={error}>
          <Input
            inputmode="decimal"
            autocomplete="off"
            suffix="€"
            value={contribution}
            onInput={(e) => onContributionInput?.(e.currentTarget.value)}
            onBlur={() => onContributionBlur?.()}
          />
        </Field>
        <Stepper label="Kinder mit Kindergeld" value={kids} min={0} max={maxKids} onChange={onKidsChange} />
        <Checkbox label="Am 1. Januar jünger als 25" checked={young} onChange={onYoungChange} />
      </div>
      <div class={cx('avd-rcard__result', !result && 'is-paused')} aria-live="polite" aria-atomic="true">
        <p class="avd-rcard__label body-sm">Deine Zulage</p>
        {result ? (
          <>
            <p class="avd-rcard__value">
              <span class="avd-rcard__num figure-lg">{result.total}</span>
              <span class="avd-rcard__unit body"> pro Jahr</span>
            </p>
            <dl class="avd-rcard__parts caption">
              <div><dt>Grundzulage</dt><dd class="avd-num">{result.grund}</dd></div>
              <div><dt>Kinderzulage</dt><dd class="avd-num">{result.kind}</dd></div>
            </dl>
            {note && <p class="avd-rcard__note caption">{note}</p>}
            {bonus && (
              <p class="avd-rcard__bonus body-sm">
                <Icon name="plus" size={16} />
                <span>{bonus}</span>
              </p>
            )}
          </>
        ) : (
          <>
            <p class="avd-rcard__value"><span class="avd-rcard__num figure-lg">– €</span></p>
            <p class="avd-rcard__paused caption">
              <Icon name="circle-alert" size={16} />
              <span>Rechnung pausiert: Korrigiere den Eigenbeitrag, dann rechnen wir weiter.</span>
            </p>
          </>
        )}
      </div>
      <a class="avd-rcard__more label" href={detailsHref}>
        {detailsLabel}
        <Icon name="chevron-right" size={16} />
      </a>
    </section>
  );
}
