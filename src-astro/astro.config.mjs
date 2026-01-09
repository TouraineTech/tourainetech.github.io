import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap'; // TODO: Enable when more pages exist
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://touraine.tech',
  output: 'static',
  integrations: [],
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
