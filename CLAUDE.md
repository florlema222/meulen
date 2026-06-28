# Proyecto Meulen

Next.js 16 static site for a Latin American socio-ecological justice research group at UNL (Universidad Nacional del Litoral).

## Architecture
- **Framework**: Next.js 16 with static export (`output: 'export'`)
- **CMS**: Decap CMS (git-based) at `/admin/`, config in `public/admin/config.yml`
- **Hosting**: Netlify with auto-deploy on push, config in `netlify.toml`
- **Styling**: Tailwind CSS with custom `meulen` color palette
- **Content**: Markdown files in `content/` parsed with `gray-matter` at build time

## Internationalization (ES / EN / PT)
Trilingual site with Spanish as default. UI strings are fully translated; per-item content translation is optional with Spanish fallback.
- **Locales & dictionaries**: `lib/i18n.ts` holds the `Locale` type, all UI strings per locale, vocab maps (publication/event types), date-format locales, and `pickLocalized`/`localizeVocab` helpers. Pure module (no `fs`) so it imports into both server and client components.
- **Routing**: Spanish at `/`, English at `/en/`, Portuguese at `/pt/`. Three thin route files (`app/page.tsx`, `app/en/page.tsx`, `app/pt/page.tsx`) each render the shared `components/HomePage.tsx` with a `locale` prop and export localized metadata + hreflang alternates. `trailingSlash: true` makes locale URLs emit as `en/index.html`.
- **Optional content translation**: markdown frontmatter holds nested `en:` / `pt:` objects (e.g. `en: { title, summary }`). Data loaders take a `locale` arg and call `pickLocalized`, which returns the translated field or falls back to the Spanish base field. Body-text translation is not needed — the homepage only renders frontmatter summaries/excerpts, not article bodies.
- **`<html lang>`**: the root layout renders a static `lang="es"` (Next.js only allows `<html>` in the root layout, which can't see the route locale). `components/HtmlLang.tsx` corrects it client-side per route; crawlers get correct per-language signals via hreflang alternates.
- **CMS**: each translatable collection in `public/admin/config.yml` has collapsed, optional `en`/`pt` object fields so editors add translations when available.

## Content Collections
| Collection | Folder | Data Loader |
|-----------|--------|-------------|
| Carousel | `content/carousel/` | `lib/carousel.ts` |
| Publications | `content/publications/` | `lib/publications.ts` |
| Events | `content/events/` | `lib/events.ts` |
| News | `content/news/` | `lib/news.ts` |
| Team | `content/team/` | `lib/team.ts` |
| Acampes | `content/acampes/` | `lib/acampes.ts` |
| Projects | `content/projects/` | `lib/projects.ts` |
| Seminars | `content/seminars/` | `lib/seminars.ts` |
| Courses | `content/courses/` | `lib/courses.ts` |

## Secondary Pages
Besides the home page and `/equipo` (team), the navbar "Qué Hacemos" item is a dropdown to three dedicated pages, each with ES/EN/PT route files and hreflang alternates:
- `/investigacion` (`InvestigacionSection`) — Projects (Nacional/Internacional) + Producciones tabs
- `/extension` (`ExtensionSection`) — outreach intro, Acampe project, participating institutions, and `AcampesSection` (a "línea histórica" timeline + camp cards, each showing up to 3 photos from the CMS `acampes` collection; the same data feeds the home-page map)
- `/formacion` (`FormacionSection`) — Seminars + Courses tabs

`components/Subpage.tsx` provides shared chrome (HtmlLang + Navbar + topographic background + Footer); `components/Tabs.tsx` is a client component that renders server-rendered panels as "solapas". Long intro prose lives as Spanish constants in the section components (content with Spanish fallback on EN/PT); short structural labels live in `lib/i18n.ts` under `quehacemos`.

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
