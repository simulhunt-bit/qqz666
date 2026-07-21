# Qartibe: Next.js + Tailwind CSS Site (Production, SEO-Ready, Admin Editor)

A Next.js + Tailwind CSS build of the Qartibe digital marketing agency site, including a left
slide-out navigation drawer, full on-page SEO, a sitemap, robots.txt, a favicon built from the
brand logo, and an `/admin` page for editing content without touching code, no login required.

## Stack
- Next.js 14 (Pages Router)
- React 18
- Tailwind CSS 3

## Getting started

```bash
npm install
npm run dev
```

Then open:
- **http://localhost:3000** — the public site
- **http://localhost:3000/admin** — the content editor
- **http://localhost:3000/sitemap.xml** — generated sitemap
- **http://localhost:3000/robots.txt** — generated robots file

## SEO setup

All SEO fields are editable from `/admin` under the "SEO" section, or directly in
`data/content.json` under the `seo` key:

- `title`: the `<title>` tag and Open Graph/Twitter title
- `description`: meta description and social preview text
- `keywords`: target keyword list (comma-separated in meta, one per line in `/admin`)
- `siteUrl`: canonical domain used across meta tags, JSON-LD, and the sitemap

**What's included:**
- `<title>`, meta description, meta keywords, canonical URL
- Open Graph and Twitter Card tags (for link previews on Facebook, WhatsApp, Twitter/X, LinkedIn)
- JSON-LD structured data (`ProfessionalService` schema) with business name, description,
  address (Dhaka, BD), contact info, and services offered, so Google can show rich results
- `/sitemap.xml`, generated dynamically from `seo.siteUrl` in `data/content.json`
- `/robots.txt`, generated dynamically, allows all crawling except `/admin` and `/api`
- `/admin` is set to `noindex, nofollow` via both meta tag and response header, so it never
  shows up in search results
- Favicon, Apple touch icon, and web app manifest icons all use `public/logo.png`

**Target keywords baked into the default copy:** digital marketing agency Bangladesh, digital
marketing agency Dhaka, SEO agency Bangladesh, Meta ads agency Bangladesh, social media
marketing Bangladesh, website design company Dhaka, and related local/service variants. Update
these in `/admin` as your real service area or offerings change.

**Before going live:**
1. Update `seo.siteUrl` in `/admin` (or `data/content.json`) to your real production domain.
2. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
3. Verify the JSON-LD output with Google's Rich Results Test once deployed.

## Work pages (case studies) with auto-SEO

Each entry in the "Our Work" section on the homepage now has its own real page at
`/work/{slug}`, editable from `/admin` under "Case Studies / Work" (still edited as JSON, since
it's an array of objects, but every save auto-generates what it can):

- **URL slug**: generated from the case study's `title` if you don't set one
- **Page SEO title & description**: generated from `title`, `metric`, and `desc`
- **Sitemap entry**: every case study automatically gets a `<url>` entry in `/sitemap.xml`, no
  manual step

**To add a new case study page:** in `/admin`, copy an existing object inside the "Case Studies /
Work" JSON, edit `tag`, `metric`, `title`, `desc`, and optionally `body` (a longer paragraph
shown on its dedicated page), then save. A new `/work/{slug}` page, its SEO tags, and its sitemap
entry all appear automatically, no rebuild or extra config needed.

**To override the auto-generated SEO for one entry:** add `"seoLocked": true` plus your own
`"seoTitle"` and `"seoDescription"` fields to that case study object. With `seoLocked` set, future
saves won't overwrite those two fields.



The homepage reads its content from `data/content.json` on every request, so anything you save in
`/admin` shows up immediately on a page reload, no rebuild needed.

There's no login. `/admin` opens straight into the editor, no password required, so it's quick to
use. **Heads up:** anyone who knows the `/admin` URL can edit the site content, since there's no
login gate. If that matters for your setup, either keep the URL unlisted, restrict access at your
hosting layer (e.g. a reverse proxy rule or your host's password protection feature), or ask to
have simple auth added back in.

In `/admin` you can edit:
- SEO title, description, keywords, and site URL
- Hero headline, subtext, and stat
- Ticker items (one per line)
- About text and video embed URL
- Contact info (WhatsApp, email, location)
- Services, Case Studies, Reviews, Pricing, FAQ, and Team, edited as JSON (keeps the structure
  flexible without needing a form for every field)

## Project structure

```
qartibe-nextjs/
├── components/
│   ├── Seo.js          # Meta tags, Open Graph, Twitter Card, JSON-LD, favicon
│   └── ...              # All page sections (Header, Hero, Services, etc.)
├── data/
│   └── content.json    # All editable site content, including SEO fields
├── lib/
│   └── autoSeo.js       # Auto slug + SEO title/description generation
├── pages/
│   ├── api/
│   │   └── content.js  # GET (read) / POST (write) content.json, open, no auth
│   ├── work/
│   │   └── [slug].js    # One page per case study, auto-SEO'd
│   ├── admin.js         # Admin content editor
│   ├── index.js          # Public homepage
│   ├── sitemap.xml.js    # Dynamic sitemap (includes every /work/ page)
│   ├── robots.txt.js     # Dynamic robots.txt
│   ├── _app.js
│   └── _document.js
├── public/
│   ├── logo.png          # Used as favicon, apple-touch-icon, and OG image
│   └── site.webmanifest
├── styles/
│   └── globals.css
├── tailwind.config.js
└── next.config.js
```

## Deploying (production)

```bash
npm install
npm run build
npm run start
```

Because the admin editor writes to `data/content.json` on the server's filesystem, it needs a
persistent Node.js server. It will **not** work with `next export`, and on serverless platforms
(e.g. Vercel) the filesystem is read-only/ephemeral at request time, so saved edits will not
persist between deployments. For a production admin workflow on serverless hosting, swap the
API route's `fs.readFileSync` / `fs.writeFileSync` calls for a database or headless CMS.

For a simple deploy that just needs the public site (no live admin editing), any Next.js host
(Vercel, Netlify, a VPS with `npm run build && npm start`) works out of the box, sitemap and
robots.txt included.

## Notes
- WhatsApp number, video embeds, Trustpilot widget, and team photos are placeholders. Replace
  with real values in `/admin` or directly in `data/content.json`.
- Colors and fonts are defined in `tailwind.config.js` under `theme.extend`.
