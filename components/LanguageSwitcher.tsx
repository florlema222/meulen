import Link from 'next/link'
import { locales, localeLabels, localeHref, type Locale } from '@/lib/i18n'

/**
 * ES · EN · PT links; the active locale is highlighted and non-clickable.
 * `subpath` keeps the visitor on the same page when switching language
 * (e.g. "equipo/" stays on the team page). Empty for the home page.
 */
export default function LanguageSwitcher({
  locale,
  subpath = '',
}: {
  locale: Locale
  subpath?: string
}) {
  return (
    <div className="flex items-center gap-1 text-sm" aria-label="Language">
      {locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 && <span className="mx-1 text-meulen-brown/40">·</span>}
          {loc === locale ? (
            <span className="font-bold text-meulen-dark-brown" aria-current="true">
              {localeLabels[loc]}
            </span>
          ) : (
            <Link
              href={`${localeHref(loc)}${subpath}`}
              className="text-meulen-brown hover:text-meulen-dark-brown transition"
            >
              {localeLabels[loc]}
            </Link>
          )}
        </span>
      ))}
    </div>
  )
}
