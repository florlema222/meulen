import ReactMarkdown from 'react-markdown'

/**
 * Renders CMS markdown inside cards. Links open in a new tab because the card
 * lives on a listing page the reader would otherwise lose; images are kept
 * within the card width.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-meulen-brown underline">
            {children}
          </a>
        ),
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ src, alt }) => <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} className="max-w-full rounded" />,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
