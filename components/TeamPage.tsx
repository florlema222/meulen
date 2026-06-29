import { type Locale } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HtmlLang from '@/components/HtmlLang'
import TeamSection from '@/components/TeamSection'

export default function TeamPage({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen">
      <HtmlLang locale={locale} />
      <Navbar locale={locale} subpath="equipo/" />
      <TeamSection locale={locale} />
      <Footer locale={locale} />
    </div>
  )
}
