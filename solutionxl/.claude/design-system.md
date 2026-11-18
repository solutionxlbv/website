# Design System — solutionxl.nl

Zakelijke website van SolutionXL BV. Editorial stijl: triple-font-systeem (serif + sans + mono), warm cream met oranje en forest-green accenten, breed en zelfbewust.

**Dit document is bindend voor AI-tools (Frontend Design, Playwright MCP, Claude Code).** Gebruik uitsluitend onderstaande tokens, componenten en patronen. **Verzin geen nieuwe kleuren, fonts, spacing-waarden of componentvarianten.** Als iets ontbreekt voor een nieuwe behoefte: eerst voorstellen, niet eenzijdig toevoegen.

Single source of truth: de `<style is:global>` block in `src/layouts/Base.astro`.

---

## 1. Stack en architectuur

- **Framework**: Astro 5 (static output)
- **Build**: `npm run build` → `dist/`
- **Hosting**: Cloudflare Pages via GitHub `main` branch
- **Canonical host**: `https://www.solutionxl.nl`
- **Repo-submap**: `solutionxl/` (de code zit in een submap, niet in de repo-root)

### Bestanden die er toe doen voor design

| Pad | Rol |
|---|---|
| `src/layouts/Base.astro` | **Globale tokens en basis-styling** (in `<style is:global>` onderaan) |
| `src/layouts/ServiceLayout.astro` | Layout voor service-detailpagina's |
| `src/layouts/DienstLayout.astro` | Layout voor diensten-pagina's |
| `src/components/*.astro` | Herbruikbare componenten (Hero, Nav, Cases, Over, etc.) |
| `src/pages/**/*.astro` | Pagina's (home + 5 service-pagina's + blog) |
| `src/content/blog/*.md` | Blog-content |
| `public/_headers` | Security headers + cache rules voor Cloudflare |
| `astro.config.mjs` | Astro config met `inlineStylesheets: 'auto'` |

Componenten hebben hun **eigen `<style>` blok** (scoped) binnen hun `.astro`-bestand. Globale rules alleen in `Base.astro`.

**Geen Tailwind, geen CSS-in-JS, geen componentbibliotheek.** Pure CSS met custom properties, scoped per component.

---

## 2. Design tokens

Alle globale tokens leven als CSS custom properties in `:root` van `Base.astro` (`<style is:global>` blok). Uitbreiden met expliciete goedkeuring; overschrijven niet.

### Kleuren

| Token | Waarde | Gebruik |
|---|---|---|
| `--bg` | `#faf8f3` | Hoofdachtergrond (warm cream, iets warmer dan weele.nl) |
| `--bg-2` | `#f0ebe0` | Alternatieve achtergrond, hover-states |
| `--ink` | `#141210` | Lopende tekst, koppen, body-text |
| `--ink-2` | `#3d3830` | Secundaire tekst, sub-headlines |
| `--muted` | `#8b8275` | Bijschriften, meta-informatie, tertiaire tekst |
| `--rule` | `#d9d0bd` | Horizontale scheidslijnen, randen |
| `--accent` | `#b04e2a` | **Primair accent** — warm oranje. Koers-wijzers, hover-states, italic highlights |
| `--accent-2` | `#1f3a34` | **Secundair accent** — forest green. Zeer spaarzaam: alleen voor contrast-vlakken of bijzondere nadruk |

**Regels:**
- Twee accenten, maar `--accent-2` wordt bijna nooit gebruikt — reserve voor kritische visuele hiërarchie
- Primair accent (`--accent`) is oranje, niet rood of bruin — ook bij variaties blijven
- Geen donkere modus zonder expliciete opdracht
- `::selection` gebruikt `--ink` als achtergrond en `--bg` als tekst — intact laten

### Typografie — triple-font systeem

Fonts via Google Fonts, geladen in `Base.astro`:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Token | Font | Rol |
|---|---|---|
| `--sans` | **Inter Tight** (400, 500, 600) | Body, UI, de meeste tekst |
| `--serif` | **Instrument Serif** (regular + italic) | Koppen, grote statements, quotes |
| `--mono` | **JetBrains Mono** (400, 500) | Labels, eyebrows, buttons, meta — technische toets |

