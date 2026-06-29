import {
  getDictionary,
  localizeVocab,
  publicationThemeOrder,
  type Locale,
} from '@/lib/i18n'
import { getAllProjects, type Project } from '@/lib/projects'
import { getAllPublications } from '@/lib/publications'
import Tabs from '@/components/Tabs'

// Intro text is content (Spanish) shown on every locale with Spanish fallback,
// matching the site's "optional content translation" approach.
const INTRO = [
  'Investigamos sobre los diferentes entramados socio-jurídicos sobre la cuestión ecológica a partir de un enfoque situado en el contexto latinoamericano y atento a la relevancia social y política del tema.',
  'En particular, nuestra línea de investigación se organiza en torno a tres grandes ejes analíticos: el derecho ecologizado, el derecho a un ambiente sano y el derecho del extractivismo. En este marco, consolidamos el estudio de las innovaciones jurídicas que emergen en América Latina, analizando los procesos de ampliación de los derechos de la naturaleza y de los ecosistemas, el desarrollo creciente de la litigación climática y ecológica, y los desafíos asociados a la implementación del Acuerdo de Escazú como instrumento clave de democracia ambiental. Asimismo, indagamos las dinámicas del extractivismo y su articulación con los marcos jurídicos contemporáneos, prestando especial atención a las tensiones entre la expansión de los proyectos extractivos, el incentivo a grandes inversiones extranjeras y el rol del principio de no regresión ante la profundización de retrocesos en la tutela ambiental.',
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
        <p className="text-sm text-meulen-dark-brown/80 leading-relaxed">
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
  const publications = getAllPublications(locale)

  // Group by thematic sub-axis, keeping the canonical order. All sub-axes are
  // shown even when empty so the intended structure is always visible.
  const groups = publicationThemeOrder.map((theme) => ({
    theme,
    items: publications.filter((p) => p.theme === theme),
  }))

  return (
    <div className="space-y-10">
      {groups.map((group) => (
        <div key={group.theme}>
          <h3 className="text-xl font-playfair font-bold text-meulen-dark-brown mb-4">
            {localizeVocab(group.theme, t.publicationThemes, locale)}
          </h3>
          {group.items.length > 0 ? (
            <ul className="space-y-3">
              {group.items.map((p) => (
                <li key={p.slug} className="bg-white/85 rounded-lg p-4 shadow-sm">
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-meulen-dark-brown hover:text-meulen-brown transition"
                    >
                      {p.title}
                    </a>
                  ) : (
                    <span className="font-medium text-meulen-dark-brown">{p.title}</span>
                  )}
                  <p className="text-sm text-meulen-dark-brown/70 mt-1">
                    {p.authors}
                    {p.publication ? ` · ${p.publication}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic text-meulen-dark-brown/50">
              {t.quehacemos.investigacion.proximamente}
            </p>
          )}
        </div>
      ))}
    </div>
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
            <p key={i} className="text-lg text-meulen-dark-brown/80 leading-relaxed">
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
