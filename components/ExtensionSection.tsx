import { getDictionary, type Locale } from '@/lib/i18n'

const INTRO = [
  'La extensión universitaria es un espacio de encuentro, diálogo y construcción colectiva de conocimientos entre la Universidad y la comunidad. A través del trabajo conjunto con organizaciones sociales, instituciones públicas y comunidades locales, desarrollamos actividades orientadas a promover la justicia ecológica, fortalecer las capacidades locales para el abordaje de problemas socioambientales y acompañar procesos de transición hacia prácticas más sostenibles.',
]

const ACAMPE = [
  'Acampe por una justicia ecológica es un proyecto de extensión universitaria que desarrollamos desde 2019 en distintas localidades de la provincia de Santa Fe. Cada acampe consiste en una jornada de trabajo territorial en la que estudiantes, docentes, voluntarios/as y organizaciones sociales realizamos encuestas, entrevistas, talleres y actividades de intercambio con vecinos/as e instituciones locales.',
  'El objetivo es conocer los problemas socioambientales del territorio, identificar obstáculos para el ejercicio de los derechos y relevar experiencias vinculadas con prácticas sostenibles. Luego, el equipo sistematiza la información obtenida y regresa a la localidad para compartir los resultados con la comunidad y las instituciones públicas, promoviendo el diálogo entre actores locales y generando insumos para el diseño de respuestas institucionales y políticas públicas vinculadas con la justicia ecológica y las transiciones hacia prácticas más sostenibles.',
]

const INSTITUTIONS = [
  'Asociación Civil Capibara. Naturaleza, Derecho y Sociedad',
  'Sociedad y Cooperativa de Quinteros de Santa Fe',
  'La Verdecita',
  'Unión de Trabajadores de la Tierra (UTT)',
  'Instituto Nacional de Tecnología Agropecuaria (INTA) – Agencia de Extensión Rural Monte Vera',
]

export default function ExtensionSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
          {t.quehacemos.extension.title}
        </h1>

        <div className="space-y-4 mb-10">
          {INTRO.map((p, i) => (
            <p key={i} className="text-lg text-meulen-dark-brown/80 leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <div className="bg-white/85 rounded-2xl p-8 shadow-sm mb-10">
          <h2 className="font-playfair text-2xl font-bold text-meulen-dark-brown mb-4">
            Acampe por una justicia ecológica
          </h2>
          <div className="space-y-4">
            {ACAMPE.map((p, i) => (
              <p key={i} className="text-meulen-dark-brown/80 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-4">
            {t.quehacemos.extension.institutions}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INSTITUTIONS.map((name) => (
              <li
                key={name}
                className="flex items-start gap-2 text-meulen-dark-brown/80"
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-meulen-brown flex-shrink-0" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
