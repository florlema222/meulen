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
      <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-4">
        {camp.title}
      </h3>
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
        /* Línea histórica — vertical rail on the left with the year markers;
           each camp card sits alongside it, ordered chronologically. */
        <ol
          aria-label={t.quehacemos.extension.timeline}
          className="relative ml-14 md:ml-24 border-l-2 border-meulen-brown/25 space-y-12 pt-2"
        >
          {chronological.map((camp) => (
            <li key={camp.slug} className="relative pl-6 md:pl-10">
              <span className="absolute -left-[9px] top-3 w-4 h-4 rounded-full bg-meulen-brown ring-4 ring-meulen-cream" />
              {camp.date && (
                <span className="absolute right-full mr-4 md:mr-6 top-1 font-playfair font-bold text-lg md:text-xl text-meulen-dark-brown whitespace-nowrap">
                  {camp.date}
                </span>
              )}
              <CampCard camp={camp} />
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
