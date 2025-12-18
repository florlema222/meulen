import Link from 'next/link'
import { getAllPublications } from '@/lib/publications'
import PublicationCard from '@/components/PublicationCard'

export default function Home() {
  const publications = getAllPublications()
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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-meulen-cream via-meulen-beige to-meulen-brown-light py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              {/* Logo placeholder - they can add their actual logo later */}
              <div className="w-32 h-32 mx-auto bg-meulen-dark-brown rounded-full flex items-center justify-center">
                <span className="text-4xl text-white font-playfair">M</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-meulen-dark-brown mb-6">
              Proyecto Meulen
            </h1>
            <p className="text-xl md:text-2xl text-meulen-dark-brown/80 max-w-3xl mx-auto leading-relaxed">
              Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.
            </p>
            <div className="mt-8 text-sm text-meulen-dark-brown/70">
              <p>Facultad de Ciencias Jurídicas y Sociales</p>
              <p>Universidad Nacional del Litoral</p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications Preview Section */}
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
                <Link
                  href="/admin"
                  className="inline-block px-6 py-3 bg-meulen-brown text-white rounded-lg hover:bg-meulen-dark-brown transition"
                >
                  Administrar Publicaciones
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center text-meulen-dark-brown/60 py-12">
              <p className="text-lg">Las publicaciones aparecerán aquí una vez que se agreguen desde el panel de administración.</p>
              <p className="mt-4">
                <Link href="/admin" className="text-meulen-brown hover:text-meulen-dark-brown underline">
                  Ir al panel de administración →
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* About Preview */}
      <section id="nosotros" className="py-16 px-4 bg-meulen-cream/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
            Nosotros
          </h2>
          <div className="text-center text-meulen-dark-brown/80 max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed">
              Esta sección mostrará el equipo de investigación, fotos y descripción del proyecto.
            </p>
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
              <h4 className="font-playfair text-lg font-bold mb-4">Contacto</h4>
              <p className="text-sm text-white/80">
                <a href="mailto:proyecto.meulen@fcjs.unl.edu.ar" className="hover:text-meulen-beige transition">
                  proyecto.meulen@fcjs.unl.edu.ar
                </a>
              </p>
            </div>
            <div>
              <h4 className="font-playfair text-lg font-bold mb-4">Redes Sociales</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/proyecto.meulen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-meulen-beige transition"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/proyecto.meulen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-meulen-beige transition"
                >
                  Facebook
                </a>
                <a
                  href="https://www.youtube.com/channel/UCu8JrWU_nfP1lrup-indG6A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-meulen-beige transition"
                >
                  YouTube
                </a>
              </div>
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
