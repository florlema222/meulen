import { type Locale } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HtmlLang from '@/components/HtmlLang'

/**
 * Shared chrome for secondary pages (Investigación, Extensión, Formación, …):
 * sets `<html lang>`, renders the navbar with the right `subpath` for the
 * language switcher, wraps the content in the topographic background, and adds
 * the footer.
 */
export default function Subpage({
  locale,
  subpath,
  children,
}: {
  locale: Locale
  subpath: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <HtmlLang locale={locale} />
      <Navbar locale={locale} subpath={subpath} />
      <div className="relative">
        <div
          className="absolute inset-0 bg-repeat opacity-25"
          style={{ backgroundImage: 'url(/images/hero-topographic.png)', backgroundSize: '1200px auto' }}
        />
        <div className="relative z-10">{children}</div>
      </div>
      <Footer locale={locale} />
    </div>
  )
}
