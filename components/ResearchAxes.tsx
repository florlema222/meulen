import Image from 'next/image'
import { getDictionary, type Locale } from '@/lib/i18n'

const AXIS_ICONS = [
  '/images/icons/hoja.png',
  '/images/icons/rio.png',
  '/images/icons/lupa.png',
]

export default function ResearchAxes({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const axes = t.whatWeDo.axes.map((axis, index) => ({
    ...axis,
    icon: AXIS_ICONS[index],
  }))

  return (
    <section id="que-hacemos" className="py-16 px-4 bg-white/70 section-elevated">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-playfair font-bold text-meulen-dark-brown mb-4 text-center">
          {t.whatWeDo.title}
        </h2>
        <p className="text-lg text-meulen-dark-brown/80 text-center max-w-4xl mx-auto mb-12 leading-relaxed">
          {t.whatWeDo.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto mb-16">
          {axes.map((axis) => (
            <div key={axis.title} className="text-center">
              <Image
                src={axis.icon}
                alt={axis.title}
                width={160}
                height={160}
                className="w-32 h-32 object-contain mx-auto mb-5"
              />
              <h3 className="font-playfair text-xl font-bold text-meulen-dark-brown mb-3">
                {axis.title}
              </h3>
              <p className="text-meulen-dark-brown/80 leading-relaxed">
                {axis.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
