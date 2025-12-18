import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getAllEvents(): Event[] {
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
          slug,
          content,
          ...data,
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

export function getUpcomingEvents(): Event[] {
  const allEvents = getAllEvents()
  const now = new Date()
  return allEvents.filter(event => new Date(event.date) >= now)
}
