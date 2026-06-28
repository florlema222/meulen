import { getDictionary, type Locale } from '@/lib/i18n'
import { getAllAcampes, type Acampe } from '@/lib/acampes'

/** Sort by year ascending; entries without a date sink to the end. */
function byDateAsc(a: Acampe, b: Acampe): number {
  const da = a.date ?? ''
  const db = b.date ?? ''
  if (!da) return 1
  if (!db) return -1
  return da.localeCompare(db)
}

function CampCard({ camp }: { camp: Acampe }) {
  // Always render three slots so the layout is stable; empty slots become
  // gradient placeholders until photos are uploaded from the admin panel.
  const slots = [0, 1, 2].map((i) => camp.photos?.[i])

  return (
    <article className="bg-white/85 rounded-2xl p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-4">
        <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown">
          {camp.title}
        </h3>
        {camp.date && (
          <span className="text-sm font-semibold text-white bg-meulen-brown rounded-full px-3 py-0.5">
            {camp.date}
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {slots.map((photo, i) =>
          photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={photo}
              alt={`${camp.title} ${i + 1}`}
              className="aspect-square w-full object-cover rounded-lg shadow-sm"
            />
          ) : (
            <div
              key={i}
              className="aspect-square w-full rounded-lg bg-gradient-to-br from-meulen-brown/30 to-meulen-brown-light/30"
              aria-hidden="true"
            />
          )
        )}
      </div>
      {camp.description && (
        <p className="text-sm text-meulen-dark-brown/80 leading-relaxed">
          {camp.description}
        </p>
      )}
    </article>
  )
}

export default function AcampesSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const acampes = getAllAcampes(locale)
  const chronological = [...acampes].sort(byDateAsc)

  return (
    <div className="mt-14">
      <h2 className="font-playfair text-2xl font-bold text-meulen-dark-brown mb-6">
        {t.quehacemos.extension.acampesTitle}
      </h2>

      {chronological.length === 0 ? (
        <p className="text-center text-meulen-dark-brown/60 py-8">
          {t.quehacemos.extension.acampesEmpty}
        </p>
      ) : (
        <>
          {/* Línea histórica — chronological dates/places */}
          <div className="mb-12">
            <h3 className="text-xs uppercase tracking-wide text-meulen-brown/80 mb-4">
              {t.quehacemos.extension.timeline}
            </h3>
            <ol className="flex gap-6 overflow-x-auto pb-3 border-t-2 border-meulen-brown/20 pt-5">
              {chronological.map((camp) => (
                <li key={camp.slug} className="relative flex-shrink-0 min-w-[7rem]">
                  <span className="absolute -top-[1.65rem] left-0 w-3 h-3 rounded-full bg-meulen-brown ring-2 ring-meulen-cream" />
                  {camp.date && (
                    <p className="font-playfair font-bold text-meulen-dark-brown">
                      {camp.date}
                    </p>
                  )}
                  <p className="text-sm text-meulen-dark-brown/70">{camp.title}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Camp cards — most recent first */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...chronological].reverse().map((camp) => (
              <CampCard key={camp.slug} camp={camp} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
