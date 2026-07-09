import { getDictionary, type Locale } from '@/lib/i18n'
import { getAllSeminars } from '@/lib/seminars'
import { getAllCourses } from '@/lib/courses'
import Tabs from '@/components/Tabs'

const INTRO =
  'Organizamos y sostenemos desde hace más de una década espacios variados de formación permanente que se agrupan en distintos seminarios y cursos en donde discutimos nuestras producciones en conjunto a investigadores/as externos nacionales e internacionales, organizaciones no gubernamentales y otros miembros de sociedad civil y de diferentes ámbitos estatales.'

function SeminariosPanel({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const seminars = getAllSeminars(locale)

  return (
    <div className="space-y-6">
      {seminars.map((s) => (
        <article key={s.slug} className="bg-white/85 rounded-xl p-6 shadow-sm">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown">
              {s.title}
            </h3>
            {s.since && (
              <span className="text-sm font-medium text-meulen-brown whitespace-nowrap">
                {t.quehacemos.formacion.since} {s.since}
              </span>
            )}
          </div>
          {s.description && (
            <p className="text-sm text-meulen-dark-brown/80 leading-relaxed">
              {s.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}

function CursosPanel({ locale }: { locale: Locale }) {
  const courses = getAllCourses(locale)

  return (
    <div className="space-y-6">
      {courses.map((c) => (
        <article key={c.slug} className="bg-white/85 rounded-xl p-6 shadow-sm">
          <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-1">
            {c.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-meulen-brown mb-3">
            {c.director && <span>{c.director}</span>}
            {c.director && c.hours && <span aria-hidden>·</span>}
            {c.hours && <span>{c.hours}</span>}
          </div>
          {c.description && (
            <p className="text-sm text-meulen-dark-brown/80 leading-relaxed">
              {c.description}
            </p>
          )}
        </article>
      ))}
    </div>
  )
}

export default function FormacionSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-meulen-dark-brown mb-8 text-center">
          {t.quehacemos.formacion.title}
        </h1>
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-meulen-dark-brown/80 leading-relaxed">{INTRO}</p>
        </div>

        <Tabs
          tabs={[
            { label: t.quehacemos.formacion.tabSeminarios, panel: <SeminariosPanel locale={locale} /> },
            { label: t.quehacemos.formacion.tabCursos, panel: <CursosPanel locale={locale} /> },
          ]}
        />
      </div>
    </section>
  )
}
