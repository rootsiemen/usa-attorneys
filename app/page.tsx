import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, ALL_STATES, PRACTICE_AREAS } from "@/lib/data";
import { StateSearch } from "@/components/StateSearch";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

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

const INSIGHT_SLUGS = [
  "personal-injury-lawyer",
  "divorce-attorney",
  "estate-planning-attorney",
];

export default function HomePage() {
  const insights = INSIGHT_SLUGS.map(
    (slug) => PRACTICE_AREAS.find((p) => p.slug === slug)!
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

      <section className="hero">
        <div className="container">
          <span className="eyebrow">Free U.S. Attorney Directory</span>
          <h1>
            Find a <em>USA Attorney</em> You Can Trust
          </h1>
          <p className="sub">
            Browse qualified attorneys in all 50 states — personal injury,
            divorce, criminal defense, immigration, and more. Free to search,
            free to list.
          </p>
          <StateSearch />
          <div className="hero-badges">
            <span className="hero-badge">50 States Covered</span>
            <span className="hero-badge">10 Practice Areas</span>
            <span className="hero-badge">Free Directory</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Browse by Practice Area</h2>
          <p className="lead">
            Not sure what kind of lawyer you need? Start with your legal issue —
            each guide explains what the attorney does, typical fees, and when
            to hire one.
          </p>
          <div className="grid-3">
            {PRACTICE_AREAS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="card">
                <div className="practice-icon">
                  {PRACTICE_ICONS[p.slug] ?? "⚖️"}
                </div>
                <h3>{p.title}</h3>
                <p>{p.intro.slice(0, 130)}…</p>
                <span className="card-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Why Americans Trust USA Attorneys</h2>
          <p className="lead">
            A directory built for people facing real legal problems — not for
            selling leads.
          </p>
          <ul className="trust-list">
            <li>
              <strong>Free for everyone</strong>
              <span>
                Searching is always free, and attorneys can claim a basic
                listing at no cost.
              </span>
            </li>
            <li>
              <strong>All 50 states covered</strong>
              <span>
                Licensing, courts, and procedures differ by state — start with
                yours.
              </span>
            </li>
            <li>
              <strong>Plain-English legal guides</strong>
              <span>
                Every practice area explains fees, timelines, and the questions
                to ask before you hire.
              </span>
            </li>
            <li>
              <strong>No fake listings</strong>
              <span>
                We never invent attorney profiles. Firms claim and verify
                their own listings.
              </span>
            </li>
          </ul>
          <h2>How It Works</h2>
          <p className="lead">
            Finding the right attorney takes three simple steps.
          </p>
          <div className="steps">
            <div className="step">
              <h3>Pick your state & issue</h3>
              <p>
                Choose your state and the practice area that matches your legal
                problem — from DUI to divorce to business law.
              </p>
            </div>
            <div className="step">
              <h3>Learn what to expect</h3>
              <p>
                Read plain-English guides on fees, timelines, and the questions
                to ask before you hire anyone.
              </p>
            </div>
            <div className="step">
              <h3>Connect with a firm</h3>
              <p>
                Attorneys: claim your free listing so clients in your state can
                find you first.
              </p>
            </div>
          </div>
          <div className="center mt-2">
            <Link href="/attorneys" className="btn btn-burgundy">
              Browse All 50 States
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Latest Insights</h2>
          <p className="lead">
            Practical legal guides — what attorneys do, what they charge, and
            how to choose the right one.
          </p>
          <div className="grid-3">
            {insights.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="card">
                <span className="card-eyebrow">Legal Guide</span>
                <h3>{p.title}</h3>
                <p>{p.intro.slice(0, 140)}…</p>
                <span className="card-link">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2>Find Attorneys by State</h2>
          <p className="lead">
            Attorney licensing and laws vary by state — start with yours.
          </p>
          <div className="center">
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
          <div className="mt-2">
            <DevCta />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <span className="eyebrow">For Attorneys</span>
            <h2>Are You an Attorney?</h2>
            <p>
              Claim your free listing on USA Attorneys and get found by clients
              searching in your state and practice area. Takes two minutes —
              no fees, no catch.
            </p>
            <Link href="/list-your-firm" className="btn btn-burgundy">
              List Your Firm — Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
