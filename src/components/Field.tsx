import { cloneElement, isValidElement, type ComponentChildren, type InputHTMLAttributes, type VNode } from 'preact';
import { useId } from 'preact/hooks';
import { cx } from './cx';
import { Icon } from './Icon';
import '../styles/komponenten/felder.css';

export interface FieldProps {
  /** Sichtbares Label – immer vorhanden, nie nur Platzhalter. */
  label: ComponentChildren;
  hint?: ComponentChildren;
  /** Fehlermeldung: sagt, was zu tun ist. Setzt aria-invalid am Feld. */
  error?: ComponentChildren;
  optional?: boolean;
  id?: string;
  /** Genau ein Bedienelement, z. B. <Input>. */
  children: VNode;
  class?: string;
}

/** Label, Hinweis und Fehler um ein Bedienelement; verknüpft alles per id und aria. */
export function Field({ label, hint, error, optional, id, children, class: klasse }: FieldProps) {
  const auto = 'f' + useId();
  const fid = id || auto;
  const hintId = hint ? `${fid}-hint` : undefined;
  const errId = error ? `${fid}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(' ') || undefined;
  const control = isValidElement(children)
    ? cloneElement(children, { id: fid, 'aria-describedby': describedBy, 'aria-invalid': error ? 'true' : undefined })
    : children;
  return (
    <div class={cx('avd-field', Boolean(error) && 'is-invalid', klasse)}>
      <label class="avd-field__label label" for={fid}>
        {label}
        {optional && <span class="avd-field__opt"> (optional)</span>}
      </label>
      {control}
      {hint && <p class="avd-field__hint caption" id={hintId}>{hint}</p>}
      {error && (
        <p class="avd-field__error caption" id={errId} role="alert">
          <Icon name="circle-alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/** Props des Textfelds (type="text"); weitere Typen kommen dazu, sobald ein Formular sie braucht. */
export interface InputProps {
  value?: string;
  name?: string;
  placeholder?: string;
  inputmode?: 'text' | 'decimal' | 'numeric' | 'email' | 'search';
  autocomplete?: string;
  disabled?: boolean;
  onInput?: InputHTMLAttributes<HTMLInputElement>['onInput'];
  onBlur?: InputHTMLAttributes<HTMLInputElement>['onBlur'];
  /** Setzt Field per cloneElement */
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: 'true';
  /** Text vor dem Wert, z. B. „ab“ */
  prefix?: ComponentChildren;
  /** Einheit nach dem Wert, z. B. „€“ oder „%“ */
  suffix?: ComponentChildren;
  size?: 'sm' | 'md';
  class?: string;
}

/** Textfeld mit optionaler Einheit. Schriftgröße 17 px, damit iOS nicht zoomt. */
export function Input({ prefix, suffix, size = 'md', class: klasse, ...rest }: InputProps) {
  return (
    <span class={cx('avd-input', size === 'sm' && 'avd-input--sm', klasse)}>
      {prefix && <span class="avd-input__affix avd-input__affix--pre body-sm">{prefix}</span>}
      <input class="avd-input__el body" type="text" {...rest} />
      {suffix && <span class="avd-input__affix body-sm">{suffix}</span>}
    </span>
  );
}
