'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { CarouselSlide } from '@/lib/carousel'
import { getDictionary, type Locale } from '@/lib/i18n'

export default function TeamCarousel({ slides, locale }: { slides: CarouselSlide[]; locale: Locale }) {
  const t = getDictionary(locale)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section id="nosotros" className="relative min-h-[600px] overflow-hidden">
      {/* Background: carousel images or gradient fallback */}
      {slides.length > 0 ? (
        slides.map((slide, index) => (
          <div
            key={slide.slug}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-meulen-dark-brown/60"></div>
            </div>
          </div>
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-meulen-dark-brown via-meulen-brown to-meulen-brown-light"></div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-[600px] px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Image
            src="/images/meulen-logo-full.png"
            alt="Proyecto Meulen"
            width={120}
            height={120}
            className="mx-auto w-28 h-auto mb-8"
          />
          <h2 className="text-4xl font-playfair font-bold text-white mb-8">
            {t.about.title}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            {t.about.p1}
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            {t.about.p2}
          </p>
        </div>
      </div>

      {/* Navigation dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  )
}
