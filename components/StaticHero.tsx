import Image from 'next/image'

export default function StaticHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 px-4" style={{ boxShadow: '0 8px 30px -8px rgba(61, 47, 31, 0.12)' }}>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="mb-5">
            <Image
              src="/images/meulen-logo-outline.png"
              alt="Proyecto Meulen"
              width={140}
              height={140}
              className="mx-auto w-32 h-auto"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-meulen-dark-brown mb-4">
            Proyecto Meulen
          </h1>
          <p className="text-xl md:text-2xl text-meulen-dark-brown/80 max-w-3xl mx-auto leading-relaxed">
            Investigamos justicias e injusticias socioecol&oacute;gicas con perspectiva latinoamericana e interdisciplinar.
          </p>
          <div className="mt-5 text-sm text-meulen-dark-brown/70">
            <p>Facultad de Ciencias Jur&iacute;dicas y Sociales</p>
            <p>Universidad Nacional del Litoral</p>
          </div>
        </div>
      </div>
    </section>
  )
}
