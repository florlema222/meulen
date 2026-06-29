'use client'

import { useState, type ReactNode } from 'react'

export interface Tab {
  label: string
  panel: ReactNode
}

/**
 * Accessible client-side tabs. Panels are server-rendered and passed in as
 * `panel` nodes; only the active one is shown. Used by the "Qué Hacemos" pages
 * (Investigación / Formación) to fold long content into "solapas".
 */
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div>
      <div
        role="tablist"
        aria-label="Secciones"
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={
              'px-5 py-2.5 rounded-full text-sm font-medium transition-colors ' +
              (active === i
                ? 'bg-meulen-dark-brown text-white shadow-md'
                : 'bg-white/80 text-meulen-dark-brown hover:bg-white')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[active].panel}</div>
    </div>
  )
}
