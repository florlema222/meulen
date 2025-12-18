import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const newsDirectory = path.join(process.cwd(), 'content/news')

export interface NewsItem {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  image?: string
  author?: string
}

export function getAllNews(): NewsItem[] {
  try {
    if (!fs.existsSync(newsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(newsDirectory)
    const allNews = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(newsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        return {
          slug,
          body: content,
          ...data,
        } as NewsItem
      })

    return allNews.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  } catch (error) {
    console.error('Error reading news:', error)
    return []
  }
}

export function getRecentNews(limit: number = 3): NewsItem[] {
  const allNews = getAllNews()
  return allNews.slice(0, limit)
}
