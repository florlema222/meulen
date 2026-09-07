'use client'

import { useState } from 'react'
import type { Publication } from '@/lib/publications'
import PublicationCard from '@/components/PublicationCard'
import {
  getDictionary,
  localizeVocab,
  publicationThemeOrder,
  type Locale,
} from '@/lib/i18n'

/** Key used for publications with no sub-axis, or one outside the canonical list. */
const OTHER = '__other__'

/**
 * Publications browsed by thematic sub-axis ("sub-eje"): a row of pills, one per
 * sub-axis, and the cards of the selected one below. Sub-axes without
 * publications are dropped so the pills never lead to an empty grid — unless
 * `emptyThemeMessage` is given, which keeps every canonical sub-axis visible
 * (the research page shows the whole structure) and captions the empty ones.
 * Anything untagged collects under a final "Otras" pill.
 */
export default function PublicationsExplorer({
  publications,
  locale,
  emptyThemeMessage,
}: {
  publications: Publication[]
  locale: Locale
  emptyThemeMessage?: string
}) {
  const t = getDictionary(locale)

  const groups: { key: string; label: string; items: Publication[] }[] = [
    ...publicationThemeOrder.map((theme) => ({
      key: theme,
      label: localizeVocab(theme, t.publicationThemes, locale),
      items: publications.filter((p) => p.theme === theme),
    })),
    {
      key: OTHER,
      label: t.publications.otherTheme,
      items: publications.filter(
        (p) => !p.theme || !publicationThemeOrder.includes(p.theme as (typeof publicationThemeOrder)[number])
      ),
    },
  ].filter((group) => group.items.length > 0 || (emptyThemeMessage && group.key !== OTHER))

  // Start on a sub-axis that has something to show.
  const [activeKey, setActiveKey] = useState(
    (groups.find((group) => group.items.length > 0) ?? groups[0])?.key
  )
  const active = groups.find((group) => group.key === activeKey) ?? groups[0]

  if (!active) {
    return (
      <div className="text-center text-meulen-dark-brown/60 py-12">
        <p className="text-lg">{t.publications.empty}</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {groups.map((group) => {
          const isActive = group.key === active.key
          return (
            <button
              key={group.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveKey(group.key)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                isActive
                  ? 'bg-meulen-cream border-meulen-brown text-meulen-dark-brown shadow-sm'
                  : 'bg-meulen-brown border-meulen-brown text-white/90 hover:bg-meulen-dark-brown hover:text-white'
              }`}
            >
              {group.label}
              {group.items.length > 0 && (
                <span className={isActive ? 'ml-2 text-meulen-dark-brown/40' : 'ml-2 text-white/60'}>
                  {group.items.length}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {active.items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {active.items.map((publication) => (
            <PublicationCard key={publication.slug} publication={publication} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm italic text-meulen-dark-brown/50 py-8">{emptyThemeMessage}</p>
      )}
    </div>
  )
}
