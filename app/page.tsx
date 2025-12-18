import Link from 'next/link'
import { getAllPublications } from '@/lib/publications'
import { getUpcomingEvents } from '@/lib/events'
import { getRecentNews } from '@/lib/news'
import { getAllCarouselSlides } from '@/lib/carousel'
import PublicationCard from '@/components/PublicationCard'
import EventCard from '@/components/EventCard'
import NewsCard from '@/components/NewsCard'
import HeroCarousel from '@/components/HeroCarousel'

export default function Home() {
  const publications = getAllPublications()
  const upcomingEvents = getUpcomingEvents()
  const recentNews = getRecentNews(3)
  const carouselSlides = getAllCarouselSlides()

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-meulen-dark-brown text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-playfair font-bold">Proyecto Meulen</h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6">
                <Link href="#nosotros" className="hover:text-meulen-beige transition px-3 py-2">
                  Nosotros
                </Link>
                <Link href="#que-hacemos" className="hover:text-meulen-beige transition px-3 py-2">
                  Qué Hacemos
                </Link>
                <Link href="#publicaciones" className="hover:text-meulen-beige transition px-3 py-2">
                  Publicaciones
                </Link>
                <Link href="#eventos" className="hover:text-meulen-beige transition px-3 py-2">
                  Eventos
                </Link>
                <Link href="#noticias" className="hover:text-meulen-beige transition px-3 py-2">
                  Noticias
                </Link>
                <Link href="#contacto" className="hover:text-meulen-beige transition px-3 py-2">
                  Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel Section */}
      <HeroCarousel slides={carouselSlides} />

      {/* About Section */}
      <section id="nosotros" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Nosotros
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-meulen-dark-brown/80 leading-relaxed mb-6">
              El Proyecto Meulen es un equipo interdisciplinario de investigación dedicado al estudio de las justicias e injusticias socioecológicas en América Latina.
            </p>
            <p className="text-lg text-meulen-dark-brown/80 leading-relaxed">
              Nuestro trabajo se centra en la renovación de aportes jurídicos sobre el problema ecológico, integrando perspectivas del derecho, las ciencias sociales y las humanidades ambientales.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="que-hacemos" className="py-16 px-4 bg-meulen-cream/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Qué Hacemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-meulen-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-2">Investigación</h3>
              <p className="text-meulen-dark-brown/80">
                Desarrollamos investigaciones originales sobre justicia ambiental y derecho ecológico en la región.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-meulen-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-2">Formación</h3>
              <p className="text-meulen-dark-brown/80">
                Organizamos seminarios, talleres y actividades de formación para estudiantes e investigadores.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-meulen-brown rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-2">Colaboración</h3>
              <p className="text-meulen-dark-brown/80">
                Trabajamos en red con universidades y organizaciones de América Latina y Europa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Section */}
      <section id="publicaciones" className="py-16 px-4 bg-white">
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
      <section id="eventos" className="py-16 px-4 bg-meulen-cream/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Próximos Eventos
          </h2>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.slice(0, 4).map((event) => (
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

      {/* News Section */}
      <section id="noticias" className="py-16 px-4 bg-white">
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

      {/* Contact Section */}
      <section id="contacto" className="py-16 px-4 bg-meulen-cream/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Contacto
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-meulen-brown mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium text-meulen-dark-brown">Email</p>
                      <a href="mailto:proyecto.meulen@fcjs.unl.edu.ar" className="text-meulen-brown hover:text-meulen-dark-brown">
                        proyecto.meulen@fcjs.unl.edu.ar
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-meulen-brown mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="font-medium text-meulen-dark-brown">Ubicación</p>
                      <p className="text-meulen-dark-brown/80">
                        Facultad de Ciencias Jurídicas y Sociales<br />
                        Universidad Nacional del Litoral<br />
                        Santa Fe, Argentina
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-4">
                  Síguenos en Redes Sociales
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://www.instagram.com/proyecto.meulen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-meulen-brown hover:text-meulen-dark-brown transition"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/proyecto.meulen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-meulen-brown hover:text-meulen-dark-brown transition"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCu8JrWU_nfP1lrup-indG6A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-meulen-brown hover:text-meulen-dark-brown transition"
                  >
                    <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-meulen-dark-brown text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-playfair text-xl font-bold mb-4">Proyecto Meulen</h3>
              <p className="text-sm text-white/80">
                Renovación de aportes jurídicos sobre el problema ecológico
              </p>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Enlaces Rápidos</h4>
              <div className="space-y-2 text-sm">
                <Link href="#nosotros" className="block text-white/80 hover:text-meulen-beige transition">
                  Nosotros
                </Link>
                <Link href="#publicaciones" className="block text-white/80 hover:text-meulen-beige transition">
                  Publicaciones
                </Link>
                <Link href="#eventos" className="block text-white/80 hover:text-meulen-beige transition">
                  Eventos
                </Link>
                <Link href="/admin" className="block text-white/80 hover:text-meulen-beige transition">
                  Panel de Administración
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Contacto</h4>
              <p className="text-sm text-white/80">
                <a href="mailto:proyecto.meulen@fcjs.unl.edu.ar" className="hover:text-meulen-beige transition">
                  proyecto.meulen@fcjs.unl.edu.ar
                </a>
              </p>
              <p className="text-sm text-white/80 mt-2">
                FCJS - Universidad Nacional del Litoral
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            <p>&copy; 2025 Proyecto Meulen - FCJS, Universidad Nacional del Litoral</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
