'use client'

import type { Publication } from '@/lib/publications'

export default function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="group relative bg-white/90 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(61, 47, 31, 0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(61, 47, 31, 0.12)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(61, 47, 31, 0.06)' }}
    >
      {/* Left accent border */}
      <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-meulen-brown-light/50 group-hover:bg-meulen-brown transition-colors rounded-full"></div>

      <div className="pl-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-meulen-brown tracking-wide uppercase">
            {publication.type}
          </span>
          {publication.featured && (
            <>
              <span className="text-meulen-beige">·</span>
              <span className="text-xs font-medium text-meulen-brown-light tracking-wide uppercase">
                Destacada
              </span>
            </>
          )}
        </div>

        <h3 className="text-lg font-playfair font-bold text-meulen-dark-brown mb-2 leading-snug">
          {publication.title}
        </h3>

        <p className="text-sm text-meulen-brown mb-2">
          {publication.authors}
        </p>

        {publication.publication && (
          <p className="text-sm italic text-meulen-dark-brown/50 mb-3">
            {publication.publication}
          </p>
        )}

        {publication.summary && (
          <p className="text-sm text-meulen-dark-brown/70 mb-4 line-clamp-2 leading-relaxed">
            {publication.summary}
          </p>
        )}

        {publication.keywords && publication.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {publication.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="text-xs text-meulen-brown/70 border border-meulen-beige px-2 py-0.5 rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm pt-3 border-t border-meulen-beige/50">
          <span className="text-meulen-dark-brown/50 text-xs">
            {new Date(publication.date).toLocaleDateString('es-AR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          {publication.url && (
            <a
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-meulen-brown hover:text-meulen-dark-brown font-medium text-xs tracking-wide uppercase"
            >
              Ver publicación →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
