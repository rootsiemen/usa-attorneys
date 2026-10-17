import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, ALL_STATES, PRACTICE_AREAS } from "@/lib/data";
import { StateSearch } from "@/components/StateSearch";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { getAttorneyCount, getAttorneysByPractice } from "@/lib/attorneys-db";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Find a Qualified Attorney Near You`,
  description:
    "Find qualified attorneys in all 50 states. Browse by practice area — injury, divorce, criminal defense, immigration & more.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Find a Qualified Attorney Near You`,
    description:
      "Browse attorneys by state and practice area. Free directory — attorneys can claim and list their firms.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "USA Attorneys",
      },
    ],
  },
};

const PRACTICE_ICONS: Record<string, string> = {
  "personal-injury-lawyer": "🚗",
  "divorce-attorney": "⚖️",
  "criminal-defense-attorney": "🛡️",
  "immigration-attorney": "🗽",
  "bankruptcy-attorney": "📉",
  "estate-planning-attorney": "📜",
  "dui-attorney": "🚔",
  "workers-compensation-attorney": "🏗️",
  "real-estate-attorney": "🏠",
  "business-lawyer": "💼",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);
  const attorneyCount = await getAttorneyCount();
  const featured = (await getAttorneysByPractice("personal-injury-lawyer", 6)).filter(
    (a) => a.phone
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          description:
            "Directory of attorneys across all 50 US states and major practice areas.",
        }}
      />

      {/* ============ HERO ============ */}
      <section className="hero-light">
        <div className="container">
          <span className="eyebrow">Free U.S. Attorney Directory</span>
          <h1>
            Find the Right Attorney. <em>Without the Guesswork.</em>
          </h1>
          <p className="sub">
            Browse qualified attorneys in all 50 states — personal injury,
            divorce, criminal defense, immigration, and more. Free to search,
            free to list.
          </p>
          <div className="search-panel">
            <StateSearch />
          </div>
          <div className="trust-cards">
            <div className="trust-card">
              <div className="t-icon">✓</div>
              <strong>Free for Everyone</strong>
              <span>
                Searching is always free — and attorneys can claim a basic
                listing at no cost.
              </span>
            </div>
            <div className="trust-card">
              <div className="t-icon">⚖</div>
              <strong>All 50 States Covered</strong>
              <span>
                Licensing, courts, and procedures differ by state — start
                with yours.
              </span>
            </div>
            <div className="trust-card">
              <div className="t-icon">🛡</div>
              <strong>No Fake Listings</strong>
              <span>
                We never invent attorney profiles. Firms claim and verify
                their own listings.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <div className="stat-band">
        <div className="container">
          <div className="stat-grid">
            <div>
              <div className="stat-num">
                {attorneyCount > 0 ? attorneyCount.toLocaleString() : "700+"}
              </div>
              <div className="stat-label">Attorneys Listed</div>
            </div>
            <div>
              <div className="stat-num">50</div>
              <div className="stat-label">States Covered</div>
            </div>
            <div>
              <div className="stat-num">16</div>
              <div className="stat-label">Practice Areas</div>
            </div>
            <div>
              <div className="stat-num">$0</div>
              <div className="stat-label">Cost to Search</div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ PRACTICE AREAS ============ */}
      <section className="section-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Practice Areas</span>
            <h2>What Kind of Lawyer Do You Need?</h2>
            <p>
              Start with your legal issue — each guide explains what the
              attorney does, typical fees, and when to hire one.
            </p>
          </div>
          <div className="practice-grid">
            {PRACTICE_AREAS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="practice-card">
                <div className="practice-icon">
                  {PRACTICE_ICONS[p.slug] ?? "⚖️"}
                </div>
                <h3>{p.title}</h3>
                <p>{p.intro.slice(0, 120)}…</p>
                <span className="card-link">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED ATTORNEYS ============ */}
      {featured.length > 0 && (
        <section className="section-light alt">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Featured Attorneys</span>
              <h2>Attorneys Ready to Help</h2>
              <p>
                Real, listed attorneys across the country — call directly or
                view the full profile.
              </p>
            </div>
            <div className="practice-grid">
              {featured.map((a) => (
                <Link
                  key={a.slug}
                  href={`/attorney/${a.slug}`}
                  className="attorney-feature"
                >
                  <div className="af-top">
                    <span className="attorney-avatar">
                      {initials(a.name)}
                    </span>
                    <div>
                      <h3>{a.name}</h3>
                      <p className="firm">
                        {[a.city, a.state].filter(Boolean).join(", ")}
                      </p>
                    </div>
                  </div>
                  {a.firm && <p className="af-meta">{a.firm}</p>}
                  <span className="af-phone">📞 {a.phone}</span>
                  <span className="af-cta">View Profile →</span>
                </Link>
              ))}
            </div>
            <div className="center mt-2">
              <Link href="/attorneys" className="btn btn-gold">
                Browse All Attorneys
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ============ HOW IT WORKS ============ */}
      <section className="section-light">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How It Works</span>
            <h2>Three Steps to the Right Lawyer</h2>
          </div>
          <div className="steps steps-light">
            <div className="step">
              <h3>Pick your state &amp; issue</h3>
              <p>
                Choose your state and the practice area that matches your
                legal problem — from DUI to divorce to business law.
              </p>
            </div>
            <div className="step">
              <h3>Learn what to expect</h3>
              <p>
                Read plain-English guides on fees, timelines, and the
                questions to ask before you hire anyone.
              </p>
            </div>
            <div className="step">
              <h3>Connect with a firm</h3>
              <p>
                Call the attorney directly — no middlemen, no referral fees,
                no lead-selling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ BROWSE BY STATE ============ */}
      <section className="section-light alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse by State</span>
            <h2>Find Attorneys in Your State</h2>
            <p>
              Attorney licensing and laws vary by state — start with yours.
            </p>
          </div>
          <div className="center state-pills-light">
            {ALL_STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/attorneys/${s.slug}`}
                className="state-pill"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BLOG (light band) ============ */}
      {latestPosts.length > 0 && (
        <section className="section">
          <div className="container">
            <h2>Latest from the Blog</h2>
            <p className="lead">
              Fresh legal guides — how to hire the right lawyer, what it
              costs, and what to do when trouble hits.
            </p>
            <div className="grid-3">
              {latestPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
                  <span className="card-eyebrow">{p.practiceAreaTitle}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description.slice(0, 140)}…</p>
                  <div className="post-meta">
                    <span>{formatPostDate(p.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.readingMinutes} min read</span>
                  </div>
                  <span className="card-link">Read article →</span>
                </Link>
              ))}
            </div>
            <div className="center mt-2">
              <Link href="/blog" className="btn btn-navy">
                View All Articles
              </Link>
            </div>
            <div className="mt-2">
              <DevCta />
            </div>
          </div>
        </section>
      )}

      {/* ============ ATTORNEY CTA ============ */}
      <section className="section-light">
        <div className="container">
          <div className="cta-gold">
            <span className="eyebrow">For Attorneys</span>
            <h2>Are You an Attorney?</h2>
            <p>
              Claim your free listing on USA Attorneys and get found by
              clients searching in your state and practice area. Takes two
              minutes — no fees, no catch.
            </p>
            <Link href="/list-your-firm" className="btn">
              List Your Firm — Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
