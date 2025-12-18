'use client'

import { useState, useEffect } from 'react'
import type { CarouselSlide } from '@/lib/carousel'

export default function HeroCarousel({ slides }: { slides: CarouselSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (slides.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  if (slides.length === 0) {
    // Fallback to default hero if no slides
    return (
      <section className="relative bg-gradient-to-br from-meulen-cream via-meulen-beige to-meulen-brown-light py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-meulen-dark-brown rounded-full flex items-center justify-center">
                <span className="text-4xl text-white font-playfair">M</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-bold text-meulen-dark-brown mb-6">
              Proyecto Meulen
            </h1>
            <p className="text-xl md:text-2xl text-meulen-dark-brown/80 max-w-3xl mx-auto leading-relaxed">
              Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.
            </p>
            <div className="mt-8 text-sm text-meulen-dark-brown/70">
              <p>Facultad de Ciencias Jurídicas y Sociales</p>
              <p>Universidad Nacional del Litoral</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <span className="text-4xl font-playfair">M</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 drop-shadow-lg">
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                  {slide.subtitle}
                </p>
              )}
              <div className="mt-8 text-sm text-white/90">
                <p>Facultad de Ciencias Jurídicas y Sociales</p>
                <p>Universidad Nacional del Litoral</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Arrow Navigation (optional, for manual control) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition z-10"
            aria-label="Slide anterior"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition z-10"
            aria-label="Siguiente slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </section>
  )
}
