import type { ComponentChildren } from 'preact';
import { useId } from 'preact/hooks';
import { Icon } from './Icon';
import '../styles/komponenten/felder.css';

export interface CheckboxProps {
  label: ComponentChildren;
  checked?: boolean;
  /** Fehlt in statischen Vorschauen; in einer Insel setzt sie den neuen Zustand. */
  onChange?: (checked: boolean) => void;
  hint?: ComponentChildren;
  id?: string;
  name?: string;
}

/** Ja/Nein-Frage mit großer Klickfläche; das ganze Label schaltet um. */
export function Checkbox({ label, checked = false, onChange, hint, id, name }: CheckboxProps) {
  const auto = 'cb' + useId();
  const cid = id || auto;
  return (
    <div class="avd-check">
      <label class="avd-check__row" for={cid}>
        <input
          type="checkbox"
          class="avd-check__input"
          id={cid}
          name={name}
          checked={checked}
          onChange={(e) => onChange?.(e.currentTarget.checked)}
          aria-describedby={hint ? `${cid}-hint` : undefined}
        />
        <span class="avd-check__box" aria-hidden="true"><Icon name="check" size={16} /></span>
        <span class="avd-check__label body-sm">{label}</span>
      </label>
      {hint && <p class="avd-field__hint caption avd-check__hint" id={`${cid}-hint`}>{hint}</p>}
    </div>
  );
}
