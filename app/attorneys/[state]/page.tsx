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
import { getStateImage } from "@/lib/state-images";

export function generateStaticParams() {
  return ALL_STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const state = getState((await params).state);
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

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const state = getState((await params).state);
  if (!state) notFound();

  const stateIndex = ALL_STATES.findIndex((s) => s.slug === state.slug);
  const heroImage = getStateImage(state.slug);
  const faqs =
    state.faqs ?? STATE_FAQ_SETS[stateIndex % STATE_FAQ_SETS.length](state.name);
  const url = `${SITE_URL}/attorneys/${state.slug}`;
  const attorneys = await getAttorneysByState(state.slug);

  /**
   * Auto-generated versions of the two depth sections Maine got by hand
   * (gap analysis, 2026-11-17): "Attorneys by City" computed from this
   * state's own attorney records, and the "Legal Data & Cost Tools"
   * internal-links section. States that define `extraSections` in
   * lib/data.ts (currently Maine) keep their hand-written sections —
   * this fallback only renders for states without them.
   */
  type ExtraSection = {
    heading: string;
    paragraphs: string[];
    links?: { href: string; label: string; blurb: string }[];
  };
  const autoSections: ExtraSection[] = [];
  const cityCountsMap = new Map<string, number>();
  for (const a of attorneys) {
    if (a.city) cityCountsMap.set(a.city, (cityCountsMap.get(a.city) ?? 0) + 1);
  }
  const cityCounts = [...cityCountsMap.entries()].sort(
    (x, y) => y[1] - x[1] || x[0].localeCompare(y[0])
  );
  if (cityCounts.length > 0) {
    const joinList = (items: string[]) =>
      items.length <= 1
        ? items.join("")
        : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
    const topText = joinList(
      cityCounts.slice(0, 3).map(([c, n]) => `${c} (${n})`)
    );
    const restCities = cityCounts.slice(3).map(([c]) => c);
    let cityPara =
      `Our ${state.name} directory currently lists ${attorneys.length} ` +
      `${attorneys.length === 1 ? "attorney" : "attorneys"} across ` +
      `${cityCounts.length} ${cityCounts.length === 1 ? "community" : "communities"}. ` +
      `${cityCounts.length === 1 ? "They are based in" : "The largest concentrations are in"} ${topText}.`;
    if (restCities.length > 0) {
      cityPara += ` Listings also cover ${joinList(restCities)}.`;
    }
    cityPara +=
      " Tap any name in the contacts list on this page to open the full profile, practice areas, and phone number.";
    autoSections.push({
      heading: `${state.name} Attorneys by City`,
      paragraphs: [
        cityPara,
        `Coverage is thinner in rural parts of ${state.name}, where the nearest listed attorney may be some distance away. That is normal for a directory compiled from public records: many ${state.name} attorneys serve several counties and meet clients by phone or video, so a lawyer in the nearest city above can often handle your matter without a long drive. If you practice in an under-served ${state.name} community, claim your free listing so clients there can find you.`,
      ],
    });
  }
  autoSections.push({
    heading: `${state.name} Legal Data & Cost Tools`,
    paragraphs: [
      `Before you hire, put real numbers next to the decision. Our research pages show how ${state.name} compares with other states and what cases like yours typically settle for:`,
    ],
    links: [
      {
        href: "/data/attorney-density-by-state",
        label: "Attorney Density by State",
        blurb:
          "How many lawyers per resident each state has — and what that means for finding counsel near you.",
      },
      {
        href: "/data/settlement-ranges",
        label: "Settlement Ranges by Case Type",
        blurb:
          "Typical settlement ranges for injury, accident, and malpractice cases.",
      },
      {
        href: "/tools",
        label: "Free Settlement Calculators",
        blurb:
          "Estimate car accident, personal injury, workers' comp, and other settlements in minutes.",
      },
    ],
  });
  const sectionsToRender = state.extraSections ?? autoSections;

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

        <h2>{state.feesHeading ?? `What Attorneys Cost in ${state.name}`}</h2>
        <p>{state.fees}</p>

        <h2>Legal Aid &amp; Free Help in {state.name}</h2>
        <p>{state.legalAid}</p>

        <h2>How the {state.name} Court System Works</h2>
        <p>{state.courtSystem}</p>

        <h2>Notable {state.name} Laws to Know</h2>
        <p>{state.notableLaws}</p>

        {sectionsToRender.map((sec) => (
          <div key={sec.heading}>
            <h2>{sec.heading}</h2>
            {sec.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {sec.links && (
              <ul>
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link> — {l.blurb}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

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
        <h2>Attorney Cost Guides</h2>
        <p>
          Before you hire, see what legal help typically costs — our guides
          break down the real numbers:
        </p>
        <ul>
          <li>
            <Link href="/blog/how-much-does-business-lawyer-cost-2026">
              how much does a business lawyer cost
            </Link>
          </li>
          <li>
            <Link href="/blog/real-estate-attorney-fees-closing-cost-math">
              real estate attorney fees at closing
            </Link>
          </li>
          <li>
            <Link href="/blog/how-much-does-dui-attorney-cost-2026">
              how much does a DUI attorney cost
            </Link>
          </li>
        </ul>

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

      {heroImage && (
        <div className="container">
          <figure className="state-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={heroImage.url} alt={heroImage.alt} loading="lazy" />
            <figcaption className="state-hero-credit">
              Photo:{" "}
              <a href={heroImage.page} target="_blank" rel="noopener noreferrer">
                {heroImage.credit}
              </a>{" "}
              via Wikimedia Commons
            </figcaption>
          </figure>
        </div>
      )}

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
