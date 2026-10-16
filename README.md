# USA Attorneys — usaattorneys.company

Free US attorney directory: 50 state pages + 10 practice-area guides, with
attorney listing lead capture that doubles as a web-dev lead funnel.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Plain CSS (no framework) — fast, mobile-responsive
- Fully static pages (`generateStaticParams`) — Vercel-ready

## Pages

| Route | Description |
|---|---|
| `/` | Homepage: hero search, practice areas, how-it-works, states |
| `/attorneys` | All 50 states index |
| `/attorneys/[state]` | 50 state pages (intro, practice links, FAQ) |
| `/[practice]` | 10 practice-area guides (fees, FAQs, disclaimer) |
| `/about`, `/contact`, `/privacy-policy`, `/terms` | Trust pages (AdSense-ready) |
| `/list-your-firm` | Free listing lead-capture form (mailto) |

## SEO

- Per-page title/meta/canonical + OG tags
- JSON-LD: `WebSite` (home), `FAQPage` (state + practice pages)
- `sitemap.xml` (67 URLs) + `robots.txt`
- `public/ads.txt` — **replace `pub-0000000000000000` with the real AdSense
  publisher ID before launch**

## Local dev

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Push to GitHub (already at `rootsiemen/usa-attorneys`)
2. Import repo in Vercel
3. Point `usaattorneys.company` DNS to Vercel (A `76.76.21.21` or CNAME `cname.vercel-dns.com`)
4. Add domain in Vercel project settings

## Notes

- No fake attorney profiles anywhere — info pages + "claim your listing" CTAs only.
- Forms use `mailto:` (no backend) in v1.
