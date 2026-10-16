import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  PRACTICE_AREAS,
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
    title: `${p.title} Near You — What They Do, Fees & FAQs (2026)`,
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

export default function PracticePage({
  params,
}: {
  params: { practice: string };
}) {
  const p = getPractice(params.practice);
  if (!p) notFound();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: p.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> {p.title}
          </div>
          <h1>
            {p.title} <span>Near You</span>
          </h1>
          <p>{p.intro}</p>
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
