'use client'

import { useState } from 'react'
import Link from 'next/link'
import { locales, localeLabels, localeNames, localeHref, type Locale } from '@/lib/i18n'

/**
 * Compact language selector: a globe icon plus the current locale code, opening
 * a dropdown to switch languages. The panel is right-aligned so it stays within
 * the navbar's right margin, and mirrors the navbar's translucent style. Opens
 * on hover and toggles on click/touch. `subpath` keeps the visitor on the same
 * page when switching language (e.g. "equipo/"); empty for the home page.
 */
export default function LanguageSwitcher({
  locale,
  subpath = '',
}: {
  locale: Locale
  subpath?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-meulen-dark-brown hover:text-meulen-brown transition px-2 py-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.7}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z"
          />
        </svg>
        <span className="text-sm font-bold">{localeLabels[locale]}</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform group-hover:rotate-180 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute right-0 top-full pt-2 w-40 z-50 ${open ? 'block' : 'hidden'} group-hover:block`}
      >
        <div className="bg-[#f5e6d34d] backdrop-blur-sm rounded-lg shadow-lg py-2 ring-1 ring-meulen-brown/10">
          {locales.map((loc) =>
            loc === locale ? (
              <span
                key={loc}
                aria-current="true"
                className="flex items-center gap-2 px-4 py-2 font-bold text-meulen-dark-brown"
              >
                <span className="w-6 text-xs">{localeLabels[loc]}</span>
                {localeNames[loc]}
              </span>
            ) : (
              <Link
                key={loc}
                href={`${localeHref(loc)}${subpath}`}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-meulen-dark-brown hover:bg-meulen-brown/10 transition"
              >
                <span className="w-6 text-xs text-meulen-brown">{localeLabels[loc]}</span>
                {localeNames[loc]}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
