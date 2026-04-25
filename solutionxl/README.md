# SolutionXL BV — website v3

Statische Astro-site voor SolutionXL BV. Gehost op Netlify, gericht op project- en programmaregie, product ownership, ketenregie en release- en implementatiemanagement.

## Wat is er veranderd t.o.v. v2

### Positionering: van persoon naar dienst

- **Title**: `SolutionXL BV | Project- en programmaregie, product ownership en interim regie`
- **Meta description**: gericht op dienst en regio (Diemen), onder de 160 tekens
- **H1**: poëtische kernregel behouden (stilistisch hart van de site) — maar nu met een eyebrow-mono-regel erboven (`Senior regie en realisatie in complexe IT- en verandertrajecten`) en een dienstensubkop eronder waar alle vier servicetermen letterlijk staan
- **Over-sectie**: opent nu met "SolutionXL BV is de onafhankelijke consultancypraktijk van Henk van der Weele." — bedrijf eerst, persoon als gezicht

### Nieuwe Diensten-sectie (was: Rollen)

Vier expliciete servicekoppen, exact afgestemd op het verbeterplan:

1. Project- en programmaregie
2. Product ownership & ketenregie
3. Release- en implementatiemanagement
4. Interim versterking — tech leadership

### Consistente contact- en merkidentiteit

- Overal één e-mailadres: `info@solutionxl.nl` (zowel in structured data als in de zichtbare contactsectie)
- Nav-CTA: `Plan een gesprek` (zakelijker dan `Bel Henk`)
- Ticker-keywords aangepast naar de exacte servicetermen

### Structured data

- `@type: ['Organization', 'ProfessionalService']` — beide typen, voor maximale Schema-dekking
- `makesOffer`-array met vier `Service`-objecten, elk gekoppeld aan een dienst uit de Diensten-sectie
- `knowsAbout` uitgebreid met SAFe, Scrum
- `areaServed` als `Country` met naam Nederland
- E-mail, telefoon, adres consistent met de zichtbare inhoud

### Open Graph image

- `/public/og-image.jpg` — 1200×630, huisstijl-consistent (warm off-white, roestbruin accent, serif display), met headline "Senior regie en realisatie in complexe IT- en verandertrajecten"
- `og:image:width`, `og:image:height` en `og:image:alt` toegevoegd aan de meta-tags

## Lokaal draaien

```bash
npm install
npm run dev
```

Site draait op `http://localhost:4321`.

## Build & deploy

```bash
npm run build
```

Netlify pakt `netlify.toml` automatisch op. Publish directory is `dist`, Node 20.

## Na-deploy checklist

- [ ] Google Search Console → **Sitemaps** → voeg `https://www.solutionxl.nl/sitemap-index.xml` toe
- [ ] Google Search Console → **URL-inspectie** → `https://www.solutionxl.nl/` → "Indexering aanvragen"
- [ ] Rich Results Test: `https://search.google.com/test/rich-results?url=https://www.solutionxl.nl/` — verwacht `Organization`, `ProfessionalService`, `Person`, `WebSite`
- [ ] Facebook Sharing Debugger: `https://developers.facebook.com/tools/debug/?q=https://www.solutionxl.nl/` — scrape opnieuw voor OG-image
- [ ] LinkedIn Post Inspector: `https://www.linkedin.com/post-inspector/` — verifieer preview
- [ ] PageSpeed Insights: `https://pagespeed.web.dev/report?url=https://www.solutionxl.nl/` — verwacht groen op alle Core Web Vitals
- [ ] Bing Webmaster Tools: domein toevoegen en importeren uit GSC

## Projectstructuur

```
solutionxl/
├── astro.config.mjs            # site-url, sitemap, HTML-compressie
├── netlify.toml                # security headers, cache, www-redirect
├── package.json
├── public/
│   ├── favicon.svg
│   ├── robots.txt              # verwijst naar sitemap-index.xml
│   ├── og-image.jpg            # 1200x630, huisstijl
│   ├── googlecb8815a1f8eeadfe.html   # GSC verificatie
│   └── assets/
│       └── henk-van-der-weele-cv.pdf
└── src/
    ├── layouts/
    │   └── Base.astro          # title, description, OG, Schema.org JSON-LD
    ├── pages/
    │   └── index.astro
    └── components/
        ├── Ticker.astro        # scrollende servicetermen
        ├── Nav.astro
        ├── Hero.astro          # eyebrow + poëtische H1 + diensten-sub
        ├── Facts.astro
        ├── Over.astro          # SolutionXL als dienstverlener
        ├── Diensten.astro      # 4 services met expliciete koppen (nieuw)
        ├── Bewijs.astro        # tijdlijn opdrachten
        ├── Bestuur.astro       # nevenfuncties
        └── Contact.astro       # info@solutionxl.nl
```

## Mogelijke vervolgstappen

- **Aparte landingspagina's** per dienst (`/project-en-programmaregie`, `/product-ownership`, etc.) met eigen H1, canonical en content — sterkere ranking op specifieke termen, helpt de one-pager een indexeerbare footprint te geven voorbij de homepage.
- **Backlinks** vanuit eigen netwerk: sv Diemen, Sportraad Diemen, Studio DMN — elke vermelding met link naar solutionxl.nl versterkt domeinautoriteit.
- **Google Business Profile** voor lokale zichtbaarheid (Diemen).
