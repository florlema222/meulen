// Internationalization (i18n) for the Meulen site.
//
// Pure data + helpers only — NO `fs` or server-only imports here, so this module
// can be imported from both server components (data loaders) and client
// components (cards). Spanish ('es') is the default locale and lives at the site
// root; English ('en') and Portuguese ('pt') live under /en/ and /pt/.

export const locales = ['es', 'en', 'pt'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'es'

/** Short label shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  pt: 'PT',
}

/** `Intl` locale used for date/number formatting. */
export const dateLocale: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en-US',
  pt: 'pt-BR',
}

/** URL prefix for a locale ('' for the default locale, which lives at root). */
export function localeHref(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`
}

/**
 * Pick the value of `field` for `locale` from a frontmatter `data` object,
 * falling back to the default-locale value when a translation is missing or
 * empty. Translations are stored as nested objects keyed by locale, e.g.
 *   en: { title: '...', summary: '...' }
 */
export function pickLocalized(
  data: Record<string, unknown>,
  field: string,
  locale: Locale
): unknown {
  if (locale === defaultLocale) return data[field]
  const translated = (data[locale] as Record<string, unknown> | undefined)?.[field]
  if (translated !== undefined && translated !== null && translated !== '') {
    return translated
  }
  return data[field]
}

/** Map a controlled-vocabulary value (stored in Spanish) to the active locale. */
export function localizeVocab(
  value: string,
  vocab: Record<string, string>,
  locale: Locale
): string {
  if (locale === defaultLocale) return value
  return vocab[value] ?? value
}

export interface Dictionary {
  nav: {
    nosotros: string
    queHacemos: string
    publicaciones: string
    eventos: string
    noticias: string
  }
  hero: {
    tagline: string
    faculty: string
    university: string
  }
  about: {
    title: string
    p1: string
    p2: string
  }
  whatWeDo: {
    title: string
    intro: string
    axes: { title: string; description: string }[]
  }
  extension: {
    title: string
    p1: string
    p2: string
    mapEmpty: string
  }
  publications: {
    title: string
    empty: string
    showing: string // uses {shown} and {total} placeholders
    featured: string
    view: string
  }
  events: {
    title: string
    empty: string
    register: string
    timeSuffix: string
  }
  news: {
    title: string
    empty: string
    readMore: string
    by: string
  }
  footer: {
    navigation: string
    contact: string
    social: string
    location: string
    rights: string
  }
  meta: {
    title: string
    description: string
  }
  /** Maps the Spanish publication-type vocabulary to the active locale. */
  publicationTypes: Record<string, string>
  /** Maps the Spanish event-type vocabulary to the active locale. */
  eventTypes: Record<string, string>
}

const es: Dictionary = {
  nav: {
    nosotros: 'Nosotros',
    queHacemos: 'Qué Hacemos',
    publicaciones: 'Publicaciones',
    eventos: 'Eventos',
    noticias: 'Noticias',
  },
  hero: {
    tagline:
      'Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.',
    faculty: 'Facultad de Ciencias Jurídicas y Sociales',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'Nosotros',
    p1: 'Meulen es un grupo interdisciplinario de investigación con sede en el Centro de Investigaciones de la Facultad de Ciencias Jurídicas y Sociales de la Universidad Nacional del Litoral (UNL). Bajo la dirección de la Dra. María Valeria Berros y el Dr. Nicolás Cordini, nuestro equipo ha consolidado una trayectoria dedicada a la renovación y profundización de los aportes jurídicos sobre la crisis ecológica en clave latinoamericana.',
    p2: 'Nuestro equipo está integrado por profesionales de la antropología, historia, ciencia política, sociología y diversas áreas del derecho, unidos por la necesidad de analizar las innovaciones jurídicas que emergen en nuestra región ante la crisis ambiental global.',
  },
  whatWeDo: {
    title: 'Qué Hacemos',
    intro:
      'Investigamos las tensiones y diálogos entre tres grandes ejes o «entramados» que definen la realidad ecológica actual:',
    axes: [
      {
        title: 'Derechos de la Naturaleza',
        description:
          'Analizamos el «giro ecocéntrico» y el reconocimiento de ecosistemas y animales como sujetos de derecho.',
      },
      {
        title: 'Derecho a un Ambiente Sano',
        description:
          'Estudiamos la implementación del Acuerdo de Escazú y el fortalecimiento del acceso a la justicia ambiental.',
      },
      {
        title: 'Derecho del Extractivismo',
        description:
          'Indagamos en las regulaciones que viabilizan la explotación de recursos y generan resistencias sociales en los territorios.',
      },
    ],
  },
  extension: {
    title: 'Extensión',
    p1: 'Realizamos extensión universitaria para robustecer el acceso a la justicia ambiental en localidades de la provincia de Santa Fe.',
    p2: 'Hacé click en los marcadores del mapa para ver las localidades visitadas y los acampes realizados.',
    mapEmpty:
      'Las localidades visitadas aparecerán aquí una vez que se agreguen desde el panel de administración.',
  },
  publications: {
    title: 'Publicaciones',
    empty:
      'Las publicaciones aparecerán aquí una vez que se agreguen desde el panel de administración.',
    showing: 'Mostrando {shown} de {total} publicaciones',
    featured: 'Destacada',
    view: 'Ver publicación →',
  },
  events: {
    title: 'Próximos Eventos',
    empty: 'Próximamente anunciaremos nuestros eventos y actividades.',
    register: 'Inscribirse',
    timeSuffix: ' hs',
  },
  news: {
    title: 'Noticias',
    empty: 'Mantente al tanto de las novedades del Proyecto Meulen.',
    readMore: 'Leer más',
    by: 'Por',
  },
  footer: {
    navigation: 'Navegación',
    contact: 'Contacto',
    social: 'Redes Sociales',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
  },
  meta: {
    title: 'Proyecto Meulen',
    description:
      'Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.',
  },
  publicationTypes: {},
  eventTypes: {},
}

const en: Dictionary = {
  nav: {
    nosotros: 'About Us',
    queHacemos: 'What We Do',
    publicaciones: 'Publications',
    eventos: 'Events',
    noticias: 'News',
  },
  hero: {
    tagline:
      'We research socio-ecological justices and injustices from a Latin American and interdisciplinary perspective.',
    faculty: 'Faculty of Legal and Social Sciences',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'About Us',
    p1: 'Meulen is an interdisciplinary research group based at the Research Centre of the Faculty of Legal and Social Sciences of the Universidad Nacional del Litoral (UNL). Under the direction of Dr. María Valeria Berros and Dr. Nicolás Cordini, our team has built a track record dedicated to renewing and deepening legal contributions on the ecological crisis from a Latin American standpoint.',
    p2: 'Our team brings together professionals from anthropology, history, political science, sociology and various fields of law, united by the need to analyze the legal innovations emerging in our region in response to the global environmental crisis.',
  },
  whatWeDo: {
    title: 'What We Do',
    intro:
      'We study the tensions and dialogues among three major axes, or "frameworks", that define today’s ecological reality:',
    axes: [
      {
        title: 'Rights of Nature',
        description:
          'We analyze the "ecocentric turn" and the recognition of ecosystems and animals as subjects of rights.',
      },
      {
        title: 'Right to a Healthy Environment',
        description:
          'We study the implementation of the Escazú Agreement and the strengthening of access to environmental justice.',
      },
      {
        title: 'Law of Extractivism',
        description:
          'We investigate the regulations that enable resource exploitation and generate social resistance across territories.',
      },
    ],
  },
  extension: {
    title: 'Outreach',
    p1: 'We carry out university outreach to strengthen access to environmental justice in towns across the province of Santa Fe.',
    p2: 'Click the map markers to see the towns we have visited and the field camps held.',
    mapEmpty: 'Visited towns will appear here once they are added from the admin panel.',
  },
  publications: {
    title: 'Publications',
    empty: 'Publications will appear here once they are added from the admin panel.',
    showing: 'Showing {shown} of {total} publications',
    featured: 'Featured',
    view: 'View publication →',
  },
  events: {
    title: 'Upcoming Events',
    empty: 'We will announce our events and activities soon.',
    register: 'Register',
    timeSuffix: '',
  },
  news: {
    title: 'News',
    empty: 'Stay up to date with news from Proyecto Meulen.',
    readMore: 'Read more',
    by: 'By',
  },
  footer: {
    navigation: 'Navigation',
    contact: 'Contact',
    social: 'Social Media',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
  },
  meta: {
    title: 'Proyecto Meulen',
    description:
      'We research socio-ecological justices and injustices from a Latin American and interdisciplinary perspective.',
  },
  publicationTypes: {
    'Artículo': 'Article',
    'Libro': 'Book',
    'Capítulo de Libro': 'Book Chapter',
    'Paper': 'Paper',
    'Tesis': 'Thesis',
    'Otro': 'Other',
  },
  eventTypes: {
    'Seminario': 'Seminar',
    'Taller': 'Workshop',
    'Conferencia': 'Conference',
    'Webinar': 'Webinar',
    'Curso': 'Course',
    'Otro': 'Other',
  },
}

const pt: Dictionary = {
  nav: {
    nosotros: 'Sobre Nós',
    queHacemos: 'O Que Fazemos',
    publicaciones: 'Publicações',
    eventos: 'Eventos',
    noticias: 'Notícias',
  },
  hero: {
    tagline:
      'Investigamos justiças e injustiças socioecológicas com uma perspectiva latino-americana e interdisciplinar.',
    faculty: 'Faculdade de Ciências Jurídicas e Sociais',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'Sobre Nós',
    p1: 'Meulen é um grupo interdisciplinar de pesquisa sediado no Centro de Pesquisas da Faculdade de Ciências Jurídicas e Sociais da Universidad Nacional del Litoral (UNL). Sob a direção da Dra. María Valeria Berros e do Dr. Nicolás Cordini, nossa equipe consolidou uma trajetória dedicada à renovação e ao aprofundamento das contribuições jurídicas sobre a crise ecológica em chave latino-americana.',
    p2: 'Nossa equipe é integrada por profissionais da antropologia, história, ciência política, sociologia e diversas áreas do direito, unidos pela necessidade de analisar as inovações jurídicas que emergem em nossa região diante da crise ambiental global.',
  },
  whatWeDo: {
    title: 'O Que Fazemos',
    intro:
      'Investigamos as tensões e diálogos entre três grandes eixos ou «tramas» que definem a realidade ecológica atual:',
    axes: [
      {
        title: 'Direitos da Natureza',
        description:
          'Analisamos o «giro ecocêntrico» e o reconhecimento de ecossistemas e animais como sujeitos de direito.',
      },
      {
        title: 'Direito a um Ambiente Saudável',
        description:
          'Estudamos a implementação do Acordo de Escazú e o fortalecimento do acesso à justiça ambiental.',
      },
      {
        title: 'Direito do Extrativismo',
        description:
          'Investigamos as regulações que viabilizam a exploração de recursos e geram resistências sociais nos territórios.',
      },
    ],
  },
  extension: {
    title: 'Extensão',
    p1: 'Realizamos extensão universitária para fortalecer o acesso à justiça ambiental em localidades da província de Santa Fe.',
    p2: 'Clique nos marcadores do mapa para ver as localidades visitadas e os acampamentos realizados.',
    mapEmpty:
      'As localidades visitadas aparecerão aqui assim que forem adicionadas pelo painel de administração.',
  },
  publications: {
    title: 'Publicações',
    empty: 'As publicações aparecerão aqui assim que forem adicionadas pelo painel de administração.',
    showing: 'Exibindo {shown} de {total} publicações',
    featured: 'Destaque',
    view: 'Ver publicação →',
  },
  events: {
    title: 'Próximos Eventos',
    empty: 'Em breve anunciaremos nossos eventos e atividades.',
    register: 'Inscrever-se',
    timeSuffix: 'h',
  },
  news: {
    title: 'Notícias',
    empty: 'Fique por dentro das novidades do Proyecto Meulen.',
    readMore: 'Ler mais',
    by: 'Por',
  },
  footer: {
    navigation: 'Navegação',
    contact: 'Contato',
    social: 'Redes Sociais',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
  },
  meta: {
    title: 'Proyecto Meulen',
    description:
      'Investigamos justiças e injustiças socioecológicas com uma perspectiva latino-americana e interdisciplinar.',
  },
  publicationTypes: {
    'Artículo': 'Artigo',
    'Libro': 'Livro',
    'Capítulo de Libro': 'Capítulo de Livro',
    'Paper': 'Paper',
    'Tesis': 'Tese',
    'Otro': 'Outro',
  },
  eventTypes: {
    'Seminario': 'Seminário',
    'Taller': 'Oficina',
    'Conferencia': 'Conferência',
    'Webinar': 'Webinar',
    'Curso': 'Curso',
    'Otro': 'Outro',
  },
}

const dictionaries: Record<Locale, Dictionary> = { es, en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}
