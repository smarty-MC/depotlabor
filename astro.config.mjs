// @ts-check
import { readdirSync } from 'node:fs';
import { defineConfig, fontProviders } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

/**
 * Vorschauseiten der Komponenten aus src/vorschau unter /komponenten/<name>/.
 * Sie zeigen erfundene Beispielwerte und entstehen deshalb nur im Testbuild (KOMPONENTEN_VORSCHAU=1),
 * nie auf der echten Seite.
 * @type {import('astro').AstroIntegration}
 */
const komponentenVorschau = {
  name: 'komponenten-vorschau',
  hooks: {
    'astro:config:setup': ({ config, injectRoute }) => {
      if (process.env.KOMPONENTEN_VORSCHAU !== '1') return;
      const ordner = new URL('./src/vorschau/', config.root);
      for (const datei of readdirSync(ordner)) {
        if (!datei.endsWith('.astro') || datei.startsWith('_')) continue;
        injectRoute({ pattern: `/komponenten/${datei.slice(0, -'.astro'.length)}`, entrypoint: new URL(datei, ordner) });
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Platzhalter bis zur eigenen Domain (KW 49)
  site: 'https://depotlabor.pages.dev',
  // Leerzeichen zwischen Inline-Elementen behalten (Standard in Astro 7 ist 'jsx')
  compressHTML: true,
  // Schriften aus dem Design System, selbst gehostet (keine Anfrage an Google)
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Figtree',
      cssVariable: '--font-text',
      fallbacks: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      options: {
        variants: [
          { src: ['./src/assets/fonts/Figtree-Variable.woff2'], weight: '300 900', style: 'normal' },
          { src: ['./src/assets/fonts/Figtree-Italic-Variable.woff2'], weight: '300 900', style: 'italic' },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Bricolage Grotesque',
      cssVariable: '--font-display',
      fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      options: {
        variants: [{ src: ['./src/assets/fonts/BricolageGrotesque-Variable.woff2'], weight: '200 800', style: 'normal' }],
      },
    },
  ],
  integrations: [
    preact(),
    mdx(),
    sitemap({ filter: (seite) => !seite.includes('/komponenten/') }),
    komponentenVorschau,
  ],
});
