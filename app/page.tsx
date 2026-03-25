import Link from 'next/link'
import Image from 'next/image'
import { getAllPublications } from '@/lib/publications'
import { getUpcomingEvents } from '@/lib/events'
import { getRecentNews } from '@/lib/news'
import { getAllCarouselSlides } from '@/lib/carousel'
import { getAllAcampes } from '@/lib/acampes'
import PublicationCard from '@/components/PublicationCard'
import EventCard from '@/components/EventCard'
import NewsCard from '@/components/NewsCard'
import StaticHero from '@/components/StaticHero'
import TeamCarousel from '@/components/TeamCarousel'
import ResearchAxes from '@/components/ResearchAxes'
import ExtensionMapWrapper from '@/components/ExtensionMapWrapper'

export default function Home() {
  const publications = getAllPublications()
  const upcomingEvents = getUpcomingEvents()
  const recentNews = getRecentNews(3)
  const carouselSlides = getAllCarouselSlides()
  const acampes = getAllAcampes()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-[#f5e6d34d] text-meulen-dark-brown sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
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
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link href="#nosotros" className="hover:text-meulen-brown transition px-3 py-2">
                  Nosotros
                </Link>
                <Link href="#que-hacemos" className="hover:text-meulen-brown transition px-3 py-2">
                  Qué Hacemos
                </Link>
                <Link href="#publicaciones" className="hover:text-meulen-brown transition px-3 py-2">
                  Publicaciones
                </Link>
                <Link href="#eventos" className="hover:text-meulen-brown transition px-3 py-2">
                  Eventos
                </Link>
                <Link href="#noticias" className="hover:text-meulen-brown transition px-3 py-2">
                  Noticias
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Topographic background — covers all sections except footer */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-repeat opacity-25"
          style={{ backgroundImage: 'url(/images/hero-topographic.png)', backgroundSize: '1200px auto' }}
        />

        <div className="relative z-10">

      {/* Hero Section */}
      <StaticHero />

      {/* Nosotros - Team Carousel */}
      <TeamCarousel slides={carouselSlides} />

      {/* Qué Hacemos - Research Axes + Extension */}
      <ResearchAxes />
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
                Extensión
              </h3>
              <p className="text-lg text-meulen-dark-brown/80 leading-relaxed mb-4">
                Realizamos extensión universitaria para robustecer el acceso a la justicia ambiental en localidades de la provincia de Santa Fe.
              </p>
              <p className="text-meulen-dark-brown/60 text-sm">
                Hacé click en los marcadores del mapa para ver las localidades visitadas y los acampes realizados.
              </p>
            </div>
            {/* Right: map */}
            <div>
              <ExtensionMapWrapper acampes={acampes} />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-auto max-w-2xl"></div>

      {/* Publications Section */}
      <section id="publicaciones" className="py-16 px-4 bg-white/80 section-elevated">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Publicaciones
          </h2>

          {publications.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {publications.slice(0, 4).map((publication) => (
                  <PublicationCard key={publication.slug} publication={publication} />
                ))}
              </div>
              <div className="text-center">
                <p className="text-meulen-dark-brown/70 mb-4">
                  {publications.length > 4 && `Mostrando 4 de ${publications.length} publicaciones`}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">Las publicaciones aparecerán aquí una vez que se agreguen desde el panel de administración.</p>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="eventos" className="py-16 px-4 bg-meulen-cream/30 section-inset">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Próximos Eventos
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 2).map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">Próximamente anunciaremos nuestros eventos y actividades.</p>
            </div>
          )}
        </div>
      </section>

      <div className="section-divider mx-auto max-w-2xl"></div>

      {/* News Section */}
      <section id="noticias" className="py-16 px-4 bg-white/80 section-elevated">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Noticias
          </h2>

          {recentNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentNews.map((news) => (
                <NewsCard key={news.slug} news={news} />
              ))}
            </div>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">Mantente al tanto de las novedades del Proyecto Meulen.</p>
            </div>
          )}
        </div>
      </section>

        </div>{/* end z-10 */}
      </div>{/* end topographic wrapper */}

      {/* Footer */}
      <footer className="relative overflow-hidden pt-20 pb-12 px-4">
        {/* Gradient background: transparent at top → cream at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-meulen-cream via-meulen-cream/50 to-transparent"></div>
        {/* Topographic pattern fading downwards */}
        <div
          className="absolute inset-0 bg-repeat opacity-20"
          style={{
            backgroundImage: 'url(/images/hero-topographic.png)',
            backgroundSize: '1200px auto',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)',
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="/images/meulen-logo-outline.png"
                  alt="Proyecto Meulen"
                  width={40}
                  height={40}
                  className="h-10 w-auto"
                />
                <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown">Proyecto Meulen</h3>
              </div>
            </div>
            {/* Navigation */}
            <div>
              <h4 className="font-playfair text-lg font-bold text-meulen-dark-brown mb-4">Navegación</h4>
              <div className="space-y-2 text-sm">
                <Link href="#nosotros" className="block text-meulen-brown hover:text-meulen-dark-brown transition">
                  Nosotros
                </Link>
                <Link href="#que-hacemos" className="block text-meulen-brown hover:text-meulen-dark-brown transition">
                  Qué Hacemos
                </Link>
                <Link href="#publicaciones" className="block text-meulen-brown hover:text-meulen-dark-brown transition">
                  Publicaciones
                </Link>
                <Link href="#eventos" className="block text-meulen-brown hover:text-meulen-dark-brown transition">
                  Eventos
                </Link>
              </div>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-playfair text-lg font-bold text-meulen-dark-brown mb-4">Contacto</h4>
              <div className="space-y-3 text-sm">
                <a href="mailto:proyecto.meulen@fcjs.unl.edu.ar" className="flex items-center gap-2 text-meulen-brown hover:text-meulen-dark-brown transition">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  proyecto.meulen@fcjs.unl.edu.ar
                </a>
                <div className="flex items-start gap-2 text-meulen-dark-brown/70">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>FCJS - UNL<br />Santa Fe, Argentina</span>
                </div>
              </div>
            </div>
            {/* Social */}
            <div>
              <h4 className="font-playfair text-lg font-bold text-meulen-dark-brown mb-4">Redes Sociales</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/proyecto.meulen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-meulen-beige/60 flex items-center justify-center text-meulen-brown hover:bg-meulen-brown hover:text-white transition"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/proyecto.meulen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-meulen-beige/60 flex items-center justify-center text-meulen-brown hover:bg-meulen-brown hover:text-white transition"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCu8JrWU_nfP1lrup-indG6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-meulen-beige/60 flex items-center justify-center text-meulen-brown hover:bg-meulen-brown hover:text-white transition"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-meulen-beige text-center text-sm text-meulen-dark-brown/50">
            <p>&copy; 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
