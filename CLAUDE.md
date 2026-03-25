# Proyecto Meulen

Next.js 16 static site for a Latin American socio-ecological justice research group at UNL (Universidad Nacional del Litoral).

## Architecture
- **Framework**: Next.js 16 with static export (`output: 'export'`)
- **CMS**: Decap CMS (git-based) at `/admin/`, config in `public/admin/config.yml`
- **Hosting**: Netlify with auto-deploy on push, config in `netlify.toml`
- **Styling**: Tailwind CSS with custom `meulen` color palette
- **Content**: Markdown files in `content/` parsed with `gray-matter` at build time

## Content Collections
| Collection | Folder | Data Loader |
|-----------|--------|-------------|
| Carousel | `content/carousel/` | `lib/carousel.ts` |
| Publications | `content/publications/` | `lib/publications.ts` |
| Events | `content/events/` | `lib/events.ts` |
| News | `content/news/` | `lib/news.ts` |
| Team | `content/team/` | `lib/team.ts` |
| Acampes | `content/acampes/` | `lib/acampes.ts` |

## Key Design Decisions
- Leaflet map (`components/ExtensionMap.tsx`) requires `ssr: false` via wrapper component (`ExtensionMapWrapper.tsx`) because it accesses `window`
- Leaflet CSS loaded via CDN in `layout.tsx` head
- Leaflet marker icons loaded from unpkg CDN to avoid bundler path issues
- Navbar uses semi-transparent cream background (`#f5e6d34d`) with `backdrop-blur-sm`
- TeamCarousel handles empty state (no photos) with gradient fallback
- Static hero replaced the original rotating carousel; carousel content files remain but are unused

## CMS Auth (Production)
- Netlify Identity + Git Gateway
- Users invited via Netlify Identity dashboard
- Admin panel at `https://<site>.netlify.app/admin/`

## Commands
```bash
npm run dev    # Development server
npm run build  # Static build to /out
npm run lint   # Linting
```
