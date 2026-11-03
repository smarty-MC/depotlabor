import { expect, test } from '@playwright/test';
import { THEMEN, oeffne, pruefeBarrierefreiheit } from './hilfen';

// Vorschauseiten aus src/vorschau, je mit allen Zuständen der Komponente
const VORSCHAUEN = ['bausteine', 'statusampel', 'sourcenote', 'adlabel', 'providercard', 'resultcard'];

for (const name of VORSCHAUEN) {
  for (const thema of THEMEN) {
    test(`${name} sieht aus wie im Design (${thema.name}) und ist barrierefrei`, async ({ page }) => {
      await oeffne(page, `/komponenten/${name}/`, thema);
      await expect(page.getByTestId('vorschau')).toHaveScreenshot(`${name}-${thema.name}.png`);
      await pruefeBarrierefreiheit(page);
    });
  }
}

test.describe('AdLabel', () => {
  for (const thema of THEMEN) {
    test(`Erklärung öffnet per Klick und schließt mit Esc (${thema.name})`, async ({ page }) => {
      await oeffne(page, '/komponenten/adlabel/', thema);
      const panel = page.locator('.avd-ad__pop').first();
      await expect(panel).toBeHidden();

      await page.getByRole('button', { name: 'Was bedeutet „Affiliate-Link“?' }).click();
      await expect(panel).toBeVisible();
      await expect(panel).toContainText('Provision');
      await expect(page.getByTestId('vorschau')).toHaveScreenshot(`adlabel-offen-${thema.name}.png`);

      await page.keyboard.press('Escape');
      await expect(panel).toBeHidden();
    });
  }

  test('Erklärung schließt mit Klick daneben', async ({ page }) => {
    await oeffne(page, '/komponenten/adlabel/');
    const panel = page.locator('.avd-ad__pop').first();
    await page.getByRole('button', { name: 'Was bedeutet „Affiliate-Link“?' }).click();
    await expect(panel).toBeVisible();
    await page.getByRole('heading', { level: 1 }).click();
    await expect(panel).toBeHidden();
  });
});

test('SourceNote warnt erst bei einem Stand älter als 30 Tage', async ({ page }) => {
  await oeffne(page, '/komponenten/sourcenote/');
  await expect(page.locator('.avd-srcnote')).toHaveCount(2);
  await expect(page.locator('.avd-stale')).toHaveCount(1);
  await expect(page.locator('.avd-srcnote').nth(1)).toContainText('Stand älter als 30 Tage');
});
