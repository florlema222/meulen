'use client'

import type { NewsItem } from '@/lib/news'

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ boxShadow: '0 2px 12px rgba(61, 47, 31, 0.06)' }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(61, 47, 31, 0.12)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(61, 47, 31, 0.06)' }}
    >
      <div className="flex items-center gap-2 mb-3 text-xs text-meulen-dark-brown/50">
        <span>
          {new Date(news.date).toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
        {news.author && (
          <>
            <span className="text-meulen-beige">·</span>
            <span>Por {news.author}</span>
          </>
        )}
      </div>

      <h3 className="text-lg font-playfair font-bold text-meulen-dark-brown mb-3 leading-snug group-hover:text-meulen-brown transition-colors">
        {news.title}
      </h3>

      <p className="text-sm text-meulen-dark-brown/70 mb-4 leading-relaxed line-clamp-3">
        {news.excerpt}
      </p>

      <span className="inline-flex items-center gap-1 text-sm text-meulen-brown font-medium group-hover:gap-2 transition-all">
        Leer más
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  )
}
