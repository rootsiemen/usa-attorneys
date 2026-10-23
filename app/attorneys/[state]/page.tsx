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
  getState
} from "@/lib/data";
import {
  getAttorneysByState,
} from "@/lib/attorneys-db";
import { Faq } from "@/components/Faq";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return ALL_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { state: string };
}): Promise<Metadata> {
  const state = getState(params.state);
  if (!state) return {};
  const url = `${SITE_URL}/attorneys/${state.slug}`;
  let count = 0;
  try {
    count = (await getAttorneysByState(state.slug)).length;
  } catch {
    count = 0;
  }
  const countHook = count > 0 ? `${count} listed lawyers, ` : "";
  const description = `Attorneys in ${state.name}: compare ${countHook}see 2026 fees by practice area — injury, divorce, DUI & criminal defense. Free to browse.`;
  const title = `${state.name} Attorneys: Find a Lawyer in ${state.name} — Fees & Costs (2026)`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
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

export default async function StatePage({ params }: { params: { state: string } }) {
  const state = getState(params.state);
  if (!state) notFound();

  const stateIndex = ALL_STATES.findIndex((s) => s.slug === state.slug);
  const faqs = STATE_FAQ_SETS[stateIndex % STATE_FAQ_SETS.length](state.name);
  const url = `${SITE_URL}/attorneys/${state.slug}`;
  const attorneys = await getAttorneysByState(state.slug);

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

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");

  const practiceLabel = (slug?: string) => {
    if (!slug) return undefined;
    const p = PRACTICE_AREAS.find((x) => x.slug === slug);
    return p ? p.shortTitle : undefined;
  };

  /** Right-hand column: the state guide / article content. */
  const articleBody = (
    <>
      <div className="prose">
        <h2>Finding a Lawyer in {state.name}</h2>
        {state.intro.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <h2>How to Choose the Right {state.name} Attorney</h2>
        <p>{state.finding}</p>

        <h2>What Attorneys Cost in {state.name}</h2>
        <p>{state.fees}</p>

        <h2>Legal Aid &amp; Free Help in {state.name}</h2>
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

      <div className="state-practice-grid">
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

      <div className="prose">
        <h2>{state.name} Attorney FAQs</h2>
        <Faq items={faqs} />
        <div className="disclaimer">{DISCLAIMER}</div>
      </div>

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
    </>
  );

  /** Left-hand column: this state's attorney contacts as a compact list. */
  const contactsSidebar = (
    <aside className="state-contacts" aria-label={`Attorney contacts in ${state.name}`}>
      <h2>{state.name} Attorney Contacts</h2>
      <p className="contacts-sub">
        {attorneys.length} {attorneys.length === 1 ? "attorney" : "attorneys"} listed
        in {state.name}. Tap a name for the full profile.
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
                  {a.firm ? `${a.firm} · ` : ""}{a.city}
                </span>
                {practiceLabel(a.practiceAreas[0]) && (
                  <span className="sc-practice">{practiceLabel(a.practiceAreas[0])}</span>
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
        <h3>Are You a {state.name} Attorney?</h3>
        <p>Claim your free listing and get found by clients in {state.name}.</p>
        <Link href="/list-your-firm" className="btn btn-gold">
          List Your Firm — Free
        </Link>
      </div>
    </aside>
  );

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
        <div className="container">
          {attorneys.length > 0 ? (
            <div className="state-layout">
              <div className="state-main">{articleBody}</div>
              {contactsSidebar}
            </div>
          ) : (
            <div className="state-main-single">{articleBody}</div>
          )}
        </div>
      </section>
    </>
  );
}
