'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  getDictionary,
  locales,
  localeLabels,
  localeNames,
  localeHref,
  type Locale,
} from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

/**
 * Shared site navigation. Section links point at the home page anchors (with the
 * locale prefix) so they work from any page; "Quiénes Somos" links to the team
 * page and "Qué Hacemos" opens a dropdown to the Investigación / Extensión /
 * Formación pages. On small screens the links collapse behind a hamburger menu.
 * `subpath` is forwarded to the language switcher to preserve the current page
 * when switching language.
 */
export default function Navbar({ locale, subpath = '' }: { locale: Locale; subpath?: string }) {
  const t = getDictionary(locale)
  const home = localeHref(locale)
  const team = `${home}equipo/`
  const [openMenu, setOpenMenu] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const queHacemosItems = [
    { label: t.nav.investigacion, href: `${home}investigacion/` },
    { label: t.nav.extension, href: `${home}extension/` },
    { label: t.nav.formacion, href: `${home}formacion/` },
  ]

  const primaryLinks = [
    { label: t.nav.publicaciones, href: `${home}#publicaciones` },
    { label: t.nav.eventos, href: `${home}#eventos` },
    { label: t.nav.noticias, href: `${home}#noticias` },
  ]

  return (
    <nav className="bg-[#f5e6d34d] text-meulen-dark-brown sticky top-0 z-50 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href={home} className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/images/meulen-logo-full.png"
              alt="Proyecto Meulen"
              width={50}
              height={50}
              className="h-12 w-auto"
              priority
            />
            <h1 className="text-2xl font-playfair font-bold">Proyecto Meulen</h1>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-6">
                <Link href={team} className="hover:text-meulen-brown transition px-3 py-2">
                  {t.nav.nosotros}
                </Link>

                {/* Qué Hacemos dropdown — panel is always in the DOM (crawlable,
                    works without JS via hover) and also toggles on click/touch. */}
                <div
                  className="relative group"
                  onMouseEnter={() => setOpenMenu(true)}
                  onMouseLeave={() => setOpenMenu(false)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openMenu}
                    onClick={() => setOpenMenu((v) => !v)}
                    className="inline-flex items-center gap-1 hover:text-meulen-brown transition px-3 py-2"
                  >
                    {t.nav.queHacemos}
                    <svg
                      className={`w-4 h-4 transition-transform group-hover:rotate-180 ${openMenu ? 'rotate-180' : ''}`}
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
                    className={`absolute left-0 top-full pt-2 w-56 z-50 group-hover:block ${openMenu ? 'block' : 'hidden'}`}
                  >
                    <div className="bg-[#f5e6d34d] backdrop-blur-sm rounded-lg shadow-lg py-2 ring-1 ring-meulen-brown/10">
                      {queHacemosItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpenMenu(false)}
                          className="block px-4 py-2 text-meulen-dark-brown hover:bg-meulen-brown/10 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {primaryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-meulen-brown transition px-3 py-2"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <LanguageSwitcher locale={locale} subpath={subpath} />
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 text-meulen-dark-brown hover:text-meulen-brown transition"
              aria-label="Menú"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-meulen-brown/10">
          <div className="px-4 sm:px-6 py-4 space-y-1">
            <Link
              href={team}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-md hover:bg-meulen-brown/10 transition"
            >
              {t.nav.nosotros}
            </Link>

            <div className="pt-1">
              <p className="px-3 pt-2 pb-1 text-sm font-semibold text-meulen-brown">
                {t.nav.queHacemos}
              </p>
              {queHacemosItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-2 rounded-md hover:bg-meulen-brown/10 transition"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md hover:bg-meulen-brown/10 transition"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2 mt-2 border-t border-meulen-brown/10">
              <p className="flex items-center gap-2 px-3 pt-2 pb-1 text-sm font-semibold text-meulen-brown">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.5 2.5 3.75 5.5 3.75 9S14.5 18.5 12 21c-2.5-2.5-3.75-5.5-3.75-9S9.5 5.5 12 3z" />
                </svg>
                {t.nav.idioma}
              </p>
              {locales.map((loc) =>
                loc === locale ? (
                  <span
                    key={loc}
                    aria-current="true"
                    className="flex items-center gap-2 px-6 py-2 font-bold text-meulen-dark-brown"
                  >
                    <span className="w-6 text-xs">{localeLabels[loc]}</span>
                    {localeNames[loc]}
                  </span>
                ) : (
                  <Link
                    key={loc}
                    href={`${localeHref(loc)}${subpath}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-6 py-2 rounded-md hover:bg-meulen-brown/10 transition"
                  >
                    <span className="w-6 text-xs text-meulen-brown">{localeLabels[loc]}</span>
                    {localeNames[loc]}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
