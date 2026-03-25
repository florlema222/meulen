import Image from 'next/image'

export default function ResearchAxes() {
  const axes = [
    {
      title: 'Derechos de la Naturaleza',
      description:
        'Analizamos el "giro ecocéntrico" y el reconocimiento de ecosistemas y animales como sujetos de derecho.',
      icon: '/images/icons/hoja.png',
    },
    {
      title: 'Derecho a un Ambiente Sano',
      description:
        'Estudiamos la implementación del Acuerdo de Escazú y el fortalecimiento del acceso a la justicia ambiental.',
      icon: '/images/icons/rio.png',
    },
    {
      title: 'Derecho del Extractivismo',
      description:
        'Indagamos en las regulaciones que viabilizan la explotación de recursos y generan resistencias sociales en los territorios.',
      icon: '/images/icons/lupa.png',
    },
  ]

  return (
    <section id="que-hacemos" className="py-16 px-4 bg-white/70 section-elevated">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-4 text-center">
          Qué Hacemos
        </h2>
        <p className="text-lg text-meulen-dark-brown/80 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          Investigamos las tensiones y diálogos entre tres grandes ejes o &ldquo;entramados&rdquo; que definen la realidad ecológica actual:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
          {axes.map((axis) => (
            <div key={axis.title} className="text-center">
              <Image
                src={axis.icon}
                alt={axis.title}
                width={160}
                height={160}
                className="w-32 h-32 object-contain mx-auto mb-5"
              />
              <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-3">
                {axis.title}
              </h3>
              <p className="text-meulen-dark-brown/80 leading-relaxed">
                {axis.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
