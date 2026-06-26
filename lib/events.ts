import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const eventsDirectory = path.join(process.cwd(), 'content/events')

export interface Event {
  slug: string
  title: string
  date: string
  location: string
  type: string
  description: string
  registration_url?: string
  image?: string
  content: string
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
          location: pickLocalized(data, 'location', locale),
        } as Event
      })

    return allEvents.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading events:', error)
    return []
  }
}

export function getUpcomingEvents(locale: Locale = defaultLocale): Event[] {
  const allEvents = getAllEvents(locale)
  const now = new Date()
  return allEvents.filter(event => new Date(event.date) >= now).slice(0, 4)
}
