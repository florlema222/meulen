import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

const coursesDirectory = path.join(process.cwd(), 'content/courses')

export interface Course {
  slug: string
  title: string
  director?: string
  hours?: string
  description?: string
  order: number
}

export function getAllCourses(locale: Locale = defaultLocale): Course[] {
  try {
    if (!fs.existsSync(coursesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(coursesDirectory)
    const allCourses = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(coursesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          order: 0,
          ...data,
          slug,
          description: pickLocalized(data, 'description', locale),
        } as unknown as Course
      })

    return allCourses.sort((a, b) => a.order - b.order)
  } catch (error) {
    console.error('Error reading courses:', error)
    return []
  }
}
