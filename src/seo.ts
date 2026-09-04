import { projectSlugs } from './data/content';

export const siteUrl = 'https://falopes.com.br';
export const defaultSocialImage = '/assets/fabiolopes.png';

export type StructuredData = Record<string, unknown>;

export type SeoConfig = {
  path: string;
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'profile' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  structuredData?: StructuredData[];
  breadcrumbs?: Array<{
    name: string;
    item: string;
  }>;
};

type CaseSeo = {
  slug: string;
  name: string;
  indexable: boolean;
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  image: string;
};

const socialLinks = ['https://www.linkedin.com/in/falopes83/', 'https://medium.com/@falopes83'];

export const caseSeo: CaseSeo[] = [
  {
    slug: 'app-remaza',
    name: 'Aplicativo para gestão de consórcio',
    indexable: true,
    title: 'Aplicativo para gestão de consórcio | Case de Product Design',
    description:
      'Case de Product Design para um aplicativo de consórcio, com jornadas de pagamento, assembleias, ofertas de lance, atendimento e gestão de cotas.',
    ogTitle: 'Aplicativo para gestão de consórcio',
    ogDescription:
      'Conheça o processo de UX e Product Design de um aplicativo criado para simplificar a gestão de consórcios.',
    image: '/assets/projects/hero-app-remaza.webp',
  },
  {
    slug: 'fresto',
    name: 'Fresto — Rede de restaurantes',
    indexable: true,
    title: 'Fresto | UX/UI para rede de restaurantes',
    description:
      'Case de UX/UI para o site do Fresto, destacando unidades, gastronomia, oportunidades profissionais e integração de conteúdo social.',
    image: '/assets/projects/hero-fresto.webp',
  },
  {
    slug: 'moto-remaza',
    name: 'Concessionárias de motos Honda',
    indexable: true,
    title: 'Site para concessionárias de motos Honda | Case de UX',
    description:
      'Case de UX e Product Design para concessionárias de motos Honda, conectando modelos, seminovos, serviços, conteúdos e atendimento em uma experiência responsiva.',
    ogTitle: 'Experiência digital para concessionárias de motos Honda',
    ogDescription:
      'Um ecossistema digital pensado para diferentes perfis de motociclistas e jornadas de compra.',
    image: '/assets/projects/hero-motoremaza.webp',
  },
  {
    slug: 'gamp21',
    name: 'Gamp21 — Parentalidade nas empresas',
    indexable: true,
    title: 'Gamp21 | UX/UI para parentalidade nas empresas',
    description:
      'Case de UX/UI para o Gamp21, organizando conteúdos e serviços de apoio à parentalidade para famílias e empresas.',
    image: '/assets/projects/hero-gamp21.webp',
  },
  {
    slug: 'daitan',
    name: 'Concessionária Honda',
    indexable: true,
    title: 'Redesign de site para concessionária Honda | Case de UX/UI',
    description:
      'Case de UX/UI para uma concessionária Honda, com arquitetura da informação, interfaces responsivas, gestão de conteúdo e geração de oportunidades comerciais.',
    ogTitle: 'Redesign de experiência digital para concessionária Honda',
    ogDescription:
      'Conheça o projeto de redesign de um site automotivo voltado à apresentação de veículos, serviços e atendimento.',
    image: '/assets/projects/hero-daitan.webp',
  },
  {
    slug: 'consorcio-remaza',
    name: 'Consórcio Remaza',
    indexable: true,
    title: 'Consórcio Remaza | Site e simuladores — Case de UX/UI',
    description:
      'Case de UX/UI para o Consórcio Remaza, com site institucional, simuladores, conteúdo e jornadas de conversão integradas ao atendimento comercial.',
    ogTitle: 'Consórcio Remaza — Site e simuladores',
    ogDescription:
      'Conheça o processo de UX/UI aplicado à experiência digital, aos simuladores e à geração de oportunidades comerciais.',
    image: '/assets/projects/hero-consorcio-remaza.webp',
  },
];

export const publicRoutes = ['/', ...projectSlugs.map((slug) => `/projetos/${slug}`)];
export const indexableRoutes = ['/', ...caseSeo.filter((item) => item.indexable).map((item) => `/projetos/${item.slug}`)];

