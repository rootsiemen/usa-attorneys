# USA Attorneys — Build Log

**Site:** usaattorneys.company (domain purchased 2026-10-16)
**Repo:** https://github.com/rootsiemen/usa-attorneys
**Stack:** Next.js 14.2.35 (App Router) · React 18 · TypeScript · plain CSS
**Build:** `npm run build` ✅ — 72 static pages, 0 errors
**Date:** 2026-10-16

## Page inventory (67 URLs in sitemap)

| Route | Count | Notes |
|---|---|---|
| `/` | 1 | Hero search (state + practice), practice cards, how-it-works, all 50 state pills, attorney CTA |
| `/attorneys` | 1 | All 50 states index |
| `/attorneys/[state]` | 50 | Unique 300+ word intro, how-to-choose, fee guide, 10 practice links, 4 FAQs, CTAs |
| `/[practice]` | 10 | Direct-answer definition, what-they-do, when-you-need, fees, 4 FAQs, top-states links |
| `/about`, `/contact`, `/privacy-policy`, `/terms` | 4 | AdSense trust pages |
| `/list-your-firm` | 1 | Free listing lead form (mailto) + "need a website?" checkbox → web-dev funnel |

No fake attorney profiles anywhere — info pages + claim-listing CTAs only.

## SEO checklist ("SEO full karna")

- [x] Visible breadcrumb nav + **BreadcrumbList JSON-LD** on all 50 state + 10 practice pages
- [x] **FAQPage JSON-LD** on all 60 FAQ pages (4 Q&As each; answers 40–60 words)
- [x] WebSite JSON-LD on homepage
- [x] Exactly one `<h1>` per page; proper h2/h3 hierarchy (audited)
- [x] Alt text: no `<img>` tags used; OG image auto-generated via `opengraph-image.tsx`
- [x] Internal linking: every state page → all 10 practice areas; every practice page → 12 top states + "all 50"; homepage → all states + all practices; footer links
- [x] `llms.txt` at root — site description, section guide, key legal facts, sitemap link
- [x] `robots.txt` allows GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, Cohere-ai + sitemap
- [x] Performance: system font stack (no webfont download), minimal client JS (3 small form/search components only), static generation
- [x] 50 unique state intros (~320 words each: legal-landscape notes + how-to-choose + fee guide) — zero template duplication
- [x] Meta descriptions <160 chars with target keyword, click-worthy; titles <70 chars, unique

## GEO checklist ("GEO bhi karo")

- [x] Direct-answer format: every practice page opens with "What does a X do? …" (2–3 sentences); every state hero has a 2–3 sentence direct answer
- [x] FAQ answers trimmed to 40–60 words (AI snippet-friendly)
- [x] Factual density: contingency percentages, hourly ranges, statute-of-limitations guidance ("varies by state"), state bar associations, real state-law notes (contributory negligence states, community property, no-fault PIP, LA civil law, DE Chancery, SD trusts)
- [x] Brand consistency: "USA Attorneys" in every title/brand slot
- [x] Detailed llms.txt with citable facts section
- [x] No AI-slop markers (grep verified: no "delve", "tapestry", "fast-paced", "game-changer", etc.)
- [x] Disclaimer on every practice + state page: general information, not legal advice

## 12-point past-errors audit (run against production build, 2026-10-16)

| # | Check | Result |
|---|---|---|
| 1 | Canonical = own URL on all 67 pages | ✅ |
| 2 | www vs apex: apex `https://usaattorneys.company` chosen as canonical | ✅ code-side; **www→apex 301 must be set in Vercel domain settings at deploy** |
| 3 | Valid JSON-LD only (WebSite, FAQPage, BreadcrumbList); no SearchAction | ✅ |
| 4 | Server-rendered content (curl-verified text in HTML) | ✅ |
| 5 | Sitemap: 67 URLs, all 200, lastmod present | ✅ |
| 6 | OG tags (title/description/url/type) on all pages | ✅ |
| 7 | `/ads.txt` live (placeholder pub ID) | ✅ |
| 8 | /about, /contact, /privacy-policy, /terms live | ✅ |
| 9 | No duplicate state intros (hash-checked, 0 dup groups) | ✅ |
| 10 | All pages 300+ words | ✅ |
| 11 | Unique titles <70 chars, descriptions <160 chars, none missing | ✅ |
| 12 | robots.txt: allows `/`, sitemap linked, AI bots allowed | ✅ |

**Audit score: 30/30** (script: `/tmp/audit.py`, run against `next start` production server)

## Commits

1. `0a6e30e8` — Initial commit (seed)
2. `6951b190` — Base site: 50 states, 10 practice guides, SEO + AdSense-ready
3. `6ef4633e` — SEO full + GEO expansion, 30/30 audit green (HEAD)

## User must do (deploy checklist)

1. **Vercel:** import `rootsiemen/usa-attorneys`, deploy
2. **DNS:** point `usaattorneys.company` to Vercel (A `76.76.21.21` or CNAME `cname.vercel-dns.com`); add domain in Vercel project settings and set **apex as primary with www→apex redirect**
3. **AdSense:** replace `pub-0000000000000000` in `public/ads.txt` with `pub-9075805757065172`, then add the site in AdSense
4. **Search Console:** add property, submit sitemap
5. Optional: replace `mailto:` forms with a real backend/Resend later
