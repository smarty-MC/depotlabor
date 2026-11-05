import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
// --ignore-lock hält den Server im Vordergrund. Ohne den Schalter startet Astro 7 ihn im
// Hintergrund, sobald ein KI-Agent wie Claude Code den Test aufruft, und Playwright bricht ab.
const vorschau = `npm run preview -- --host 127.0.0.1 --port ${PORT} --ignore-lock`;

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  // Screenshots entstehen und vergleichen sich nur im Playwright-Container (npm run test:e2e:container, CI),
  // deshalb ohne Betriebssystem im Dateinamen.
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{-projectName}{ext}',
  expect: { toHaveScreenshot: { animations: 'disabled', caret: 'hide', scale: 'css' } },
  use: { baseURL: `http://127.0.0.1:${PORT}` },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobil', use: { ...devices['Pixel 9'] } },
  ],
  webServer: {
    // In der CI ist dist/ schon gebaut, lokal baut der Testlauf selbst.
    command: process.env.CI ? vorschau : `npm run build && ${vorschau}`,
    // Mit den Vorschauseiten der Komponenten (/komponenten/<name>/) für die Screenshot-Tests
    env: { KOMPONENTEN_VORSCHAU: '1' },
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
