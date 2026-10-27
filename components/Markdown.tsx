import ReactMarkdown from 'react-markdown'

/**
 * Bare URL at the start of the text or after whitespace. Requiring that
 * prefix skips URLs already inside markdown link syntax (`](url)`, `[url]`,
 * `<url>`); the last character excludes trailing sentence punctuation.
 */
const BARE_URL = /(^|\s)(https?:\/\/[^\s<>]*[^\s<>.,;:!?'")\]])/g

/**
 * Wraps bare URLs in CommonMark autolink brackets so they render as links.
 * Editors often paste URLs as plain text in the CMS, and plain CommonMark only
 * links URLs written as `<url>`.
 */
function autolinkBareUrls(text: string): string {
  return text.replace(BARE_URL, '$1<$2>')
}

/**
 * Renders CMS markdown inside cards. Links open in a new tab because the card
 * lives on a listing page the reader would otherwise lose; images are kept
 * within the card width.
 */
export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        // A link showing its own URL may break at any character: otherwise the
        // URL jumps whole to the next line and the justified line before it
        // stretches its word gaps across the card.
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-meulen-brown underline ${children === href ? 'break-all' : ''}`}
          >
            {children}
          </a>
        ),
        // eslint-disable-next-line @next/next/no-img-element
        img: ({ src, alt }) => <img src={typeof src === 'string' ? src : undefined} alt={alt ?? ''} className="max-w-full rounded" />,
      }}
    >
      {autolinkBareUrls(children)}
    </ReactMarkdown>
  )
}
