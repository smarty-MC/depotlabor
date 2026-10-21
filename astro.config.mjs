// @ts-check
import { defineConfig } from 'astro/config';

import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Platzhalter bis zur eigenen Domain (KW 49)
  site: 'https://depotlabor.pages.dev',
  // Leerzeichen zwischen Inline-Elementen behalten (Standard in Astro 7 ist 'jsx')
  compressHTML: true,
  integrations: [preact(), mdx(), sitemap()]
});
