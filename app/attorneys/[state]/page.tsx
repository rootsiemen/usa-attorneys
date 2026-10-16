import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  STATES,
  PRACTICE_AREAS,
  DISCLAIMER,
  getState,
  type Faq as FaqType,
} from "@/lib/data";
import { Faq } from "@/components/Faq";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { state: string };
}): Metadata {
  const state = getState(params.state);
  if (!state) return {};
  const url = `${SITE_URL}/attorneys/${state.slug}`;
  return {
    title: `${state.name} Attorneys — Find a Lawyer in ${state.name}`,
    description: `Find attorneys in ${state.name}. Browse ${state.name} lawyers by practice area — personal injury, divorce, criminal defense, immigration, and more. Free directory.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${state.name} Attorneys | ${SITE_NAME}`,
      description: `Find qualified attorneys in ${state.name} by practice area.`,
      url,
      type: "website",
    },
  };
}

const INTRO_VARIANTS = [
  (n: string, r: string) =>
    `Looking for an attorney in ${n}? ${n} has its own courts, procedures, and licensing rules, so hiring a lawyer who actively practices in the state matters. This guide covers the most-searched practice areas in ${r}, what ${n} attorneys typically charge, and the questions to ask before you hire.`,
  (n: string, r: string) =>
    `If you need legal help in ${n}, start here. Whether it's an injury claim, a family matter, or a criminal charge, ${n} law has quirks you won't find in other states. Below you'll find the main practice areas people search for in ${r}, plain-English fee guidance, and FAQs answered for ${n} residents.`,
  (n: string, r: string) =>
    `${n} residents face the same legal problems as everyone else — accidents, divorces, arrests, immigration issues — but the rules that decide them are ${n} rules. This page helps you find the right kind of attorney in ${r} and understand costs, timelines, and your options before you make the first call.`,
];

export default function StatePage({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) notFound();
  const intro = INTRO_VARIANTS[state.name.length % 3](state.name, state.region);

  const faqs: FaqType[] = [
    {
      q: `How do I find a good attorney in ${state.name}?`,
      a: `Start with your legal issue, not just a name. Identify the practice area (personal injury, divorce, criminal defense, etc.), then look for ${state.name}-licensed attorneys with real experience in that area. Check your state bar association for licensing status and any disciplinary history, read client reviews, and meet for a consultation before committing.`,
    },
    {
      q: `How much does a lawyer cost in ${state.name}?`,
      a: `It depends on the case type. Personal injury and workers' comp lawyers usually work on contingency (no upfront fee). Criminal defense, divorce, and business lawyers typically charge hourly ($200–$500+) or flat fees. Always get a written fee agreement — reputable ${state.name} attorneys explain costs clearly at the first meeting.`,
    },
    {
      q: `Do attorneys in ${state.name} offer free consultations?`,
      a: `Many do, especially personal injury, criminal defense, and bankruptcy lawyers. Divorce and business lawyers sometimes charge a consultation fee that may be credited toward your case. Ask when you call — and use the meeting to judge communication style, not just price.`,
    },
    {
      q: `Can I handle my legal issue without a lawyer in ${state.name}?`,
      a: `For minor matters like small claims or uncontested paperwork, possibly. But for anything involving significant money, your freedom, your children, or your immigration status, professional help pays for itself. Most legal mistakes are far more expensive to fix than to prevent.`,
    },
  ];

  const url = `${SITE_URL}/attorneys/${state.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
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
            <span className="sep">›</span>
            <Link href="/attorneys">Attorneys by State</Link>
            <span className="sep">›</span> {state.name}
          </div>
          <h1>
            {state.name} <span>Attorneys</span>
          </h1>
          <p>{intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>{state.name} Attorneys by Practice Area</h2>
          <p className="lead">
            Choose the legal issue closest to yours — each guide explains what
            these lawyers do and what they charge.
          </p>
          <div className="grid-3">
            {PRACTICE_AREAS.map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="card"
                id={p.slug}
              >
                <h3>
                  {state.name} {p.title}
                </h3>
                <p>{p.intro.slice(0, 120)}…</p>
                <span className="card-link">Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container prose">
          <h2 style={{ textAlign: "center" }}>
            {state.name} Attorney FAQs
          </h2>
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
