import ExpandableText from '@/components/ExpandableText'
import Markdown from '@/components/Markdown'
import type { NewsItem } from '@/lib/news'
import { getDictionary, dateLocale, type Locale } from '@/lib/i18n'

// The CMS stores the news date as a plain day (`YYYY-MM-DD`), which parses as UTC
// midnight; formatting in UTC keeps the day from shifting back in Argentina's timezone.
export default function NewsCard({ news, locale }: { news: NewsItem; locale: Locale }) {
  const t = getDictionary(locale)
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 shadow-[0_2px_12px_rgba(61,47,31,0.06)] hover:shadow-[0_8px_30px_rgba(61,47,31,0.12)]">
      <div className="flex items-center gap-2 mb-3 text-xs text-meulen-dark-brown/50">
        <span>
          {new Date(news.date).toLocaleDateString(dateLocale[locale], {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'UTC',
          })}
        </span>
        {news.author && (
          <>
            <span className="text-meulen-beige">·</span>
            <span>{t.news.by} {news.author}</span>
          </>
        )}
      </div>

      <h3 className="text-lg font-playfair font-bold text-meulen-dark-brown mb-3 leading-snug">
        {news.title}
      </h3>

      {/* The full body expands in place; news have no page of their own. The body is
          not translated, so it shows in Spanish on every locale. */}
      <ExpandableText
        moreLabel={t.news.readMore}
        lessLabel={t.news.showLess}
        className="text-sm text-meulen-dark-brown/70 leading-relaxed space-y-2 [&_ul]:list-disc [&_ul]:pl-5"
      >
        <Markdown>{news.body.trim() || news.excerpt}</Markdown>
      </ExpandableText>
    </div>
  )
}
