import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const teamDirectory = path.join(process.cwd(), 'content/team')

export interface TeamMember {
  slug: string
  name: string
  role: string
  bio?: string
  email?: string
  photo?: string
  order: number
}

export function getAllTeamMembers(): TeamMember[] {
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
          slug,
          ...data,
        } as TeamMember
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0))

    return allMembers
  } catch (error) {
    console.error('Error reading team members:', error)
    return []
  }
}