**Dit triple-font systeem is de signature van de site.** Verwijderen of vereenvoudigen = identiteit stuk. Drie fonts dienen drie rollen: serif is stem, sans is ritme, mono is signatuur.

**Schaal** (gebruik `clamp()` voor fluid typography):

| Element | Grootte |
|---|---|
| Hero `h1` | `clamp(3.5rem, 7.5vw, 9rem)`, serif, `line-height: 0.96`, `letter-spacing: -0.035em` |
| Section `h2` | Serif, verschilt per component (zie component-specs) |
| Hero intro-lead | `clamp(1.8rem, 2.8vw, 3rem)`, serif |
| Body | `16px`, `line-height: 1.55`, sans |
| `.mono` | `0.7rem`, uppercase, `letter-spacing: 0.14em`, `font-weight: 500` |
| `.serif` | `font-weight: 400`, `letter-spacing: -0.01em` |
| `.btn` label | `0.72rem`, mono, uppercase, `letter-spacing: 0.16em` |
| `.btn-alt` label | `0.7rem`, mono, uppercase, `letter-spacing: 0.14em` |

**Italic in serif**: expressie-middel voor nadruk binnen een heading. `color: var(--accent)` gecombineerd met `font-style: italic` — zie Hero component (`.hero-head .it`).

### Spacing

- Globale container padding: `--pad: clamp(1.25rem, 4vw, 3rem)`
- Globale max-width: `--max: 1400px` (breder dan weele.nl)
- Container: `.wrap { max-width: var(--max); margin-inline: auto; padding-inline: var(--pad); }`
- Section padding: meestal `clamp(4rem, 9vw, 8rem)` block-boven, `clamp(3rem, 7vw, 6rem)` block-onder

### Radius

- Buttons: `999px` (pill)
- Geen globale radius-token — card-radius per component, meestal tussen `0` (editorial, hard edges) en `12px`
- Niet mixen: binnen één pagina maximaal twee radius-waarden

### Breakpoints

- Desktop: default
- `@media (max-width: 950px)` — hero-main wordt 1-koloms
- `@media (max-width: 580px)` — CTA-buttons worden column, full-width
- `@media (min-width: 951px)` — quote krijgt `white-space: nowrap`
- `@media (prefers-reduced-motion: reduce)` — alle animaties naar 0.01ms

Geen andere breakpoints introduceren zonder reden.

---

## 3. Componenten

De site is opgebouwd uit onderstaande components in `src/components/`. Elk heeft zijn eigen scoped `<style>` blok.

### Core UI
- `Nav.astro` — top navigatie, sticky
- `Hero.astro` — landing hero met triple-font samenspel, serif-head met italic accent
- `Contact.astro` — contactblok onderaan

### Content
- `Diensten.astro` — overzicht van diensten (home)
- `Expertise.astro` — expertise-blok
- `Over.astro` — over-sectie
- `Sectors.astro` — sector-overzicht
- `Facts.astro` — getallen-blok
- `Bewijs.astro` — bewijs/cases strip
- `Bestuur.astro` — bestuurlijke rollen
- `Cases.astro` — uitgebreide cases
- `Ticker.astro` — bewegende ticker-strip

### Templates
- `ServicePage.astro` — herbruikbare template voor service-detailpagina's (props: `num`, `eyebrow`, `title`, `titleHighlight`, `pitch`, etc.)

### Utility-klassen (globaal in `Base.astro`)
- `.wrap` — container met max-width en padding
- `.mono` — JetBrains Mono, uppercase, wide letter-spacing
- `.serif` — Instrument Serif, lichte letter-spacing
- `.btn` — primary button, donker, pill, mono-label, hover: `translateX(4px)` + accent kleur
- `.btn-alt` — tekst-link stijl met onderstreping, mono-label, hover: accent kleur

### Nieuwe componenten
Een nieuwe component? Volg de conventies:
1. Kebab-case class names (`.hero-main`, `.service-card`)
2. Mobile-first — media queries altijd `max-width`-based voor dekking
3. `clamp()` voor fluid sizing waar schaalbaarheid telt
4. CSS variabelen uit `Base.astro` gebruiken, nooit hardcoded hex of px

---

## 4. Anti-patronen

Niet doen, ook niet met goede bedoelingen:

