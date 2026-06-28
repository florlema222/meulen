import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const teamDirectory = path.join(process.cwd(), 'content/team')

/** "Responsables" (people in charge) vs "Equipo" (rest of the team). */
export type TeamCategory = 'Responsables' | 'Equipo'

export interface TeamMember {
  slug: string
  name: string
  category: TeamCategory
  description?: string
  photo?: string
  order: number
}

export function getAllTeamMembers(locale: Locale = defaultLocale): TeamMember[] {
  try {
    if (!fs.existsSync(teamDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(teamDirectory)
    const allMembers = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(teamDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          ...data,
          slug,
          // Translatable field falls back to Spanish when missing.
          description: pickLocalized(data, 'description', locale),
        } as TeamMember
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0))

    return allMembers
  } catch (error) {
    console.error('Error reading team members:', error)
    return []
  }
}
