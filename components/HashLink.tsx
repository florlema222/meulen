'use client'

import Link from 'next/link'
import type { MouseEvent, ReactNode } from 'react'

/**
 * Link to a section anchor on the home page, usable from any page.
 *
 * `next/link` only scrolls when the browser treats the hash as new, so a click
 * made while the URL already carries that hash (the common case once a visitor
 * has followed the link once) does nothing at all. When the target section is
 * present in the current document we take over: scroll to it ourselves and
 * rewrite the hash, keeping Next.js' own history state so the back button still
 * works. From another page the target is absent, so the link navigates normally
 * and the browser resolves the anchor on arrival.
 */
export default function HashLink({
  href,
  className,
  onClick,
  children,
}: {
  href: string
  className?: string
  onClick?: () => void
  children: ReactNode
}) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.()

    // Let the browser handle modified clicks (new tab, download, …).
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const id = href.split('#')[1]
    const target = id ? document.getElementById(id) : null
    if (!target) return

    event.preventDefault()
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    window.history.replaceState(window.history.state, '', href)
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
