# SolutionXL — Henk van der Weele

Persoonlijke site van Henk van der Weele, directeur SolutionXL BV. Astro · SEO-geoptimaliseerd · gehost op **Cloudflare Pages**.

## Inhoud

- **Hero** — positionering met H1 + keyword-subtitel
- **Facts** — 40+ jr / 7+ sectoren / 60 ontwikkelaars / 24 mensen
- **Sectoren** — typografische strook
- **Expertise** — 4 specialisaties (regie, programma & projectsturing, interim director-rollen, Product Ownership)
- **Cases** — 3 cases met Context · Rol · Aanpak · Resultaat
- **Track record** — volledige tijdlijn 2009–heden
- **Over** — persoonlijk portret met mantra
- **Bestuur** — sv Diemen, Sportraad, Studio DMN
- **Contact** — pitch + probleem-herkenning

## Stack

- **Astro 5** — static site generator
- **Fonts** — Instrument Serif + Inter Tight + JetBrains Mono
- **Sitemap** — `@astrojs/sitemap` automatisch
- **Structured data** — `ProfessionalService` + `Person` JSON-LD

## Lokaal draaien

```bash
npm install
npm run dev
```

Site draait op `http://localhost:4321`.

## Build

```bash
npm run build
```

Output in `dist/`.

## Deploy naar Cloudflare Pages

### Methode 1 — Git (aanbevolen)

1. Push deze repo naar GitHub of GitLab.
2. Login [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Selecteer je repo. Cloudflare detecteert Astro automatisch:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
4. Save and Deploy.

### Methode 2 — Direct upload

```bash
npm install && npm run build
```

Dashboard → Pages → **Upload assets** → sleep `dist/` erin.

### Custom domain `www.solutionxl.nl`

1. Cloudflare Pages → je project → **Custom domains** → **Set up a custom domain**.
2. Voer `www.solutionxl.nl` in.
3. Doe hetzelfde voor `solutionxl.nl` (apex).

DNS-records worden automatisch geregeld als je domain bij Cloudflare staat. Bij een externe registrar krijg je instructies wat je moet invoeren.

### Apex naar www redirect (`solutionxl.nl` → `www.solutionxl.nl`)

Dit gaat **niet** via een `_redirects` bestand bij Cloudflare Pages. Inrichten via een Bulk Redirect of Redirect Rule in het Cloudflare-dashboard:

1. **Rules** → **Redirect Rules** → **Create rule**.
2. Naam: `Redirect apex to www`.
3. When incoming requests match: **Custom filter expression**.
   - Field: `Hostname`, Operator: `equals`, Value: `solutionxl.nl`
4. Then: **Static**, Type: **301 (Permanent)**, URL: `https://www.solutionxl.nl${http.request.uri}`
5. Save → Deploy.

## Cloudflare Pages config (in `/public/`)

- **`_headers`** — security headers + cache-control voor assets, fonts, CSS
- **`googlecb8815a1f8eeadfe.html`** — Google Search Console verificatie (bestand)

De Search Console verificatie staat ook als meta-tag in `<head>` van Base.astro.

## SEO-baseline

- **Title** (59 chars): "SolutionXL | Interim management & IT-regie | Henk v/d Weele"
- **Meta-description** (154 chars): keywords vooraan, sectoren erin
- **H1** in twee delen: poëzie-zin + keyword-subtitel binnen één `<h1>`
- **Schema.org** `ProfessionalService` + `Person` voor rich results
- **Open Graph** + Twitter Cards
- **Geo-meta** voor Diemen / NL-NH
- **Sitemap** `/sitemap-index.xml` automatisch

## Na deploy — checklist

- [x] CV PDF aanwezig: `/public/assets/henk-van-der-weele-cv.pdf`
- [ ] OG image (1200×630 JPG) toevoegen: `/public/og-image.jpg`
- [ ] Search Console — sitemap indienen op `https://www.solutionxl.nl/sitemap-index.xml`
- [ ] Cloudflare Redirect Rule voor apex → www activeren
- [ ] Test of `https://solutionxl.nl` doorstuurt naar `https://www.solutionxl.nl`
- [ ] Test of `https://www.solutionxl.nl/sitemap-index.xml` werkt

## Structuur

```
solutionxl/
├── astro.config.mjs
├── package.json
├── public/
│   ├── _headers                                # Cloudflare security/cache headers
│   ├── assets/henk-van-der-weele-cv.pdf
│   ├── favicon.svg
│   ├── googlecb8815a1f8eeadfe.html             # GSC verificatie
│   └── robots.txt
└── src/
    ├── layouts/Base.astro
    ├── components/
    │   ├── Ticker.astro
    │   ├── Nav.astro
    │   ├── Hero.astro
    │   ├── Facts.astro
    │   ├── Sectors.astro
    │   ├── Expertise.astro
    │   ├── Cases.astro
    │   ├── Bewijs.astro
    │   ├── Over.astro
    │   ├── Bestuur.astro
    │   └── Contact.astro
    └── pages/index.astro
```

## Updaten

- **Huidige rol** in hero: `src/components/Hero.astro` — eerste regel met `class="current"`
- **Cases**: `src/components/Cases.astro` — `cases` array bovenin
- **Expertise**: `src/components/Expertise.astro` — `expertises` array
- **Track record**: `src/components/Bewijs.astro` — `timeline` array
