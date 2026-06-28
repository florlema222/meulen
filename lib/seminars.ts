import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const seminarsDirectory = path.join(process.cwd(), 'content/seminars')

export interface Seminar {
  slug: string
  title: string
  since?: string
  description?: string
  order: number
}

export function getAllSeminars(locale: Locale = defaultLocale): Seminar[] {
  try {
    if (!fs.existsSync(seminarsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(seminarsDirectory)
    const allSeminars = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(seminarsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          order: 0,
          ...data,
          slug,
          description: pickLocalized(data, 'description', locale),
        } as unknown as Seminar
      })

    return allSeminars.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error reading seminars:', error)
    return []
  }
}
