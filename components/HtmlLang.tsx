'use client'

import { useEffect } from 'react'
import type { Locale } from '@/lib/i18n'

/**
 * Sets <html lang> to the page's locale on the client. The root layout renders a
 * static lang="es" (required by Next.js, which only allows the <html> tag in the
 * root layout); this corrects it for the /en/ and /pt/ routes. SEO crawlers also
 * receive per-language hreflang alternates via each route's metadata.
 */
export default function HtmlLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}
