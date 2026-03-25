import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const acampesDirectory = path.join(process.cwd(), 'content/acampes')

export interface Acampe {
  slug: string
  title: string
  lat: number
  lng: number
  description?: string
  photos: string[]
}

export function getAllAcampes(): Acampe[] {
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
        } as unknown as Acampe
      })

    return allAcampes
  } catch (error) {
    console.error('Error reading acampes:', error)
    return []
  }
}
