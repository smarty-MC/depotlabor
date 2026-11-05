import { expect, test } from '@playwright/test';
import { THEMEN, oeffne, pruefeBarrierefreiheit } from './hilfen';

// Basislayout: Header, Inhalt und Footer auf der Startseite und auf einer Unterseite mit Brotkrumen
const SEITEN = [
  { name: 'startseite', pfad: '/' },
  { name: 'unterseite', pfad: '/foerderung/kinderzulage/' },
];

for (const seite of SEITEN) {
  for (const thema of THEMEN) {
    test(`Basislayout ${seite.name} (${thema.name})`, async ({ page }) => {
      await oeffne(page, seite.pfad, thema);
      await expect(page).toHaveScreenshot(`${seite.name}-${thema.name}.png`, { fullPage: true });
      await pruefeBarrierefreiheit(page);
    });
  }
}

test.describe('Header ab 1200 px', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'Kategorien und Dropdowns gibt es erst ab 1200 px');
  });

  for (const thema of THEMEN) {
    test(`Dropdown „Förderung“ offen (${thema.name})`, async ({ page }) => {
      await oeffne(page, '/foerderung/kinderzulage/', thema);
      await page.getByRole('button', { name: 'Untermenü Förderung' }).click();
      await expect(page.getByRole('link', { name: 'Kinderzulage' })).toHaveAttribute('aria-current', 'page');
      await expect(page).toHaveScreenshot(`header-dropdown-${thema.name}.png`, { clip: { x: 0, y: 0, width: 1280, height: 360 } });
      await pruefeBarrierefreiheit(page);
    });

    test(`Suchleiste offen (${thema.name})`, async ({ page }) => {
      await oeffne(page, '/', thema);
      await page.getByRole('button', { name: 'Suche öffnen' }).click();
      await expect(page.getByRole('searchbox', { name: 'Suche' })).toBeFocused();
      await expect(page).toHaveScreenshot(`header-suche-${thema.name}.png`, { clip: { x: 0, y: 0, width: 1280, height: 160 } });
    });
  }

  test('Pfeil ↓ springt in die Links, Esc schließt und setzt den Fokus zurück', async ({ page }) => {
    await oeffne(page, '/');
    const toggle = page.getByRole('button', { name: 'Untermenü Förderung' });
    await toggle.focus();
    await page.keyboard.press('ArrowDown');
    await expect(page.getByRole('link', { name: 'Grundzulage' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('Dropdown schließt, wenn der Fokus die Kategorie verlässt', async ({ page }) => {
    await oeffne(page, '/');
    await page.getByRole('button', { name: 'Untermenü Förderung' }).click();
    await expect(page.getByRole('link', { name: 'Grundzulage' })).toBeVisible();
    await page.getByRole('link', { name: 'Anbieter-Vergleich' }).focus();
    await expect(page.getByRole('link', { name: 'Grundzulage' })).toBeHidden();
  });

  test('Skip-Link erscheint mit dem ersten Tab und springt zum Inhalt', async ({ page }) => {
    await oeffne(page, '/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Zum Inhalt springen' });
    await expect(skip).toBeFocused();
    await expect(page).toHaveScreenshot('header-skiplink.png', { clip: { x: 0, y: 0, width: 1280, height: 120 } });
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#inhalt$/);
  });
});

test.describe('Header unter 1200 px', () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobil', 'Die Menü-Schublade gibt es nur unter 1200 px');
  });

  for (const thema of THEMEN) {
    test(`Schublade offen, „Förderung“ aufgeklappt (${thema.name})`, async ({ page }) => {
      await oeffne(page, '/foerderung/kinderzulage/', thema);
      await page.getByRole('button', { name: 'Menü öffnen' }).click();
      await page.getByRole('button', { name: 'Untermenü Förderung' }).click();
      await expect(page.getByRole('link', { name: 'Kinderzulage' })).toHaveAttribute('aria-current', 'page');
      await expect(page).toHaveScreenshot(`header-schublade-${thema.name}.png`);
      await pruefeBarrierefreiheit(page);
    });
  }

  test('Esc schließt die Schublade und setzt den Fokus auf den Menü-Button', async ({ page }) => {
    await oeffne(page, '/');
    await page.getByRole('button', { name: 'Menü öffnen' }).click();
    await expect(page.getByRole('link', { name: 'Zulage berechnen' })).toBeVisible();
    await page.keyboard.press('Escape');
    const burger = page.getByRole('button', { name: 'Menü öffnen' });
    await expect(burger).toBeFocused();
    await expect(burger).toHaveAttribute('aria-expanded', 'false');
  });
});
