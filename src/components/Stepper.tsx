import type { ComponentChildren } from 'preact';
import { useId } from 'preact/hooks';
import { Icon } from './Icon';
import '../styles/komponenten/felder.css';

export interface StepperProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  /** Fehlt in statischen Vorschauen; in einer Insel setzt sie den neuen Wert. */
  onChange?: (value: number) => void;
  hint?: ComponentChildren;
}

/** Kleine ganze Zahlen (z. B. Anzahl Kinder) mit Minus und Plus. */
export function Stepper({ label, value, min = 0, max = 10, step = 1, onChange, hint }: StepperProps) {
  const id = 'st' + useId();
  return (
    <div class="avd-stepper" role="group" aria-labelledby={`${id}-l`} aria-describedby={hint ? `${id}-hint` : undefined}>
      <span class="label" id={`${id}-l`}>{label}</span>
      <div class="avd-stepper__ctrl">
        <button
          type="button"
          class="avd-stepper__btn"
          onClick={() => onChange?.(Math.max(min, value - step))}
          disabled={value <= min}
          aria-label={`${label}: weniger`}
        >
          <Icon name="minus" size={20} />
        </button>
        <output class="avd-stepper__val figure-md avd-num" aria-live="polite">{value}</output>
        <button
          type="button"
          class="avd-stepper__btn"
          onClick={() => onChange?.(Math.min(max, value + step))}
          disabled={value >= max}
          aria-label={`${label}: mehr`}
        >
          <Icon name="plus" size={20} />
        </button>
      </div>
      {hint && <p class="avd-field__hint caption" id={`${id}-hint`}>{hint}</p>}
    </div>
  );
}
