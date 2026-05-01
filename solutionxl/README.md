# SolutionXL — Henk van der Weele

Persoonlijke site van Henk van der Weele, directeur SolutionXL BV. Astro · static · Cloudflare Pages.

## Stack

- **Astro 5** — static site generator
- **Sitemap**: `@astrojs/sitemap`
- **Structured data**: `ProfessionalService` + `Person` JSON-LD
- **Hosting**: Cloudflare Pages (via GitHub)

## Lokaal draaien

```bash
npm install
npm run dev
```

`http://localhost:4321`

## Build

```bash
npm run build
```

Output in `dist/`.

## Deploy — Cloudflare Pages

Code staat op GitHub: `solutionxlbv/website`, in submap `solutionxl/`.

### Cloudflare Pages build-instellingen

| Veld | Waarde |
|---|---|
| Project name | `solutionxl` |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| **Root directory** | `solutionxl` |

### Environment variables

| Naam | Waarde |
|---|---|
| `NODE_VERSION` | `20` |

### Belangrijk

Bij Cloudflare-prompt _"Configure this project for the Cloudflare adapter?"_ → **NEE / skip**.

Build-output moet `static` blijven, niet `server`. Geen `@astrojs/cloudflare` adapter installeren.

In de build-logs verwacht je:

```
[build] mode: "static"
[build] directory: /opt/buildhome/repo/solutionxl/dist/
```

## Cloudflare-specifieke bestanden

In `public/` (worden 1-op-1 mee gepubliceerd):

- **`_headers`** — security headers (HSTS, X-Frame-Options, etc.) en `immutable` cache voor `/assets/*`, `*.css`, `*.woff2`
- **`_redirects`** — 301 redirect `solutionxl.nl` → `www.solutionxl.nl`
- **`robots.txt`** — sitemap-verwijzing
- **`googlecb8815a1f8eeadfe.html`** — Google Search Console verificatie

## Custom domain

1. Cloudflare Pages → project `solutionxl` → **Custom domains**
2. Add `www.solutionxl.nl` en `solutionxl.nl`
3. DNS-records worden automatisch aangemaakt (CNAME naar `<project>.pages.dev`)
4. SSL via Cloudflare — automatisch

Apex → www redirect zit in `public/_redirects`.

## Google Search Console

Verificatie staat dubbel ingericht:

- Bestand: `/public/googlecb8815a1f8eeadfe.html`
- Meta-tag in `Base.astro`: `dOd7nMySa35THIavU5tlRNwu9P78xGEZq2aEVGRvzLA`

Na deploy: GSC → **Verify** → sitemap indienen via `https://www.solutionxl.nl/sitemap-index.xml`.
