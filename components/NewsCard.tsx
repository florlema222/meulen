import type { NewsItem } from '@/lib/news'

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <div className="bg-white border border-meulen-brown-light/30 rounded-lg p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-meulen-dark-brown/60">
          {new Date(news.date).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        {news.author && (
          <span className="text-xs text-meulen-dark-brown/70">
            Por {news.author}
          </span>
        )}
      </div>

      <h3 className="text-xl font-playfair font-bold text-meulen-dark-brown mb-3">
        {news.title}
      </h3>

      <p className="text-sm text-meulen-dark-brown/80 mb-4">
        {news.excerpt}
      </p>

      <button className="text-sm text-meulen-brown hover:text-meulen-dark-brown font-medium">
        Leer más →
      </button>
    </div>
  )
}
