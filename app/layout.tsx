import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Proyecto Meulen',
  description: 'Investigamos justicias e injusticias socioecológicas con perspectiva latinoamericana e interdisciplinar.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="font-cormorant antialiased">
        {children}
      </body>
    </html>
  )
}
