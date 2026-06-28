import type { Metadata } from 'next'
import Subpage from '@/components/Subpage'
import FormacionSection from '@/components/FormacionSection'
import { getDictionary } from '@/lib/i18n'

const t = getDictionary('en')

export const metadata: Metadata = {
  title: `${t.quehacemos.formacion.title} | ${t.meta.title}`,
  description: t.quehacemos.formacion.metaDescription,
  alternates: {
    canonical: '/en/formacion/',
    languages: {
      'es-AR': '/formacion/',
      en: '/en/formacion/',
      'pt-BR': '/pt/formacion/',
      'x-default': '/formacion/',
    },
  },
}

export default function Page() {
  return (
    <Subpage locale="en" subpath="formacion/">
      <FormacionSection locale="en" />
    </Subpage>
  )
}
