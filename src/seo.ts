import { dictionary, Language, projectSlugs } from './data/content';
import {
  contentRoutes,
  getLocalizedPath,
  getRouteInfo,
  htmlLangByLanguage,
  isKnownContentPath,
  supportedLanguages,
} from './languageRouting';

export const siteUrl = 'https://falopes.com.br';
export const defaultSocialImage = '/assets/fabiolopes-real.webp';

export type StructuredData = Record<string, unknown>;

export type SeoConfig = {
  path: string;
  language: Language;
  htmlLang: string;
  title: string;
  description: string;
  canonical: string;
  alternates: Array<{
    hrefLang: string;
    href: string;
  }>;
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

const legacyRoutes = contentRoutes;
const localizedRoutes = supportedLanguages.flatMap((language) =>
  contentRoutes.map((contentPath) => getLocalizedPath(language, contentPath)),
);

export const publicRoutes = [...legacyRoutes, ...localizedRoutes];
export const indexableRoutes = supportedLanguages.flatMap((language) =>
  ['/', ...caseSeo.filter((item) => item.indexable).map((item) => `/projetos/${item.slug}`)].map((contentPath) =>
    getLocalizedPath(language, contentPath),
  ),
);

const homeSeoByLanguage: Record<Language, { title: string; description: string; jobTitle: string; profileName: string }> = {
  pt: {
    title: 'Fabio Lopes | UX & Product Designer',
    description:
      'Portfólio de Fabio Lopes, UX/Product Designer especializado em produtos digitais, sites, sistemas e aplicativos. Conheça meus projetos e minha atuação em UX.',
    jobTitle: 'UX/Product Designer',
    profileName: 'Portfólio de Fabio Lopes',
  },
  en: {
    title: 'Fabio Lopes | UX & Product Designer',
    description:
      'Fabio Lopes portfolio, UX/Product Designer specialized in digital products, websites, systems and apps. Explore projects and UX consulting work.',
    jobTitle: 'UX/Product Designer',
    profileName: 'Fabio Lopes portfolio',
  },
  es: {
    title: 'Fabio Lopes | UX & Product Designer',
    description:
      'Portafolio de Fabio Lopes, UX/Product Designer especializado en productos digitales, sitios, sistemas y aplicaciones. Conoce proyectos y consultoría en UX.',
    jobTitle: 'UX/Product Designer',
    profileName: 'Portafolio de Fabio Lopes',
  },
};

function absoluteUrl(path: string) {
  if (path.startsWith('http')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

function localizedAbsoluteUrl(language: Language, contentPath: string) {
  return absoluteUrl(getLocalizedPath(language, contentPath));
}

function alternateLinks(contentPath: string) {
  return [
    ...supportedLanguages.map((language) => ({
      hrefLang: htmlLangByLanguage[language],
      href: localizedAbsoluteUrl(language, contentPath),
    })),
    {
      hrefLang: 'x-default',
      href: absoluteUrl('/'),
    },
  ];
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

function homeStructuredData(language: Language) {
  const homeSeo = homeSeoByLanguage[language];

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Fabio Lopes',
      url: localizedAbsoluteUrl(language, '/'),
      image: absoluteUrl(defaultSocialImage),
      jobTitle: homeSeo.jobTitle,
      description: homeSeo.description,
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
      url: localizedAbsoluteUrl(language, '/'),
      inLanguage: htmlLangByLanguage[language],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: homeSeo.profileName,
      url: localizedAbsoluteUrl(language, '/'),
      inLanguage: htmlLangByLanguage[language],
      mainEntity: {
        '@type': 'Person',
        name: 'Fabio Lopes',
        url: localizedAbsoluteUrl(language, '/'),
      },
    },
  ];
}

function caseStructuredData(item: CaseSeo, language: Language, contentPath: string, title: string, description: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: item.name,
      headline: title,
      description,
      url: localizedAbsoluteUrl(language, contentPath),
      image: absoluteUrl(item.image),
      creator: {
        '@type': 'Person',
        name: 'Fabio Lopes',
        url: siteUrl,
      },
      inLanguage: htmlLangByLanguage[language],
    },
  ];
}

export function getSeoConfig(pathname: string): SeoConfig {
  const route = getRouteInfo(pathname);
  const cleanPath = route.contentPath;
  const language = route.language ?? 'pt';

  if (cleanPath === '/') {
    const homeSeo = homeSeoByLanguage[language];
    const breadcrumbs = [{ name: 'Home', item: getLocalizedPath(language, '/') }];

    return {
      path: getLocalizedPath(language, '/'),
      language,
      htmlLang: htmlLangByLanguage[language],
      title: homeSeo.title,
      description: homeSeo.description,
      canonical: localizedAbsoluteUrl(language, '/'),
      alternates: alternateLinks('/'),
      ogType: 'profile',
      ogImage: absoluteUrl(defaultSocialImage),
      twitterCard: 'summary_large_image',
      breadcrumbs,
      structuredData: [...homeStructuredData(language), breadcrumbSchema(breadcrumbs)].filter(Boolean) as StructuredData[],
    };
  }

  const caseItem = caseSeo.find((item) => cleanPath === `/projetos/${item.slug}`);

  if (caseItem) {
    const projectIndex = projectSlugs.indexOf(caseItem.slug);
    const translatedProject = dictionary[language].projects[projectIndex];
    const title = language === 'pt' ? caseItem.title : `${translatedProject.title} | UX/Product Design case`;
    const description = language === 'pt' ? caseItem.description : translatedProject.description;
    const breadcrumbs = [
      { name: 'Home', item: getLocalizedPath(language, '/') },
      { name: dictionary[language].projectsIntro.eyebrow, item: `${getLocalizedPath(language, '/')}#projetos` },
      { name: translatedProject.title, item: getLocalizedPath(language, `/projetos/${caseItem.slug}`) },
    ];

    return {
      path: getLocalizedPath(language, `/projetos/${caseItem.slug}`),
      language,
      htmlLang: htmlLangByLanguage[language],
      title,
      description,
      canonical: localizedAbsoluteUrl(language, `/projetos/${caseItem.slug}`),
      alternates: alternateLinks(`/projetos/${caseItem.slug}`),
      robots: caseItem.indexable ? 'index, follow' : 'noindex, follow',
      ogTitle: language === 'pt' ? caseItem.ogTitle : translatedProject.title,
      ogDescription: language === 'pt' ? caseItem.ogDescription : translatedProject.description,
      ogType: 'article',
      ogImage: absoluteUrl(caseItem.image),
      twitterCard: 'summary_large_image',
      breadcrumbs,
      structuredData: caseItem.indexable
        ? ([...caseStructuredData(caseItem, language, `/projetos/${caseItem.slug}`, title, description), breadcrumbSchema(breadcrumbs)].filter(Boolean) as StructuredData[])
        : [],
    };
  }

  return {
    path: route.pathname,
    language,
    htmlLang: htmlLangByLanguage[language],
    title: 'Página não encontrada | Fabio Lopes',
    description:
      'A página solicitada não foi encontrada. Volte para o portfólio de Fabio Lopes ou acesse os projetos de UX/Product Design.',
    canonical: absoluteUrl(cleanPath),
    alternates: isKnownContentPath(cleanPath) ? alternateLinks(cleanPath) : [],
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
  const route = getRouteInfo(pathname);

  if (route.hasExplicitLanguage && !route.language) {
    return false;
  }

  return isKnownContentPath(route.contentPath);
}

export function isCaseIndexable(slug: string) {
  return caseSeo.find((item) => item.slug === slug)?.indexable ?? false;
}
