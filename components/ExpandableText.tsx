'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Clamps server-rendered content to about three lines and lets the reader expand
 * it in place. The toggle appears only when the content really overflows, measured
 * after mount and on every resize, so short texts render with no button and no fade.
 */
export default function ExpandableText({
  children,
  moreLabel,
  lessLabel,
  className = '',
}: {
  children: ReactNode
  moreLabel: string
  lessLabel: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || expanded) return
    const check = () => setOverflows(el.scrollHeight > el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded])

  const scrollBack = useRef(false)

  // Collapsing a long text can leave the reader far below it. Measure once the
  // collapsed layout is in place (the page is shorter by then) and bring the text
  // back into view if it ended up above the viewport.
  useEffect(() => {
    if (expanded || !scrollBack.current) return
    scrollBack.current = false
    const el = wrapperRef.current
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ block: 'center' })
  }, [expanded])

  const toggle = () => {
    scrollBack.current = expanded
    setExpanded((value) => !value)
  }

  return (
    <div ref={wrapperRef}>
      <div className="relative">
        <div ref={ref} className={`${expanded ? '' : 'max-h-[4.25rem] overflow-hidden'} ${className}`}>
          {children}
        </div>
        {overflows && !expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {overflows && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={toggle}
          className="mt-2 inline-flex items-center gap-1 text-sm text-meulen-brown font-medium hover:gap-2 transition-all"
        >
          {expanded ? lessLabel : moreLabel}
          <svg
            className={`w-3.5 h-3.5 transition-transform ${expanded ? '-rotate-90' : 'rotate-90'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
