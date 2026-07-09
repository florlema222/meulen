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

/** Full language names, shown in the language dropdown. */
export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
}

/** `Intl` locale used for date/number formatting. */
export const dateLocale: Record<Locale, string> = {
  es: 'es-AR',
  en: 'en-US',
  pt: 'pt-BR',
}

/**
 * Timezone the group lives in. Dates/times are formatted against this fixed
 * zone so a build server (often UTC) and every viewer's browser render the
 * same local time, regardless of where they are — events happen at a specific
 * Santa Fe time.
 */
export const siteTimeZone = 'America/Argentina/Buenos_Aires'

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
    investigacion: string
    extension: string
    formacion: string
    publicaciones: string
    eventos: string
    noticias: string
    idioma: string
  }
  quehacemos: {
    investigacion: {
      title: string
      metaDescription: string
      tabProyectos: string
      tabProducciones: string
      nacionales: string
      internacionales: string
      produccionesEmpty: string
      proximamente: string
    }
    extension: {
      title: string
      metaDescription: string
      institutions: string
      acampesTitle: string
      timeline: string
      acampesEmpty: string
    }
    formacion: {
      title: string
      metaDescription: string
      tabSeminarios: string
      tabCursos: string
      since: string
    }
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
  }
  news: {
    title: string
    empty: string
    readMore: string
    by: string
  }
  team: {
    title: string
    leadership: string
    members: string
    cta: string
    empty: string
    metaDescription: string
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
  /** Maps the Spanish thematic sub-axis ("sub-eje") vocabulary to the active locale. */
  publicationThemes: Record<string, string>
}

/** Canonical (Spanish) ordering of the publication thematic sub-axes. */
export const publicationThemeOrder = [
  'Justicia ecológica y derechos de la naturaleza',
  'Derecho Ambiental',
  'Extractivismos',
  'Pueblos Indígenas',
  'Género y desigualdades territoriales',
] as const

