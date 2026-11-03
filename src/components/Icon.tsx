import { h } from 'preact';
import { cx } from './cx';
import { ICONS, type IconName } from './icons';

export type { IconName };

export interface IconProps {
  /** Lucide-Name aus dem Set des Systems. */
  name: IconName;
  /** 16, 20 oder 24 px. */
  size?: 16 | 20 | 24;
  /** Standard: 2 bei 16 px, sonst 1,75. */
  strokeWidth?: number;
  /** Nur für allein stehende Icons: wird zum zugänglichen Namen. */
  label?: string;
  class?: string;
}

/** Ein Lucide-Icon in currentColor. Icons begleiten Text; allein nur für Menü, Schließen, Suche und Abspielen. */
export function Icon({ name, size = 20, strokeWidth, label, class: klasse }: IconProps) {
  return (
    <svg
      class={cx('avd-icon', klasse)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width={strokeWidth ?? (size <= 16 ? 2 : 1.75)}
      stroke-linecap="round"
      stroke-linejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : 'true'}
    >
      {ICONS[name].map(([tag, attrs]) => h(tag, { ...attrs }))}
    </svg>
  );
}
