import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const publicationsDirectory = path.join(process.cwd(), 'content/publications')

export interface Publication {
  slug: string
  title: string
  authors: string
  date: string
  type: string
  publication?: string
  summary?: string
  url?: string
  doi?: string
  keywords?: string[]
  featured?: boolean
  content: string
}

export function getAllPublications(locale: Locale = defaultLocale): Publication[] {
  try {
    if (!fs.existsSync(publicationsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(publicationsDirectory)
    const allPublications = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(publicationsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          ...data,
          slug,
          content,
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          summary: pickLocalized(data, 'summary', locale),
        } as Publication
      })

    return allPublications.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading publications:', error)
    return []
  }
}

export function getFeaturedPublications(locale: Locale = defaultLocale): Publication[] {
  const allPublications = getAllPublications(locale)
  return allPublications.filter(pub => pub.featured)
}
