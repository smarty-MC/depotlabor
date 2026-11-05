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

test('Platzhalterseite zeigt Titel, Brotkrumen und noindex', async ({ page }) => {
  await page.goto('/foerderung/kinderzulage/');
  await expect(page.getByRole('heading', { level: 1, name: 'Kinderzulage' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'Brotkrumen' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('Vorschauseiten tragen immer noindex', async ({ page }) => {
  await page.goto('/komponenten/statusampel/');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});
