import AxeBuilder from '@axe-core/playwright';
import { expect, type Page } from '@playwright/test';

/** Hell und dunkel, wie sie die Systemeinstellung wählt (prefers-color-scheme). */
export const THEMEN = [
  { name: 'hell', colorScheme: 'light' },
  { name: 'dunkel', colorScheme: 'dark' },
] as const;

export type Thema = (typeof THEMEN)[number];

/** Öffnet eine Seite im gewünschten Thema und wartet auf Schriften und Inseln. */
export async function oeffne(page: Page, pfad: string, thema: Thema = THEMEN[0]) {
  await page.emulateMedia({ colorScheme: thema.colorScheme });
  await page.goto(pfad);
  // Inseln wie der Header verlieren das Attribut ssr, sobald sie aktiv sind
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0);
  await page.evaluate(() => document.fonts.ready);
}

/** Prüft die Seite gegen WCAG 2.2 AA. */
export async function pruefeBarrierefreiheit(page: Page) {
  const ergebnis = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(ergebnis.violations).toEqual([]);
}
