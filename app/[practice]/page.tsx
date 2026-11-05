import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  PRACTICE_AREAS,
  ALL_STATES,
  DISCLAIMER,
  getPractice,
  getState,
} from "@/lib/data";
import { getAttorneysByPractice } from "@/lib/attorneys-db";
import { Faq } from "@/components/Faq";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return PRACTICE_AREAS.map((p) => ({ practice: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ practice: string }>;
}): Promise<Metadata> {
  const p = getPractice((await params).practice);
  if (!p) return {};
  const url = `${SITE_URL}/${p.slug}`;
  return {
    title: `${p.title}: Fees & FAQs`,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${p.title} | ${SITE_NAME}`,
      description: p.metaDescription,
      url,
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
}

/**
 * Blog cost / hiring guides linked from each practice page, so internal
 * linking runs both ways (blog → practice and practice → blog).
 * Business lawyer's cost post is linked prominently from its fees section
 * via costGuideLink in the data, so it is not repeated here.
 */
const COST_GUIDES: Record<string, { href: string; anchor: string }[]> = {
  "personal-injury-lawyer": [
    {
      href: "/blog/personal-injury-lawyer-contingency-fee-math",
      anchor: "personal injury lawyer fees: the contingency fee math",
    },
    {
      href: "/blog/personal-injury-settlement-timeline-month-by-month",
      anchor: "personal injury settlement timeline, month by month",
    },
    {
      href: "/blog/what-to-do-after-car-accident-legal-checklist",
      anchor: "what to do after a car accident: legal checklist",
    },
  ],
  "divorce-attorney": [
    {
      href: "/blog/how-much-does-divorce-attorney-cost-2026",
      anchor: "how much does a divorce attorney cost",
    },
    {
      href: "/blog/divorce-mediation-vs-litigation-cost-math",
      anchor: "divorce mediation vs litigation: the cost math",
    },
    {
      href: "/blog/questions-to-ask-divorce-attorney-before-hiring",
      anchor: "questions to ask a divorce attorney before hiring",
    },
  ],
  "criminal-defense-attorney": [
    {
      href: "/blog/how-much-does-criminal-defense-attorney-cost-2026",
      anchor: "how much does a criminal defense attorney cost",
    },
    {
      href: "/blog/public-defender-vs-private-criminal-defense-attorney-cost-outcome-math",
      anchor: "public defender vs private attorney: cost and outcome math",
    },
    {
      href: "/blog/questions-to-ask-before-hiring-criminal-defense-attorney",
      anchor: "questions to ask before hiring a criminal defense attorney",
    },
  ],
  "immigration-attorney": [
    {
      href: "/blog/how-much-does-immigration-attorney-cost-2026",
      anchor: "how much does an immigration attorney cost",
    },
    {
      href: "/blog/how-to-choose-immigration-attorney-avoid-notario-scam",
      anchor: "how to choose an immigration attorney and avoid notario scams",
    },
  ],
  "bankruptcy-attorney": [
    {
      href: "/blog/how-much-does-bankruptcy-attorney-cost-2026",
      anchor: "how much does a bankruptcy attorney cost",
    },
    {
      href: "/blog/chapter-7-vs-chapter-13-the-math-that-decides",
      anchor: "Chapter 7 vs Chapter 13: the math that decides",
    },
    {
      href: "/blog/how-to-choose-bankruptcy-attorney",
      anchor: "how to choose a bankruptcy attorney",
    },
  ],
  "estate-planning-attorney": [
    {
      href: "/blog/estate-planning-attorney-fees-will-vs-trust-cost-math",
      anchor: "estate planning attorney fees: will vs trust cost math",
    },
    {
      href: "/blog/probate-attorney-fees-state-by-state-cost-math",
      anchor: "probate attorney fees, state by state",
    },
    {
      href: "/blog/how-to-choose-estate-planning-attorney",
      anchor: "how to choose an estate planning attorney",
    },
  ],
  "dui-attorney": [
    {
      href: "/blog/how-much-does-dui-attorney-cost-2026",
      anchor: "how much does a DUI attorney cost",
    },
    {
      href: "/blog/what-to-do-after-dui-arrest-72-hour-checklist",
      anchor: "what to do after a DUI arrest: the 72-hour checklist",
    },
    {
      href: "/blog/how-to-choose-dui-attorney",
      anchor: "how to choose a DUI attorney",
    },
  ],
  "workers-compensation-attorney": [
    {
      href: "/blog/how-much-does-workers-comp-attorney-cost-2026",
      anchor: "how much does a workers' comp attorney cost",
    },
    {
      href: "/blog/workers-compensation-settlement-payout-math",
      anchor: "workers' compensation settlement payout math",
    },
    {
      href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
      anchor: "what to do after a workplace injury: legal checklist",
    },
  ],
  "real-estate-attorney": [
    {
      href: "/blog/real-estate-attorney-fees-closing-cost-math",
      anchor: "real estate attorney fees at closing, with the math",
    },
    {
      href: "/blog/real-estate-attorney-fees-for-sale-by-owner",
      anchor: "real estate attorney fees for sale by owner (FSBO)",
    },
  ],
  "business-lawyer": [
    {
      href: "/blog/retainer-agreement-clauses-to-read-before-signing",
      anchor: "retainer agreement clauses to read before signing",
    },
    {
      href: "/blog/small-claims-court-vs-hiring-lawyer-dollar-math",
      anchor: "small claims court vs hiring a lawyer: the dollar math",
    },
  ],
  "truck-accident-attorney": [
    {
      href: "/blog/truck-accident-vs-car-accident-lawsuit-differences",
      anchor: "truck accident vs car accident lawsuits: key differences",
    },
    {
      href: "/blog/personal-injury-lawyer-contingency-fee-math",
      anchor: "how contingency fees work in accident cases",
    },
  ],
  "oil-rig-injury-lawyer": [
    {
      href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
      anchor: "what to do after a workplace injury: legal checklist",
    },
    {
      href: "/blog/how-much-does-workers-comp-attorney-cost-2026",
      anchor: "how much does a workers' comp attorney cost",
    },
  ],
  "offshore-accident-lawyer": [
    {
      href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
      anchor: "what to do after a workplace injury: legal checklist",
    },
    {
      href: "/blog/how-much-does-workers-comp-attorney-cost-2026",
      anchor: "how much does a workers' comp attorney cost",
    },
  ],
  "construction-accident-lawyer": [
    {
      href: "/blog/what-to-do-after-workplace-injury-legal-checklist",
      anchor: "what to do after a workplace injury: legal checklist",
    },
    {
      href: "/blog/workers-compensation-settlement-payout-math",
      anchor: "workers' compensation settlement payout math",
    },
  ],
  "mesothelioma-attorney": [
    {
      href: "/blog/personal-injury-lawyer-contingency-fee-math",
      anchor: "how contingency fees work in injury cases",
    },
    {
      href: "/blog/personal-injury-settlement-timeline-month-by-month",
      anchor: "personal injury settlement timeline, month by month",
    },
  ],
  "motorcycle-accident-lawyer": [
    {
      href: "/blog/what-to-do-after-car-accident-legal-checklist",
      anchor: "after a crash: the legal checklist for your first steps",
    },
    {
      href: "/blog/personal-injury-lawyer-contingency-fee-math",
      anchor: "how contingency fees work in accident cases",
    },
  ],
};

/** High-population states for internal linking from practice pages. */
const TOP_STATES = [
  "california",
  "texas",
  "florida",
  "new-york",
  "illinois",
  "pennsylvania",
  "ohio",
  "georgia",
  "north-carolina",
  "michigan",
  "new-jersey",
  "virginia",
];

export default async function PracticePage({
  params,
}: {
  params: Promise<{ practice: string }>;
}) {
  const p = getPractice((await params).practice);
  if (!p) notFound();
  const url = `${SITE_URL}/${p.slug}`;
  // All attorneys in this practice area, ordered exactly like the state
  // pages order theirs (claimed first, then A–Z) — no truncation.
  const attorneys = await getAttorneysByPractice(p.slug);

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  const practiceLabel = (slug?: string) => {
    if (!slug) return undefined;
    const x = PRACTICE_AREAS.find((pa) => pa.slug === slug);
    return x ? x.shortTitle : undefined;
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: p.title, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">{p.title}</span>
          </nav>
          <h1>
            {p.title} <em>Near You</em>
          </h1>
          <p>{p.directAnswer}</p>
        </div>
      </section>

      {attorneys.length > 0 ? (
        <section className="section">
          <div className="container">
            {/* Same attorney contacts list as the state pages: same order
                (claimed first, then A–Z), same compact rows, everyone listed. */}
            <div className="practice-contacts-wrap">
              <aside
                className="state-contacts practice-contacts"
                aria-label={`${p.shortTitle} attorney contacts`}
              >
                <h2>{p.shortTitle} Attorney Contacts</h2>
                <p className="contacts-sub">
                  {attorneys.length}{" "}
                  {attorneys.length === 1 ? "attorney" : "attorneys"} listed.
                  Tap a name for the full profile.
                </p>
                <ul className="state-contact-list">
                  {attorneys.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/attorney/${a.slug}`} className="state-contact">
                        <span className="attorney-avatar" aria-hidden="true">
                          {initials(a.name)}
                        </span>
                        <span className="sc-body">
                          <span className="sc-name">{a.name}</span>
                          <span className="sc-firm">
                            {a.firm ? `${a.firm} · ` : ""}
                            {a.city}
                            {getState(a.state)?.name
                              ? `, ${getState(a.state)!.name}`
                              : ""}
                          </span>
                          {practiceLabel(a.practiceAreas[0]) && (
                            <span className="sc-practice">
                              {practiceLabel(a.practiceAreas[0])}
                            </span>
                          )}
                          {a.phone && <span className="sc-phone">{a.phone}</span>}
                          {a.claimed ? (
                            <span className="sc-badge claimed">✓ Claimed</span>
                          ) : (
                            <span className="sc-badge unclaimed">Unclaimed</span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="state-contacts-cta">
                  <h3>Are You a {p.title}?</h3>
                  <p>
                    Claim your free listing and get found by clients searching
                    for legal help.
                  </p>
                  <Link href="/list-your-firm" className="btn btn-gold">
                    List Your Firm — Free
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      ) : (
        <section className="section">
          <div className="container">
            <div className="cta-banner">
              <h2>Are You a {p.title}?</h2>
              <p>
                No {p.shortTitle.toLowerCase()} attorneys are listed in our
                directory yet. Be the first — claim your free listing and get
                found by clients searching for legal help.
              </p>
              <Link href="/list-your-firm" className="btn btn-navy">
                List Your Firm — Free
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container prose">
          <h2>What a {p.title} Does</h2>
          <ul className="check-list">
            {p.whatTheyDo.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>When You Need a {p.title}</h2>
          <ul>
            {p.whenYouNeed.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h2>How Much Does a {p.title} Cost?</h2>
          <p>{p.fees}</p>
          {p.costGuideLink && (
            <p>
              <Link href={p.costGuideLink.href}>
                <strong>{p.costGuideLink.anchor}</strong> →
              </Link>
            </p>
          )}

          <h2>{p.shortTitle} FAQs</h2>
          <Faq items={p.faqs} />

          {(COST_GUIDES[p.slug] ?? []).length > 0 && (
            <>
              <h2>{p.shortTitle} Cost &amp; Hiring Guides</h2>
              <ul>
                {(COST_GUIDES[p.slug] ?? []).map((g) => (
                  <li key={g.href}>
                    <Link href={g.href}>{g.anchor}</Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <div className="disclaimer">{DISCLAIMER}</div>

          <DevCta />

          <h2>Find a {p.title} by State</h2>
          <p>
            Laws vary by state — choose yours to find attorneys who practice
            where you live:
          </p>
        </div>
        <div className="container">
          <div className="center">
            {TOP_STATES.map((slug) => {
              const s = ALL_STATES.find((st) => st.slug === slug)!;
              return (
                <Link
                  key={slug}
                  href={`/attorneys/${slug}`}
                  className="state-pill"
                >
                  {s.name}
                </Link>
              );
            })}
          </div>
          <p className="center mt-2">
            <Link href="/attorneys">View all 50 states →</Link>
          </p>
        </div>
        <div className="container prose">
          <div className="cta-banner">
            <h2>Are You a {p.title}?</h2>
            <p>
              Get listed where clients are already looking. Claim your free
              attorney listing in minutes.
            </p>
            <Link href="/list-your-firm" className="btn btn-navy">
              List Your Firm — Free
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
