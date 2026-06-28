import type { Metadata } from 'next'
import Subpage from '@/components/Subpage'
import ExtensionSection from '@/components/ExtensionSection'
import { getDictionary } from '@/lib/i18n'

const t = getDictionary('pt')

export const metadata: Metadata = {
  title: `${t.quehacemos.extension.title} | ${t.meta.title}`,
  description: t.quehacemos.extension.metaDescription,
  alternates: {
    canonical: '/pt/extension/',
    languages: {
      'es-AR': '/extension/',
      en: '/en/extension/',
      'pt-BR': '/pt/extension/',
      'x-default': '/extension/',
    },
  },
}

export default function Page() {
  return (
    <Subpage locale="pt" subpath="extension/">
      <ExtensionSection locale="pt" />
    </Subpage>
  )
}
