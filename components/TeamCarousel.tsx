'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { CarouselSlide } from '@/lib/carousel'

export default function TeamCarousel({ slides }: { slides: CarouselSlide[] }) {
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
            Nosotros
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-6">
            Meulen es un grupo interdisciplinario de investigación con sede en el Centro de Investigaciones de la Facultad de Ciencias Jurídicas y Sociales de la Universidad Nacional del Litoral (UNL). Bajo la dirección de la Dra. María Valeria Berros y el Dr. Nicolás Cordini, nuestro equipo ha consolidado una trayectoria dedicada a la renovación y profundización de los aportes jurídicos sobre la crisis ecológica en clave latinoamericana.
          </p>
          <p className="text-lg text-white/90 leading-relaxed">
            Nuestro equipo está integrado por profesionales de la antropología, historia, ciencia política, sociología y diversas áreas del derecho, unidos por la necesidad de analizar las innovaciones jurídicas que emergen en nuestra región ante la crisis ambiental global.
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