function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function breadcrumbSchema(items: SeoConfig['breadcrumbs']) {
  if (!items?.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}

function homeStructuredData() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Fabio Lopes',
      url: siteUrl,
      image: absoluteUrl(defaultSocialImage),
      jobTitle: 'UX/Product Designer',
      description:
        'UX/Product Designer especializado em produtos digitais, sites, sistemas, aplicativos e consultoria em UX.',
      sameAs: socialLinks,
      knowsAbout: [
        'UX Design',
        'Product Design',
        'UX/UI Design',
        'Arquitetura da Informação',
        'Design de Interfaces',
        'Prototipação no Figma',
        'Consultoria em UX',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Fabio Lopes | UX & Product Designer',
      url: siteUrl,
      inLanguage: 'pt-BR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: 'Portfólio de Fabio Lopes',
      url: siteUrl,
      inLanguage: 'pt-BR',
      mainEntity: {
        '@type': 'Person',
        name: 'Fabio Lopes',
        url: siteUrl,
      },
    },
  ];
}

function caseStructuredData(item: CaseSeo) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: item.name,
      headline: item.title,
      description: item.description,
      url: absoluteUrl(`/projetos/${item.slug}`),
      image: absoluteUrl(item.image),
      creator: {
        '@type': 'Person',
        name: 'Fabio Lopes',
        url: siteUrl,
      },
      inLanguage: 'pt-BR',
    },
  ];
}

export function getSeoConfig(pathname: string): SeoConfig {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (cleanPath === '/') {
    const breadcrumbs = [{ name: 'Home', item: '/' }];

    return {
      path: '/',
      title: 'Fabio Lopes | UX & Product Designer',
      description:
        'Portfólio de Fabio Lopes, UX/Product Designer especializado em produtos digitais, sites, sistemas e aplicativos. Conheça meus projetos e minha atuação em UX.',
      canonical: siteUrl,
      ogType: 'profile',
      ogImage: absoluteUrl(defaultSocialImage),
      twitterCard: 'summary_large_image',
      breadcrumbs,
      structuredData: [...homeStructuredData(), breadcrumbSchema(breadcrumbs)].filter(Boolean) as StructuredData[],
    };
  }

  const caseItem = caseSeo.find((item) => cleanPath === `/projetos/${item.slug}`);

  if (caseItem) {
    const breadcrumbs = [
      { name: 'Home', item: '/' },
      { name: 'Projetos', item: '/#projetos' },
      { name: caseItem.name, item: `/projetos/${caseItem.slug}` },
    ];

    return {
      path: `/projetos/${caseItem.slug}`,
      title: caseItem.title,
      description: caseItem.description,
      canonical: absoluteUrl(`/projetos/${caseItem.slug}`),
      robots: caseItem.indexable ? 'index, follow' : 'noindex, follow',
      ogTitle: caseItem.ogTitle,
      ogDescription: caseItem.ogDescription,
      ogType: 'article',
      ogImage: absoluteUrl(caseItem.image),
      twitterCard: 'summary_large_image',
      breadcrumbs,
      structuredData: caseItem.indexable
        ? ([...caseStructuredData(caseItem), breadcrumbSchema(breadcrumbs)].filter(Boolean) as StructuredData[])
        : [],
    };
  }

  return {
    path: cleanPath,
    title: 'Página não encontrada | Fabio Lopes',
    description:
      'A página solicitada não foi encontrada. Volte para o portfólio de Fabio Lopes ou acesse os projetos de UX/Product Design.',
    canonical: absoluteUrl(cleanPath),
    robots: 'noindex, follow',
    ogType: 'website',
    ogImage: absoluteUrl(defaultSocialImage),
    twitterCard: 'summary',
    structuredData: [],
  };
}

export function getSitemapUrls() {
  return indexableRoutes.map((path) => absoluteUrl(path));
}

export function isPublicRoute(pathname: string) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';
  return publicRoutes.includes(cleanPath);
}

export function isCaseIndexable(slug: string) {
  return caseSeo.find((item) => item.slug === slug)?.indexable ?? false;
}
