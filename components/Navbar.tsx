import Link from 'next/link'
import Image from 'next/image'
import { getDictionary, localeHref, type Locale } from '@/lib/i18n'
import LanguageSwitcher from '@/components/LanguageSwitcher'

/**
 * Shared site navigation. Section links point at the home page anchors (with the
 * locale prefix) so they work from any page; "Quiénes Somos" links to the team
 * page. `subpath` is forwarded to the language switcher to preserve the page.
 */
export default function Navbar({ locale, subpath = '' }: { locale: Locale; subpath?: string }) {
  const t = getDictionary(locale)
  const home = localeHref(locale)
  const team = `${home}equipo/`

  return (
    <nav className="bg-[#f5e6d34d] text-meulen-dark-brown sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Link href={`${home}#que-hacemos`} className="hover:text-meulen-brown transition px-3 py-2">
                  {t.nav.queHacemos}
                </Link>
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
