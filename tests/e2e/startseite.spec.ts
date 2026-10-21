import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { SITE_LIVE } from '../../src/config';

test('Startseite lädt auf Deutsch, noindex passt zu SITE_LIVE', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  const robots = page.locator('meta[name="robots"]');
  if (SITE_LIVE) {
    await expect(robots).toHaveCount(0);
  } else {
    await expect(robots).toHaveAttribute('content', /noindex/);
  }
});

test('Startseite ohne Verstöße gegen WCAG 2.2 AA', async ({ page }) => {
  await page.goto('/');
  const ergebnis = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(ergebnis.violations).toEqual([]);
});
