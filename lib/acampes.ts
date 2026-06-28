import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const acampesDirectory = path.join(process.cwd(), 'content/acampes')

export interface Acampe {
  slug: string
  title: string
  /** Year (or date) of the field camp, used for the timeline ordering. */
  date?: string
  lat: number
  lng: number
  description?: string
  photos: string[]
}

export function getAllAcampes(locale: Locale = defaultLocale): Acampe[] {
  try {
    if (!fs.existsSync(acampesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(acampesDirectory)
    const allAcampes = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(acampesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          photos: [],
          ...data,
          slug,
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          description: pickLocalized(data, 'description', locale),
        } as unknown as Acampe
      })

    return allAcampes
  } catch (error) {
    console.error('Error reading acampes:', error)
    return []
  }
}
