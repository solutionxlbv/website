// Single source of truth for the four specialisations: order, numbering, URL and card text.
// Used by the homepage (Expertise.astro) and every service page (DienstLayout.astro),
// so "Specialisatie 01" means the same thing everywhere.
//
// Order reflects the positioning decided on 19-11-2026: engineering leadership first,
// programme management last (the "regie" terms brought traffic that does not lead to assignments).

export interface Specialisatie {
  num: string;
  slug: string;
  href: string;
  title: string; // card title on the homepage
  shortName: string; // breadcrumb and "Andere specialisaties"
  body: string;
  keywords: string[];
}

export const specialisaties: Specialisatie[] = [
  {
    num: '01',
    slug: 'interim-engineering-manager',
    href: '/interim-engineering-manager/',
    title: 'Interim Engineering Manager & Head of Engineering',
    shortName: 'Interim Engineering Manager & Head of Engineering',
    body: 'Tijdelijk leidinggeven aan softwareteams en engineering-organisaties als Head of Engineering, Engineering Manager, Director of Development of Technology Lead. Met focus op teams, productkwaliteit en oplevering.',
    keywords: ['Head of Engineering', 'Engineering Manager', 'Interim'],
  },
  {
    num: '02',
    slug: 'product-ownership',
    href: '/product-ownership/',
    title: 'Product leadership & Product Ownership',
    shortName: 'Product leadership & Product Ownership',
    body: 'Aansturen van multidisciplinaire teams, on- en offshore. Roadmap en backlog vertalen naar releases die tellen, stakeholders managen, en zorgen dat ontwikkelaars, testers, analisten en architecten als één team leveren.',
    keywords: ['Product Owner', 'On/offshore', 'Multidisciplinair'],
  },
  {
    num: '03',
    slug: 'release-management',
    href: '/release-management/',
    title: 'Software delivery & release management',
    shortName: 'Software delivery & release management',
    body: 'Releases tussen meerdere partijen — overheid, system integrator, on/offshore — afgestemd in één roadmap. Stuurinformatie waarop de regiegroep maandelijks bijstuurt op tijd, budget en capaciteit.',
    keywords: ['Release roadmap', 'Multi-partij', 'Stuurinformatie'],
  },
  {
    num: '04',
    slug: 'programma-regie',
    href: '/programma-regie/',
    title: 'IT-programma- en deliveryregie',
    shortName: 'IT-programma- en deliveryregie',
    body: 'Regie op programma\'s waar meerdere teams, leveranciers en stakeholders samenkomen. Inrichten van governance, besluitvorming en escalatielijnen — zodat het programma stuurbaar blijft, ook onder druk.',
    keywords: ['Governance', 'Stuurgroep', 'Multi-vendor'],
  },
];

export const bySlug = (slug: string): Specialisatie => {
  const s = specialisaties.find((x) => x.slug === slug);
  if (!s) throw new Error(`Onbekende specialisatie: ${slug}`);
  return s;
};
