import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const publicationsDirectory = path.join(process.cwd(), 'content/publications')

export interface Publication {
  slug: string
  title: string
  authors: string
  /** Publication year; the only date the CMS asks for. */
  year?: number
  type: string
  publication?: string
  summary?: string
  url?: string
  doi?: string
  keywords?: string[]
  featured?: boolean
  /** Cover image shown as a thumbnail on the card. */
  image?: string
  /** Thematic sub-axis ("sub-eje") used to group publications on the research page. */
  theme?: string
  content: string
}

/** Reads `year`, falling back to the year of a legacy full `date` field. */
function publicationYear(data: Record<string, unknown>): number | undefined {
  const raw = data.year ?? data.date
  if (raw instanceof Date) return raw.getUTCFullYear()
  const match = raw != null ? String(raw).match(/\d{4}/) : null
  return match ? Number(match[0]) : undefined
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
          year: publicationYear(data),
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          summary: pickLocalized(data, 'summary', locale),
        } as Publication
      })

    // Newest year first; same-year publications alphabetically by title.
    return allPublications.sort(
      (a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title, 'es')
    )
  } catch (error) {
    console.error('Error reading publications:', error)
    return []
  }
}

export function getFeaturedPublications(locale: Locale = defaultLocale): Publication[] {
  const allPublications = getAllPublications(locale)
  return allPublications.filter(pub => pub.featured)
}
