import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Nur Unit-Tests; die Browser-Tests in tests/e2e laufen mit Playwright.
    include: ['src/**/*.test.ts'],
  },
});
