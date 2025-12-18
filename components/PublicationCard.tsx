import type { Publication } from '@/lib/publications'

export default function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <div className="bg-white border border-meulen-brown-light/30 rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-3">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-meulen-beige text-meulen-dark-brown rounded">
          {publication.type}
        </span>
        {publication.featured && (
          <span className="inline-block px-3 py-1 text-xs font-medium bg-meulen-pink text-meulen-dark-brown rounded">
            Destacada
          </span>
        )}
      </div>

      <h3 className="text-xl font-playfair font-bold text-meulen-dark-brown mb-2">
        {publication.title}
      </h3>

      <p className="text-sm text-meulen-dark-brown/70 mb-3">
        {publication.authors}
      </p>

      {publication.publication && (
        <p className="text-sm italic text-meulen-dark-brown/60 mb-3">
          {publication.publication}
        </p>
      )}

      {publication.summary && (
        <p className="text-sm text-meulen-dark-brown/80 mb-4 line-clamp-3">
          {publication.summary}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {publication.keywords?.slice(0, 3).map((keyword, index) => (
          <span
            key={index}
            className="inline-block px-2 py-1 text-xs bg-meulen-cream text-meulen-dark-brown rounded"
          >
            {keyword}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-meulen-dark-brown/60">
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
            className="text-meulen-brown hover:text-meulen-dark-brown font-medium"
          >
            Ver publicación →
          </a>
        )}
      </div>
    </div>
  )
}
