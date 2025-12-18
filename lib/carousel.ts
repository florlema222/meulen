import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const carouselDirectory = path.join(process.cwd(), 'content/carousel')

export interface CarouselSlide {
  slug: string
  title: string
  subtitle?: string
  image: string
  order: number
  active: boolean
}

export function getAllCarouselSlides(): CarouselSlide[] {
  try {
    if (!fs.existsSync(carouselDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(carouselDirectory)
    const allSlides = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(carouselDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        return {
          slug,
          ...data,
        } as CarouselSlide
      })
      .filter(slide => slide.active !== false) // Only active slides
      .sort((a, b) => a.order - b.order) // Sort by order

    return allSlides
  } catch (error) {
    console.error('Error reading carousel slides:', error)
    return []
  }
}
