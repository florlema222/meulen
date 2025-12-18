import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getAllPublications(): Publication[] {
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
          slug,
          content,
          ...data,
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

export function getFeaturedPublications(): Publication[] {
  const allPublications = getAllPublications()
  return allPublications.filter(pub => pub.featured)
}
