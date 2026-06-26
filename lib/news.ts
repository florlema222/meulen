import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { defaultLocale, pickLocalized, type Locale } from './i18n'

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

export function getAllNews(locale: Locale = defaultLocale): NewsItem[] {
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
          ...data,
          slug,
          body: content,
          // Translatable fields fall back to Spanish when missing.
          title: pickLocalized(data, 'title', locale),
          excerpt: pickLocalized(data, 'excerpt', locale),
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

export function getRecentNews(limit: number = 3, locale: Locale = defaultLocale): NewsItem[] {
  const allNews = getAllNews(locale)
  return allNews.slice(0, limit)
}
