import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  ALL_STATES,
  PRACTICE_AREAS,
  STATE_FAQ_SETS,
  DISCLAIMER,
  getState,
} from "@/lib/data";
import { Faq } from "@/components/Faq";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return ALL_STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { state: string };
}): Metadata {
  const state = getState(params.state);
  if (!state) return {};
  const url = `${SITE_URL}/attorneys/${state.slug}`;
  const description = `Find ${state.name} attorneys. Browse lawyers by practice area — injury, divorce, criminal defense & more. Free directory.`;
  return {
    title: `${state.name} Attorney Guide — Find a Lawyer`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${state.name} Attorney Guide | ${SITE_NAME}`,
      description,
      url,
      type: "website",
    },
  };
}

export default function StatePage({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) notFound();

  const stateIndex = ALL_STATES.findIndex((s) => s.slug === state.slug);
  const faqs = STATE_FAQ_SETS[stateIndex % STATE_FAQ_SETS.length](state.name);
  const url = `${SITE_URL}/attorneys/${state.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Attorneys by State",
        item: `${SITE_URL}/attorneys`,
      },
      { "@type": "ListItem", position: 3, name: `${state.name} Attorneys`, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
            <Link href="/attorneys">Attorneys by State</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">{state.name}</span>
          </nav>
          <h1>
            {state.name} <em>Attorneys</em>
          </h1>
          <p>
            Looking for an attorney in {state.name}? Start with your legal
            issue below — each guide explains what {state.region} lawyers do,
            what they charge, and the questions to ask before you hire.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <h2>Finding a Lawyer in {state.name}</h2>
          {state.intro.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <h2>How to Choose the Right {state.name} Attorney</h2>
          <p>{state.finding}</p>

          <h2>What Attorneys Cost in {state.name}</h2>
          <p>{state.fees}</p>

          <h2>Legal Aid & Free Help in {state.name}</h2>
          <p>{state.legalAid}</p>

          <h2>How the {state.name} Court System Works</h2>
          <p>{state.courtSystem}</p>

          <h2>Notable {state.name} Laws to Know</h2>
          <p>{state.notableLaws}</p>

          <h2>{state.name} Attorneys by Practice Area</h2>
          <p>
            Select the legal issue closest to yours. Every guide below covers
            what these lawyers do, typical fees, and frequently asked
            questions.
          </p>
        </div>
        <div className="container">
          <div className="grid-3">
            {PRACTICE_AREAS.map((p) => (
              <Link key={p.slug} href={`/${p.slug}`} className="card">
                <h3>
                  {state.name} {p.title}
                </h3>
                <p>{p.directAnswer}</p>
                <span className="card-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container prose">
          <h2 style={{ textAlign: "center" }}>{state.name} Attorney FAQs</h2>
          <Faq items={faqs} />
          <div className="disclaimer">{DISCLAIMER}</div>
          <DevCta />
          <div className="cta-banner">
            <h2>Are You a {state.name} Attorney?</h2>
            <p>
              Claim your free listing and get found by clients searching for
              legal help in {state.name}.
            </p>
            <Link href="/list-your-firm" className="btn btn-navy">
              List Your Firm — Free
            </Link>
          </div>
          <p className="center">
            <Link href="/attorneys">← Browse all 50 states</Link>
          </p>
        </div>
      </section>
    </>
  );
}
