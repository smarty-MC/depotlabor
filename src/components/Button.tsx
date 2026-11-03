import type { ComponentChildren } from 'preact';
import { cx } from './cx';
import { Icon, type IconName } from './Icon';
import '../styles/komponenten/button.css';

export interface ButtonProps {
  /** primary = Petrol (einmal pro Ansicht) · secondary = Rahmen · ghost = Textbutton · inverse = auf color-deep */
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse';
  /** md = 44 px · sm = 36 px (nur in Tabellen und Headern) */
  size?: 'sm' | 'md';
  /** Mit href wird ein Link (<a>) gerendert. */
  href?: string;
  /** Öffnet in neuem Tab (rel="noopener") und ergänzt einen Hinweis für Screenreader. */
  external?: boolean;
  /** Bezahlter Link: setzt rel="sponsored". Immer zusammen mit AdLabel. */
  sponsored?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
  class?: string;
  children?: ComponentChildren;
  onClick?: (event: MouseEvent) => void;
  'aria-label'?: string;
}

/** Aktion oder Link. Die Beschriftung beginnt mit einem Verb. */
export function Button({
  variant = 'primary', size = 'md', href, external, sponsored, iconLeft, iconRight,
  fullWidth, disabled, type = 'button', class: klasse, children, onClick, 'aria-label': ariaLabel,
}: ButtonProps) {
  const klassen = cx('avd-btn', 'label', `avd-btn--${variant}`, `avd-btn--${size}`, fullWidth && 'avd-btn--full', klasse);
  const iconSize = size === 'sm' ? 16 : 20;
  const inhalt = (
    <>
      {iconLeft && <Icon name={iconLeft} size={iconSize} />}
      <span class="avd-btn__text">{children}</span>
      {iconRight && <Icon name={iconRight} size={iconSize} />}
    </>
  );
  if (href && !disabled) {
    const rel = [external && 'noopener', sponsored && 'sponsored'].filter(Boolean).join(' ') || undefined;
    return (
      <a class={klassen} href={href} target={external ? '_blank' : undefined} rel={rel} onClick={onClick} aria-label={ariaLabel}>
        {inhalt}
        {external && <span class="avd-sr"> (öffnet in neuem Tab)</span>}
      </a>
    );
  }
  return (
    <button class={klassen} type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel}>
      {inhalt}
    </button>
  );
}
