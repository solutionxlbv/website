import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.solutionxl.nl',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      customPages: [
        'https://www.solutionxl.nl/',
        'https://www.solutionxl.nl/project-en-programmaregie/',
        'https://www.solutionxl.nl/product-ownership/',
        'https://www.solutionxl.nl/release-en-implementatiemanagement/',
        'https://www.solutionxl.nl/interim-versterking/',
      ],
    }),
  ],
  compressHTML: true,
});
