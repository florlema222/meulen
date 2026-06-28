import Image from 'next/image'
import { getAllPublications } from '@/lib/publications'
import { getUpcomingEvents } from '@/lib/events'
import { getRecentNews } from '@/lib/news'
import { getAllCarouselSlides } from '@/lib/carousel'
import { getAllAcampes } from '@/lib/acampes'
import { getDictionary, type Locale } from '@/lib/i18n'
import PublicationCard from '@/components/PublicationCard'
import EventCard from '@/components/EventCard'
import NewsCard from '@/components/NewsCard'
import StaticHero from '@/components/StaticHero'
import TeamCarousel from '@/components/TeamCarousel'
import ResearchAxes from '@/components/ResearchAxes'
import ExtensionMapWrapper from '@/components/ExtensionMapWrapper'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HtmlLang from '@/components/HtmlLang'

export default function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const publications = getAllPublications(locale)
  const upcomingEvents = getUpcomingEvents(locale)
  const recentNews = getRecentNews(3, locale)
  const carouselSlides = getAllCarouselSlides()
  const acampes = getAllAcampes(locale)

  return (
    <div className="min-h-screen">
      <HtmlLang locale={locale} />
      <Navbar locale={locale} />

      {/* Topographic background — covers all sections except footer */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-repeat opacity-25"
          style={{ backgroundImage: 'url(/images/hero-topographic.png)', backgroundSize: '1200px auto' }}
        />

        <div className="relative z-10">

      {/* Hero Section */}
      <StaticHero locale={locale} />

      {/* Quiénes Somos - Team Carousel */}
      <TeamCarousel slides={carouselSlides} locale={locale} />

      {/* Qué Hacemos - Research Axes + Extension */}
      <ResearchAxes locale={locale} />
      {/* Extensión Section */}
      <section className="py-16 px-4 section-inset">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text + icon */}
            <div>
              <Image
                src="/images/icons/universidad.png"
                alt="Extensión universitaria"
                width={80}
                height={80}
                className="w-16 h-16 object-contain mb-4"
              />
              <h3 className="text-3xl font-playfair font-bold text-meulen-dark-brown mb-4">
                {t.extension.title}
              </h3>
              <p className="text-lg text-meulen-dark-brown/80 leading-relaxed mb-4">
                {t.extension.p1}
              </p>
              <p className="text-meulen-dark-brown/60 text-sm">
                {t.extension.p2}
              </p>
            </div>
            {/* Right: map */}
            <div>
              <ExtensionMapWrapper acampes={acampes} locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-2xl"></div>

      {/* Publications Section */}
      <section id="publicaciones" className="py-16 px-4 bg-white/80 section-elevated">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            {t.publications.title}
          </h2>

          {publications.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {publications.slice(0, 4).map((publication) => (
                  <PublicationCard key={publication.slug} publication={publication} locale={locale} />
                ))}
              </div>
              <div className="text-center">
                <p className="text-meulen-dark-brown/70 mb-4">
                  {publications.length > 4 &&
                    t.publications.showing
                      .replace('{shown}', '4')
                      .replace('{total}', String(publications.length))}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">{t.publications.empty}</p>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-16 px-4 bg-meulen-cream/30 section-inset">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            {t.events.title}
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 2).map((event) => (
                <EventCard key={event.slug} event={event} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">{t.events.empty}</p>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-2xl"></div>

      {/* News Section */}
      <section id="noticias" className="py-16 px-4 bg-white/80 section-elevated">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            {t.news.title}
          </h2>

          {recentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map((news) => (
                <NewsCard key={news.slug} news={news} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">{t.news.empty}</p>
            </div>
          )}
        </div>
      </section>

        </div>{/* end z-10 */}
      </div>{/* end topographic wrapper */}

      <Footer locale={locale} />
    </div>
  )
}
