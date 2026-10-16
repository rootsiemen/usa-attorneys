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
} from "@/lib/data";
import { Faq } from "@/components/Faq";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return PRACTICE_AREAS.map((p) => ({ practice: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { practice: string };
}): Metadata {
  const p = getPractice(params.practice);
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

export default function PracticePage({
  params,
}: {
  params: { practice: string };
}) {
  const p = getPractice(params.practice);
  if (!p) notFound();
  const url = `${SITE_URL}/${p.slug}`;

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
