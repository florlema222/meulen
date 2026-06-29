import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const projectsDirectory = path.join(process.cwd(), 'content/projects')

export type ProjectScope = 'Nacional' | 'Internacional'

export interface Project {
  slug: string
  title: string
  scope: ProjectScope
  period?: string
  funding?: string
  summary?: string
  image?: string
  order: number
}

export function getAllProjects(locale: Locale = defaultLocale): Project[] {
  try {
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(projectsDirectory)
    const allProjects = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(projectsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          order: 0,
          ...data,
          slug,
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          summary: pickLocalized(data, 'summary', locale),
        } as unknown as Project
      })

    return allProjects.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error reading projects:', error)
    return []
  }
}
