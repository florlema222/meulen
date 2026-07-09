import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const eventsDirectory = path.join(process.cwd(), 'content/events')

/**
 * A past activity the group took part in ("we were here"). Everything but the
 * title is optional: `image` is a flyer or photo, `date` only orders the list
 * (newest first) and is shown as a month/year caption when present.
 */
export interface Event {
  slug: string
  title: string
  description?: string
  image?: string
  date?: string
  content: string
}

// Newest first. `date` may arrive as a Date (YAML) or string; entries without a
// valid date sort last, falling back to the date-prefixed slug among themselves.
function eventTime(e: Event): number | null {
  if (!e.date) return null
  const t = new Date(e.date).getTime()
  return Number.isNaN(t) ? null : t
}

function compareEvents(a: Event, b: Event): number {
  const ta = eventTime(a)
  const tb = eventTime(b)
  if (ta !== null && tb !== null) return tb - ta
  if (ta !== null) return -1
  if (tb !== null) return 1
  return b.slug.localeCompare(a.slug)
}

export function getAllEvents(locale: Locale = defaultLocale): Event[] {
  try {
    if (!fs.existsSync(eventsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(eventsDirectory)
    const allEvents = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(eventsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          ...data,
          slug,
          content,
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          description: pickLocalized(data, 'description', locale),
        } as Event
      })

    return allEvents.sort(compareEvents)
  } catch (error) {
    console.error('Error reading events:', error)
    return []
  }
}

/** Most recent activities, for the home-page "we were here" gallery. */
export function getRecentEvents(locale: Locale = defaultLocale, limit = 3): Event[] {
  return getAllEvents(locale).slice(0, limit)
}
