import type { Event } from '@/lib/events'

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white border border-meulen-brown-light/30 rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-meulen-beige text-meulen-dark-brown rounded">
          {event.type}
        </span>
        <span className="text-xs text-meulen-dark-brown/60">
          {new Date(event.date).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </span>
      </div>

      <h3 className="text-xl font-playfair font-bold text-meulen-dark-brown mb-2">
        {event.title}
      </h3>

      <p className="text-sm text-meulen-dark-brown/70 mb-3 flex items-center">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {event.location}
      </p>

      <div className="text-sm text-meulen-dark-brown/80 mb-4 line-clamp-3">
        {event.description}
      </div>

      {event.registration_url && (
        <a
          href={event.registration_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-meulen-brown text-white text-sm rounded hover:bg-meulen-dark-brown transition"
        >
          Inscribirse →
        </a>
      )}
    </div>
  )
}
