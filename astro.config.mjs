import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import { siteConfig } from './src/data/config/site';
import programmeEdition from './src/data/source/edition.json';
import { canPublishProgramme, isProgrammePath } from './src/lib/publication';

const programmePublished = canPublishProgramme(siteConfig.phase, siteConfig.edition.year, programmeEdition.year);

export default defineConfig({
  site: 'https://touraine.tech',
  output: 'static',
  integrations: [
    sitemap({
      // Exclut les pages operationnelles (deja en noindex) du sitemap.
      filter: (page) =>
        !/\/(timer|waiting-screen|regie)(\/|$)/.test(new URL(page).pathname) &&
        (programmePublished || !isProgrammePath(new URL(page).pathname)),
    }),
  ],
  vite: {
    plugins: [yaml()],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    }
  }
});
