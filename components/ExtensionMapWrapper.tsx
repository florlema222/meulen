'use client'

import dynamic from 'next/dynamic'
import type { Acampe } from '@/lib/acampes'
import type { Locale } from '@/lib/i18n'

const ExtensionMap = dynamic(() => import('@/components/ExtensionMap'), { ssr: false })

export default function ExtensionMapWrapper({ acampes, locale }: { acampes: Acampe[]; locale: Locale }) {
  return <ExtensionMap acampes={acampes} locale={locale} />
}
