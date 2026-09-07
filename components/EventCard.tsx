import type { Event } from '@/lib/events'
import { dateLocale, type Locale } from '@/lib/i18n'

/**
 * Retrospective card for a past activity ("we were here"): flyer/photo on top,
 * title, and an optional description. The date, when present, is shown only as a
 * month/year caption. The CMS stores it as a plain day (`YYYY-MM-DD`), which
 * parses as UTC midnight, so the caption is formatted in UTC: any timezone
 * behind it would push a first-of-the-month event into the previous month.
 * A fixed timezone also keeps server and client output identical (no hydration
 * mismatch).
 */
export default function EventCard({ event, locale }: { event: Event; locale: Locale }) {
  const label = event.date
    ? new Date(event.date).toLocaleDateString(dateLocale[locale], {
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : null

  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_12px_rgba(61,47,31,0.06)] hover:shadow-[0_8px_30px_rgba(61,47,31,0.12)]">
      {event.image ? (
        <div className="aspect-[4/3] bg-meulen-cream/40 flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={event.image} alt={event.title} className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-gradient-to-br from-meulen-brown to-meulen-brown-light" />
      )}

      <div className="p-6">
        {label && (
          <p className="text-xs text-meulen-brown uppercase tracking-wider mb-2">{label}</p>
        )}
        <h3 className="text-lg font-playfair font-bold text-meulen-dark-brown mb-2 leading-snug">
          {event.title}
        </h3>
        {event.description && (
          <div className="text-sm text-meulen-dark-brown/70 line-clamp-3 leading-relaxed whitespace-pre-line">
            {event.description}
          </div>
        )}
      </div>
    </div>
  )
}
