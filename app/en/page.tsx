import type { Metadata } from 'next'
import HomePage from '@/components/HomePage'
import { getDictionary } from '@/lib/i18n'

const t = getDictionary('en')

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: '/en/',
    languages: {
      'es-AR': '/',
      en: '/en/',
      'pt-BR': '/pt/',
      'x-default': '/',
    },
  },
}

export default function Page() {
  return <HomePage locale="en" />
}
