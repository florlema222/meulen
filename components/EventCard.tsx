'use client'

import type { Event } from '@/lib/events'

export default function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date)

  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(61, 47, 31, 0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(61, 47, 31, 0.12)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(61, 47, 31, 0.06)' }}
    >
      {/* Date strip */}
      <div className="bg-meulen-cream/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-center leading-none">
            <span className="block text-2xl font-playfair font-bold text-meulen-dark-brown">
              {eventDate.getDate()}
            </span>
            <span className="block text-xs text-meulen-brown uppercase tracking-wider mt-0.5">
              {eventDate.toLocaleDateString('es-AR', { month: 'short' })}
            </span>
          </div>
          <div className="w-px h-8 bg-meulen-beige"></div>
          <span className="text-xs text-meulen-brown tracking-wide uppercase">
            {event.type}
          </span>
        </div>
        <span className="text-xs text-meulen-dark-brown/50">
          {eventDate.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })} hs
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-playfair font-bold text-meulen-dark-brown mb-2 leading-snug">
          {event.title}
        </h3>

        <p className="text-sm text-meulen-brown mb-3 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {event.location}
        </p>

        <div className="text-sm text-meulen-dark-brown/70 mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </div>

        {event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-meulen-brown/10 text-meulen-brown text-sm rounded-full hover:bg-meulen-brown hover:text-white transition-colors font-medium"
          >
            Inscribirse
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}
