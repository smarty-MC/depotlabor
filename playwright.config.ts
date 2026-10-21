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
  use: { baseURL: `http://127.0.0.1:${PORT}` },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobil', use: { ...devices['Pixel 9'] } },
  ],
  webServer: {
    // In der CI ist dist/ schon gebaut, lokal baut der Testlauf selbst.
    command: process.env.CI ? vorschau : `npm run build && ${vorschau}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
