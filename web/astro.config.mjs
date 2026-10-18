// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://makerlabperu.github.io',
  base: '/guide-builder-skill',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