- ❌ Een derde accentkleur toevoegen
- ❌ Het triple-font systeem vereenvoudigen naar één of twee fonts
- ❌ Mono vervangen door andere monospace (JetBrains Mono is de keuze)
- ❌ Serif vervangen door een "veiligere" webfont
- ❌ Radius mixen naar meer dan twee waarden per pagina
- ❌ Donkere modus introduceren zonder expliciete opdracht
- ❌ Tailwind of andere CSS-framework introduceren
- ❌ Inline `style="..."` in `.astro`-bestanden
- ❌ Icon-libraries (Lucide, Font Awesome) — SVG inline en handgemaakt
- ❌ Bestaande components willekeurig refactoren zonder PR-discussie
- ❌ `--accent-2` (forest green) gebruiken als primair accent — dat is oranje
- ❌ De `.hero-head .it` italic-accent weghalen (dat is de signature van de hero)
- ❌ Scoped styles verplaatsen naar `global.css` — component-scoping is bewust

---

## 5. Instructies voor plugins

### Frontend Design

- Werkt binnen `src/components/*.astro`, `src/layouts/*.astro`, `src/pages/**/*.astro`
- **Houd je aan bovenstaande tokens.** Geen nieuwe kleuren of fontgroottes verzinnen.
- Nieuwe service-pagina's: gebruik `ServicePage.astro` template, niet from scratch bouwen
- Scoped styles in de component zelf; globale styles alleen in `Base.astro` met schriftelijke motivatie
- Content changes OK; structurele changes (nieuwe sections, nieuwe components) eerst voorstellen

### Playwright MCP

Test altijd op drie viewport-breedtes:
- `1440×900` (desktop)
- `768×1024` (tablet)
- `390×844` (mobiel iPhone)

Verplichte checks per build:
- Hero `h1` breekt niet raar — `text-wrap: balance` moet werken, en op mobiel moet de serif leesbaar blijven
- Nav collapst correct onder 950px
- Buttons zijn full-width onder 580px
- Geen horizontal scroll op mobiel (`overflow-x: hidden` op body)
- Alle drie de fonts geladen (Inter Tight, Instrument Serif, JetBrains Mono)
- Meerdere pagina's checken: home + minimaal één service-pagina + blog-index + blog-artikel
- Lighthouse scores: Performance >85 (triple-font kost iets), Accessibility >95, SEO >95

Screenshots opslaan in `/screenshots/` (toevoegen aan `.gitignore` indien nog niet).

---

## 6. SEO en structured data

- JSON-LD staat in `Base.astro` — `ProfessionalService` + `Person` + `WebSite` graphs
- `ProfessionalService` bevat `knowsAbout` array met expertise — bij uitbreiden van expertise synchroon houden
- `taxID: '72779705'` (KVK) — intact laten
- Canonical URL per pagina via `canonical` prop op Base-layout
- Sitemap wordt automatisch gegenereerd door `@astrojs/sitemap` → `/sitemap-index.xml`
- Google Site Verification: `dOd7nMySa35THIavU5tlRNwu9P78xGEZq2aEVGRvzLA` — niet aanraken

---

## 7. Deploy checklist

Voor elke PR naar `main`:

1. `npm run build` lokaal succesvol — `[build] mode: "static"` in log
2. `npm run preview` visueel gecontroleerd op desktop + tablet + mobiel
3. Screenshot-comparison met vorige versie in PR-description (bij visuele wijzigingen)
4. Cloudflare preview-deploy gecontroleerd via `<branch>.solutionxl.pages.dev`
5. Lighthouse-run op preview-URL, scores vergeleken met baseline
6. Blog: nieuwe post? Check dat `BLOG_ENABLED` in `src/config.ts` op `true` staat (anders wordt artikel niet gebuild)

Bij een visuele regressie of score-verslechtering: NIET mergen. Fix of trek branch in.

---

## 8. Repo-hygiëne

Herinnering (november 2026 opschoning):
- Code zit in submap `solutionxl/` — niet in repo-root
- Build commands worden gedraaid vanuit `solutionxl/` (Cloudflare Root Directory)
- Géén root-level duplicates van `src/` bestanden (die zijn verwijderd)
- Géén `netlify.toml` (migratie naar Cloudflare is definitief)
- Build-logs NOOIT committen (zie `.gitignore`)