const es: Dictionary = {
  nav: {
    nosotros: 'Quiénes Somos',
    queHacemos: 'Qué Hacemos',
    investigacion: 'Investigación',
    extension: 'Extensión',
    formacion: 'Formación',
    publicaciones: 'Publicaciones',
    eventos: 'Eventos',
    noticias: 'Noticias',
    idioma: 'Idioma',
  },
  quehacemos: {
    investigacion: {
      title: 'Investigación',
      metaDescription: 'Líneas, proyectos y producciones de investigación del Proyecto Meulen.',
      tabProyectos: 'Proyectos de investigación',
      tabProducciones: 'Producciones del equipo',
      nacionales: 'Nacionales',
      internacionales: 'Internacionales',
      produccionesEmpty: 'Las producciones del equipo se publicarán próximamente.',
      proximamente: 'Próximamente',
    },
    extension: {
      title: 'Extensión',
      metaDescription: 'Extensión universitaria del Proyecto Meulen: el proyecto Acampe por una justicia ecológica.',
      institutions: 'Instituciones y organizaciones participantes',
      acampesTitle: 'Acampes realizados',
      timeline: 'Línea histórica',
      acampesEmpty: 'Los acampes se publicarán próximamente.',
    },
    formacion: {
      title: 'Formación',
      metaDescription: 'Seminarios y cursos de formación permanente del Proyecto Meulen.',
      tabSeminarios: 'Seminarios',
      tabCursos: 'Cursos virtuales',
      since: 'Desde',
    },
  },
  hero: {
    tagline:
      'Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.',
    faculty: 'Facultad de Ciencias Jurídicas y Sociales',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'Quiénes Somos',
    p1: 'Somos un grupo interdisciplinario que realiza investigación, extensión y formación universitaria radicado en el Centro de Investigaciones de la Facultad de Ciencias Jurídicas y Sociales de la Universidad Nacional del Litoral de la ciudad de Santa Fe, Argentina.',
    p2: 'Integrado por especialistas en diversas áreas del derecho, la antropología, la historia, la ciencia política, la filosofía y la sociología, Meulen reúne miradas y metodologías complementarias para analizar las transformaciones socio-jurídicas que emergen en América Latina ante los desafíos socioecológicos actuales. Nos enfocamos en las herramientas normativas, institucionales y sociales que permiten fortalecer la protección de derechos y las transiciones ecosociales así como aquellas que permiten comprender y enfrentar los procesos de regresión en la tutela socioambiental y mecanismos que viabilizan el avance de los extractivismos en la región.',
  },
  whatWeDo: {
    title: 'Qué Hacemos',
    intro:
      'Investigamos sobre los diferentes entramados socio-jurídicos sobre la cuestión ecológica a partir de un enfoque situado en el contexto latinoamericano y atento a la relevancia social y política del tema.',
    axes: [
      {
        title: 'Justicia ecológica',
        description:
          'Estudiamos las innovaciones jurídicas que emergen en América Latina, analizando los procesos de ampliación de los derechos de la naturaleza y de los ecosistemas.',
      },
      {
        title: 'Derecho a un ambiente sano',
        description:
          'Analizamos los desafíos asociados a la implementación del Acuerdo de Escazú como instrumento clave de democracia ambiental en América Latina y el Caribe.',
      },
      {
        title: 'Extractivismos',
        description:
          'Indagamos las dinámicas del extractivismo y su articulación con los marcos jurídicos contemporáneos.',
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
    title: 'Eventos',
    empty: 'Pronto compartiremos las actividades en las que participamos.',
  },
  news: {
    title: 'Noticias',
    empty: 'Mantente al tanto de las novedades del Proyecto Meulen.',
    readMore: 'Leer más',
    by: 'Por',
  },
  team: {
    title: 'Quiénes Somos',
    leadership: 'Responsables',
    members: 'Equipo',
    cta: 'Conocé al equipo',
    empty: 'El equipo se publicará próximamente.',
    metaDescription: 'Conocé al equipo del Proyecto Meulen.',
  },
  footer: {
    navigation: 'Navegación',
    contact: 'Contacto',
    social: 'Redes Sociales',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© {year} Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
  },
  meta: {
    title: 'Proyecto Meulen',
    description:
      'Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.',
  },
  publicationTypes: {},
  eventTypes: {},
  publicationThemes: {},
}

const en: Dictionary = {
  nav: {
    nosotros: 'Who We Are',
    queHacemos: 'What We Do',
    investigacion: 'Research',
    extension: 'Outreach',
    formacion: 'Training',
    publicaciones: 'Publications',
    eventos: 'Events',
    noticias: 'News',
    idioma: 'Language',
  },
  quehacemos: {
    investigacion: {
      title: 'Research',
      metaDescription: 'Research lines, projects and outputs of Proyecto Meulen.',
      tabProyectos: 'Research projects',
      tabProducciones: 'Team outputs',
      nacionales: 'National',
      internacionales: 'International',
      produccionesEmpty: 'Team outputs will be published soon.',
      proximamente: 'Coming soon',
    },
    extension: {
      title: 'Outreach',
      metaDescription: 'University outreach by Proyecto Meulen: the Camp for ecological justice project.',
      institutions: 'Participating institutions and organizations',
      acampesTitle: 'Field camps held',
      timeline: 'Timeline',
      acampesEmpty: 'Field camps will be published soon.',
    },
    formacion: {
      title: 'Training',
      metaDescription: 'Permanent seminars and courses by Proyecto Meulen.',
      tabSeminarios: 'Seminars',
      tabCursos: 'Online courses',
      since: 'Since',
    },
  },
  hero: {
    tagline:
      'We research socio-ecological justices and injustices from a Latin American and interdisciplinary perspective.',
    faculty: 'Faculty of Legal and Social Sciences',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'Who We Are',
    p1: 'We are an interdisciplinary group engaged in university research, outreach and teaching, based at the Research Centre of the Faculty of Legal and Social Sciences of the Universidad Nacional del Litoral in the city of Santa Fe, Argentina.',
    p2: 'Made up of specialists in various fields of law, anthropology, history, political science, philosophy and sociology, Meulen brings together complementary perspectives and methodologies to analyze the socio-legal transformations emerging in Latin America in response to today’s socio-ecological challenges. We focus on the normative, institutional and social tools that make it possible to strengthen the protection of rights and eco-social transitions, as well as those that help us understand and confront processes of regression in socio-environmental protection and the mechanisms that enable the advance of extractivism in the region.',
  },
  whatWeDo: {
    title: 'What We Do',
    intro:
      'We research the different socio-legal frameworks surrounding the ecological question from a perspective situated in the Latin American context and attentive to the social and political relevance of the issue.',
    axes: [
      {
        title: 'Ecological Justice',
        description:
          'We study the legal innovations emerging in Latin America, analyzing the processes that expand the rights of nature and of ecosystems.',
      },
      {
        title: 'Right to a Healthy Environment',
        description:
          'We analyze the challenges associated with implementing the Escazú Agreement as a key instrument of environmental democracy in Latin America and the Caribbean.',
      },
      {
        title: 'Extractivisms',
        description:
          'We investigate the dynamics of extractivism and its articulation with contemporary legal frameworks.',
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
    title: 'Events',
    empty: 'Coming soon: the activities we have taken part in.',
  },
  news: {
    title: 'News',
    empty: 'Stay up to date with news from Proyecto Meulen.',
    readMore: 'Read more',
    by: 'By',
  },
  team: {
    title: 'Who We Are',
    leadership: 'Leadership',
    members: 'Team',
    cta: 'Meet the team',
    empty: 'The team will be published soon.',
    metaDescription: 'Meet the Proyecto Meulen team.',
  },
  footer: {
    navigation: 'Navigation',
    contact: 'Contact',
    social: 'Social Media',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© {year} Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
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
  publicationThemes: {
    'Justicia ecológica y derechos de la naturaleza': 'Ecological justice and rights of nature',
    'Derecho Ambiental': 'Environmental law',
    'Extractivismos': 'Extractivisms',
    'Pueblos Indígenas': 'Indigenous peoples',
    'Género y desigualdades territoriales': 'Gender and territorial inequalities',
  },
}

const pt: Dictionary = {
  nav: {
    nosotros: 'Quem Somos',
    queHacemos: 'O Que Fazemos',
    investigacion: 'Pesquisa',
    extension: 'Extensão',
    formacion: 'Formação',
    publicaciones: 'Publicações',
    eventos: 'Eventos',
    noticias: 'Notícias',
    idioma: 'Idioma',
  },
  quehacemos: {
    investigacion: {
      title: 'Pesquisa',
      metaDescription: 'Linhas, projetos e produções de pesquisa do Proyecto Meulen.',
      tabProyectos: 'Projetos de pesquisa',
      tabProducciones: 'Produções da equipe',
      nacionales: 'Nacionais',
      internacionales: 'Internacionais',
      produccionesEmpty: 'As produções da equipe serão publicadas em breve.',
      proximamente: 'Em breve',
    },
    extension: {
      title: 'Extensão',
      metaDescription: 'Extensão universitária do Proyecto Meulen: o projeto Acampamento por uma justiça ecológica.',
      institutions: 'Instituições e organizações participantes',
      acampesTitle: 'Acampamentos realizados',
      timeline: 'Linha histórica',
      acampesEmpty: 'Os acampamentos serão publicados em breve.',
    },
    formacion: {
      title: 'Formação',
      metaDescription: 'Seminários e cursos de formação permanente do Proyecto Meulen.',
      tabSeminarios: 'Seminários',
      tabCursos: 'Cursos virtuais',
      since: 'Desde',
    },
  },
  hero: {
    tagline:
      'Investigamos justiças e injustiças socioecológicas com uma perspectiva latino-americana e interdisciplinar.',
    faculty: 'Faculdade de Ciências Jurídicas e Sociais',
    university: 'Universidad Nacional del Litoral',
  },
  about: {
    title: 'Quem Somos',
    p1: 'Somos um grupo interdisciplinar que realiza pesquisa, extensão e formação universitária, sediado no Centro de Pesquisas da Faculdade de Ciências Jurídicas e Sociais da Universidad Nacional del Litoral, na cidade de Santa Fe, Argentina.',
    p2: 'Integrado por especialistas em diversas áreas do direito, da antropologia, da história, da ciência política, da filosofia e da sociologia, Meulen reúne olhares e metodologias complementares para analisar as transformações sócio-jurídicas que emergem na América Latina diante dos desafios socioecológicos atuais. Concentramo-nos nas ferramentas normativas, institucionais e sociais que permitem fortalecer a proteção de direitos e as transições ecossociais, assim como naquelas que permitem compreender e enfrentar os processos de regressão na tutela socioambiental e os mecanismos que viabilizam o avanço dos extrativismos na região.',
  },
  whatWeDo: {
    title: 'O Que Fazemos',
    intro:
      'Investigamos as diferentes tramas sócio-jurídicas em torno da questão ecológica a partir de um enfoque situado no contexto latino-americano e atento à relevância social e política do tema.',
    axes: [
      {
        title: 'Justiça ecológica',
        description:
          'Estudamos as inovações jurídicas que emergem na América Latina, analisando os processos de ampliação dos direitos da natureza e dos ecossistemas.',
      },
      {
        title: 'Direito a um ambiente saudável',
        description:
          'Analisamos os desafios associados à implementação do Acordo de Escazú como instrumento-chave de democracia ambiental na América Latina e no Caribe.',
      },
      {
        title: 'Extrativismos',
        description:
          'Indagamos as dinâmicas do extrativismo e sua articulação com os marcos jurídicos contemporâneos.',
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
    title: 'Eventos',
    empty: 'Em breve compartilharemos as atividades das quais participamos.',
  },
  news: {
    title: 'Notícias',
    empty: 'Fique por dentro das novidades do Proyecto Meulen.',
    readMore: 'Ler mais',
    by: 'Por',
  },
  team: {
    title: 'Quem Somos',
    leadership: 'Responsáveis',
    members: 'Equipe',
    cta: 'Conheça a equipe',
    empty: 'A equipe será publicada em breve.',
    metaDescription: 'Conheça a equipe do Proyecto Meulen.',
  },
  footer: {
    navigation: 'Navegação',
    contact: 'Contato',
    social: 'Redes Sociais',
    location: 'FCJS - UNL\nSanta Fe, Argentina',
    rights: '© {year} Proyecto Meulen - FCJS, Universidad Nacional del Litoral',
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
  publicationThemes: {
    'Justicia ecológica y derechos de la naturaleza': 'Justiça ecológica e direitos da natureza',
    'Derecho Ambiental': 'Direito Ambiental',
    'Extractivismos': 'Extrativismos',
    'Pueblos Indígenas': 'Povos Indígenas',
    'Género y desigualdades territoriales': 'Gênero e desigualdades territoriais',
  },
}

const dictionaries: Record<Locale, Dictionary> = { es, en, pt }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}
