import type { Metadata } from 'next'
import Script from 'next/script'
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
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body className="font-cormorant antialiased">
        {children}
        <Script id="netlify-identity-redirect" strategy="afterInteractive">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
