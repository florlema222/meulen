import { getDictionary, type Locale } from '@/lib/i18n'
import { getAllProjects, type Project } from '@/lib/projects'
import { getAllPublications } from '@/lib/publications'
import Tabs from '@/components/Tabs'
import PublicationsExplorer from '@/components/PublicationsExplorer'

// Intro text is content (Spanish) shown on every locale with Spanish fallback,
// matching the site's "optional content translation" approach.
const INTRO = [
  'Investigamos los diferentes entramados socio-jurídicos sobre la cuestión ecológica a partir de un enfoque situado en el contexto latinoamericano y atento a la relevancia social y política del tema.',
  'Nuestro trabajo se estructura en tres líneas de investigación articuladas en torno a la cuestión ecológica contemporánea. La primera aborda la justicia ecológica, con énfasis en las transformaciones jurídicas vinculadas al reconocimiento de los derechos de la naturaleza y los ecosistemas, el desarrollo de la litigación climática y ecológica y los desafíos de implementación del Acuerdo de Escazú. La segunda se centra en el extractivismo y en las relaciones entre las dinámicas extractivas y los marcos jurídicos contemporáneos, atendiendo especialmente a las tensiones entre la expansión de proyectos extractivos, los incentivos a grandes inversiones extranjeras y el principio de no regresión en materia ambiental. La tercera aborda las transiciones agrícolas en el Cinturón Hortícola Santafesino desde una perspectiva social, jurídica y tecnológica, considerando las condiciones, los actores y las tensiones que atraviesan estos procesos en la región.',
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-white/85 rounded-xl p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
        <h4 className="font-playfair text-lg font-bold text-meulen-dark-brown">
          {project.title}
        </h4>
        {project.period && (
          <span className="text-sm font-medium text-meulen-brown whitespace-nowrap">
            {project.period}
          </span>
        )}
      </div>
      {project.funding && (
        <p className="text-xs uppercase tracking-wide text-meulen-brown/80 mb-3">
          {project.funding}
        </p>
      )}
      {project.summary && (
        <p className="text-sm text-meulen-dark-brown/80 text-prose leading-relaxed">
          {project.summary}
        </p>
      )}
    </article>
  )
}

function ProjectsPanel({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const projects = getAllProjects(locale)
  const nacionales = projects.filter((p) => p.scope === 'Nacional')
  const internacionales = projects.filter((p) => p.scope === 'Internacional')

  return (
    <div className="space-y-12">
      {nacionales.length > 0 && (
        <div>
          <h3 className="text-2xl font-playfair font-bold text-meulen-dark-brown mb-6">
            {t.quehacemos.investigacion.nacionales}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nacionales.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
      {internacionales.length > 0 && (
        <div>
          <h3 className="text-2xl font-playfair font-bold text-meulen-dark-brown mb-6">
            {t.quehacemos.investigacion.internacionales}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internacionales.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProduccionesPanel({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  // Same presentation as the home page, but every canonical sub-axis keeps a
  // pill even when it has no publications yet, so the intended structure of the
  // research line stays visible.
  return (
    <PublicationsExplorer
      publications={getAllPublications(locale)}
      locale={locale}
      emptyThemeMessage={t.quehacemos.investigacion.proximamente}
    />
  )
}

export default function InvestigacionSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
          {t.quehacemos.investigacion.title}
        </h1>
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          {INTRO.map((p, i) => (
            <p key={i} className="text-lg text-meulen-dark-brown/80 text-prose leading-relaxed">
              {p}
            </p>
          ))}
        </div>

        <Tabs
          tabs={[
            { label: t.quehacemos.investigacion.tabProyectos, panel: <ProjectsPanel locale={locale} /> },
            { label: t.quehacemos.investigacion.tabProducciones, panel: <ProduccionesPanel locale={locale} /> },
          ]}
        />
      </div>
    </section>
  )
}
