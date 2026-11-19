import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { BLOG_ENABLED } from './src/config.ts';

export default defineConfig({
  site: 'https://www.solutionxl.nl',
  integrations: [
    sitemap({
      // Only URLs that Google may index: no hidden blog while BLOG_ENABLED is false.
      filter: (page) => BLOG_ENABLED || !page.includes('/blog/'),
    }),
  ],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
