import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, DISCLAIMER, type Faq as FaqType } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/Faq";
import {
  STATE_DENSITY,
  PRACTICE_COUNTS,
  SCARCE_AREAS,
  TOTAL_ATTORNEYS,
  per100k,
} from "@/lib/data-pages";

const url = `${SITE_URL}/data/attorney-density-by-state`;

export const metadata: Metadata = {
  title: "Attorney Density by State: 833 Listed Attorneys Ranked",
  description:
    "How many attorneys are listed in each state? Texas leads with 85 of 833; offshore lawyers exist in only 2 states. Directory data + 2020 Census rates per 100k.",
  alternates: { canonical: url },
  openGraph: {
    title: `Attorney Density by State | ${SITE_NAME}`,
    description:
      "Attorneys per state and per 100,000 residents, by practice area — counted from the USA Attorneys directory of 833 publicly listed attorneys (Nov 2026).",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

const faqs: FaqType[] = [
  {
    q: "Which state has the most listed attorneys?",
    a: "Texas, with 85 of the directory's 833 attorneys — more than the next four states combined. California is second with 22, followed by Louisiana and Rhode Island with 18 each. Most states have 15 listed attorneys. Houston alone accounts for 40 listings, the largest single-city cluster in the directory.",
  },
  {
    q: "Which state has the fewest attorneys per capita in this directory?",
    a: "California: 22 listed attorneys for 39,538,223 residents (2020 Census) works out to 0.06 per 100,000 residents. Florida and New York follow at 0.07 per 100,000. At the other end, Wyoming has the highest rate at 2.60 per 100,000 — small populations make the same 15 listings go much further per resident.",
  },
  {
    q: "Where are the scarcest legal specialists?",
    a: "Oil rig injury is the scarcest specialty in the directory: all 4 listed lawyers are in Texas, leaving 49 states with none listed. Offshore accident (Jones Act) lawyers appear in only 2 states — Texas (18) and Louisiana (3). Mesothelioma attorneys appear in only 3 states: Texas (23), California (7), and Louisiana (1).",
  },
  {
    q: "Does this count every lawyer in America?",
    a: "No. These counts come from USA Attorneys' own directory of 833 publicly listed attorneys (November 2026) — a directory sample, not a census of all US lawyers. The real US attorney population is over a million. Use this page to compare coverage inside this directory and to spot where listed specialists are concentrated or missing, not as a count of every licensed attorney.",
  },
  {
    q: "Why does Texas dominate the scarce specialties?",
    a: "The scarce specialties in this directory — offshore accident, oil rig injury, mesothelioma, truck accident — are energy and industrial practices, and they cluster where the work is: the Gulf of Mexico drilling corridor, Houston's refinery and shipping complex, and Texas's industrial base. 55 of the 68 attorneys in those four specialties combined are listed in Texas.",
  },
];

export default function AttorneyDensityPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Research & Data", item: url },
      {
        "@type": "ListItem",
        position: 3,
        name: "Attorney Density by State",
        item: url,
      },
    ],
  };
  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Attorney Density by State",
    url,
    description:
      "Attorneys per state and per 100,000 residents by practice area, counted from the USA Attorneys directory of 833 publicly listed attorneys (November 2026). Populations: 2020 US Census.",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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

  const byCount = [...STATE_DENSITY].sort(
    (a, b) => b.attorneys - a.attorneys || a.name.localeCompare(b.name)
  );
  const listingTotal = PRACTICE_COUNTS.reduce((s, p) => s + p.attorneys, 0);

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={webPageLd} />
      <JsonLd data={faqLd} />

      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Attorney Density by State</span>
          </nav>
          <h1>
            Attorney Density <em>by State</em>
          </h1>
          <p>
            We counted every attorney in our directory — {TOTAL_ATTORNEYS}{" "}
            publicly listed attorneys across all 50 states and 16 practice
            areas — and ranked the states by raw count and per 100,000
            residents (2020 US Census). The headline: coverage is wildly
            uneven. Texas holds 85 listings, and entire specialties exist in
            only two or three states.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="prose">
            <h2>Key Findings</h2>
            <ul>
              <li>
                <strong>Texas dominates:</strong> 85 of {TOTAL_ATTORNEYS}{" "}
                listed attorneys (10.2%), including 40 in Houston alone — the
                largest single-city cluster in the directory.
              </li>
              <li>
                <strong>Scarcest specialty:</strong> oil rig injury — all 4
                listed lawyers are in Texas; 49 states have none listed.
              </li>
              <li>
                <strong>Gulf concentration:</strong> offshore accident (Jones
                Act) lawyers exist in only 2 states — Texas (18) and Louisiana
                (3). Mesothelioma attorneys exist in only 3 states.
              </li>
              <li>
                <strong>Per capita extremes:</strong> Wyoming has the densest
                coverage at 2.60 listed attorneys per 100,000 residents;
                California the sparsest at 0.06 per 100,000.
              </li>
              <li>
                <strong>Three areas do the heavy lifting:</strong> personal
                injury (342), criminal defense (283), and divorce (238)
                account for most listings; the remaining 13 areas share the
                rest.
              </li>
            </ul>

            <h2>Attorneys per State</h2>
            <p>
              Counts are the attorneys listed in this directory as of November
              2026. Rates use 2020 US Census resident populations, so states
              can be compared fairly regardless of size.
            </p>
          </div>

          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>State</th>
                  <th className="num">Listed attorneys</th>
                  <th className="num">Population (2020 Census)</th>
                  <th className="num">Per 100,000 residents</th>
                </tr>
              </thead>
              <tbody>
                {byCount.map((s) => (
                  <tr key={s.slug}>
                    <td>
                      <Link href={`/attorneys/${s.slug}`}>{s.name}</Link>
                    </td>
                    <td className="num">{s.attorneys}</td>
                    <td className="num">
                      {s.population2020.toLocaleString("en-US")}
                    </td>
                    <td className="num">{per100k(s).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose">
            <h2>Attorneys by Practice Area</h2>
            <p>
              The directory tracks 16 practice areas. Attorneys who practice in
              more than one area are counted in each — 115 of the{" "}
              {TOTAL_ATTORNEYS} attorneys list multiple areas, which is why
              these counts add up to {listingTotal.toLocaleString("en-US")}{" "}
              listings rather than {TOTAL_ATTORNEYS}.
            </p>
          </div>

          <div className="data-table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Practice area</th>
                  <th className="num">Listed attorneys</th>
                  <th className="num">Share of listings</th>
                </tr>
              </thead>
              <tbody>
                {PRACTICE_COUNTS.map((p) => (
                  <tr key={p.slug}>
                    <td>
                      <Link href={`/${p.slug}`}>{p.title}</Link>
                    </td>
                    <td className="num">{p.attorneys}</td>
                    <td className="num">
                      {((p.attorneys / listingTotal) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose">
            <h2>Where Specialists Are Scarce</h2>
            <p>
              The scarcest specialties cluster hard on the Gulf Coast. If you
              need one of these lawyers outside Texas or Louisiana, this
              directory currently lists nobody in your state — a gap we are
              actively filling, and a reason these cases so often involve
              out-of-state counsel working with local firms.
            </p>
            {SCARCE_AREAS.map((a) => (
              <div key={a.slug}>
                <h3>
                  <Link href={`/${a.slug}`}>{a.title}</Link> — {a.total} listed
                  nationwide
                </h3>
                <p>
                  Where they practice:{" "}
                  {a.byState.map((s, i) => (
                    <span key={s.slug}>
                      {i > 0 && " · "}
                      <Link href={`/attorneys/${s.slug}`}>{s.state}</Link>:{" "}
                      {s.attorneys}
                    </span>
                  ))}
                  . States with no listed attorney in this specialty:{" "}
                  {a.zeroStates} of 50.
                </p>
                <p>{a.note}</p>
              </div>
            ))}

            <h2>Methodology &amp; Sources</h2>
            <p>
              Counts come from USA Attorneys&apos; directory of{" "}
              {TOTAL_ATTORNEYS} publicly listed attorneys, snapshotted in
              November 2026. Each attorney record carries a state, a city, and
              one or more practice areas; counts on this page are direct
              tallies of those records. Population figures are 2020 US Census
              resident populations, and per-capita rates are listed attorneys
              per 100,000 residents.
            </p>
            <p>
              <strong>Important:</strong> this is a directory sample, not a
              census of all US lawyers — the real attorney population is over a
              million, and most are not listed here. Read these numbers as
              &ldquo;where this directory&apos;s coverage is deep or
              thin,&rdquo; not as the total supply of lawyers in a state.
            </p>

            <h2>More Research</h2>
            <p>
              See also our companion analysis,{" "}
              <Link href="/data/settlement-ranges">
                Settlement Ranges by Case Type
              </Link>
              , which runs worked example cases through the same estimation
              engine behind our{" "}
              <Link href="/tools">free legal calculators</Link>. Or browse the
              directory itself: <Link href="/attorneys">attorneys by state</Link>{" "}
              and the practice-area guides linked in the tables above.
            </p>

            <h2>Frequently Asked Questions</h2>
            <Faq items={faqs} />

            <div className="cta-banner">
              <h2>Find an Attorney in Your State</h2>
              <p>
                Search the full directory by state and practice area — free to
                browse, free for attorneys to list.
              </p>
              <Link href="/attorneys" className="btn btn-gold">
                Browse Attorneys by State →
              </Link>
            </div>
            <p style={{ fontSize: 13, color: "var(--gray-600)" }}>{DISCLAIMER}</p>
          </div>
        </div>
      </section>
    </>
  );
}
