import type { Metadata } from 'next'
import TeamPage from '@/components/TeamPage'
import { getDictionary } from '@/lib/i18n'

const t = getDictionary('pt')

export const metadata: Metadata = {
  title: `${t.team.title} | ${t.meta.title}`,
  description: t.team.metaDescription,
  alternates: {
    canonical: '/pt/equipo/',
    languages: {
      'es-AR': '/equipo/',
      en: '/en/equipo/',
      'pt-BR': '/pt/equipo/',
      'x-default': '/equipo/',
    },
  },
}

export default function Page() {
  return <TeamPage locale="pt" />
}
