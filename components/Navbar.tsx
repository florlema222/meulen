'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, localeHref, type Locale } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

/**
 * Shared site navigation. Section links point at the home page anchors (with the
 * locale prefix) so they work from any page; "Quiénes Somos" links to the team
 * page and "Qué Hacemos" opens a dropdown to the Investigación / Extensión /
 * Formación pages. `subpath` is forwarded to the language switcher to preserve
 * the current page when switching language.
 */
export default function Navbar({ locale, subpath = '' }: { locale: Locale; subpath?: string }) {
  const t = getDictionary(locale)
  const home = localeHref(locale)
  const team = `${home}equipo/`
  const [openMenu, setOpenMenu] = useState(false)

  const queHacemosItems = [
    { label: t.nav.investigacion, href: `${home}investigacion/` },
    { label: t.nav.extension, href: `${home}extension/` },
    { label: t.nav.formacion, href: `${home}formacion/` },
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

                <Link href={`${home}#publicaciones`} className="hover:text-meulen-brown transition px-3 py-2">
                  {t.nav.publicaciones}
                </Link>
                <Link href={`${home}#eventos`} className="hover:text-meulen-brown transition px-3 py-2">
                  {t.nav.eventos}
                </Link>
                <Link href={`${home}#noticias`} className="hover:text-meulen-brown transition px-3 py-2">
                  {t.nav.noticias}
                </Link>
              </div>
            </div>
            <LanguageSwitcher locale={locale} subpath={subpath} />
          </div>
        </div>
      </div>
    </nav>
  )
}
