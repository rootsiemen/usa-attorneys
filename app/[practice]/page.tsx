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
  const attorneys = await getAttorneysByPractice(p.slug, 12);

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
            <h2 style={{ textAlign: "center" }}>
              {p.shortTitle} Attorneys
            </h2>
            <p className="center" style={{ maxWidth: 640, margin: "0 auto 24px" }}>
              Top-rated {p.shortTitle.toLowerCase()} attorneys in our directory.
              Click a profile for contact details.
            </p>
            <div className="grid-3">
              {attorneys.map((a) => (
                <Link
                  key={a.slug}
                  href={`/attorney/${a.slug}`}
                  className="attorney-card"
                >
                  <div className="attorney-avatar" aria-hidden="true">
                    {a.name
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0]?.toUpperCase() ?? "")
                      .join("")}
                  </div>
                  <div>
                    <h3>{a.name}</h3>
                    <p className="firm">
                      {a.firm ? `${a.firm} · ` : ""}
                      {a.city}
                      {getState(a.state)?.name ? `, ${getState(a.state)!.name}` : ""}
                    </p>
                    <p className="meta">
                      {a.phone && <span className="phone">{a.phone}</span>}
                      {a.claimed ? (
                        <span className="badge-claimed">✓ Claimed</span>
                      ) : (
                        <span className="badge-unclaimed">Unclaimed</span>
                      )}
                    </p>
                    <span className="card-link">View Profile →</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="center mt-2">
              <Link href="/attorneys">View all attorneys →</Link>
            </p>
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

          <h2>{p.shortTitle} FAQs</h2>
          <Faq items={p.faqs} />

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
