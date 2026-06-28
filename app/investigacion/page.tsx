import type { Metadata } from 'next'
import Subpage from '@/components/Subpage'
import InvestigacionSection from '@/components/InvestigacionSection'
import { getDictionary } from '@/lib/i18n'

const t = getDictionary('es')

export const metadata: Metadata = {
  title: `${t.quehacemos.investigacion.title} | ${t.meta.title}`,
  description: t.quehacemos.investigacion.metaDescription,
  alternates: {
    canonical: '/investigacion/',
    languages: {
      'es-AR': '/investigacion/',
      en: '/en/investigacion/',
      'pt-BR': '/pt/investigacion/',
      'x-default': '/investigacion/',
    },
  },
}

export default function Page() {
  return (
    <Subpage locale="es" subpath="investigacion/">
      <InvestigacionSection locale="es" />
    </Subpage>
  )
}
