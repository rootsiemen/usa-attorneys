import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL, SITE_NAME, DISCLAIMER, ALL_STATES, type Faq as FaqType } from "@/lib/data";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { getTool, TOOL_DISCLAIMER, type ToolInfo } from "@/lib/tools";

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

export interface ToolPageProps {
  tool: ToolInfo;
  h1: ReactNode;
  heroAnswer: string;
  calculator: ReactNode;
  howItWorks: ReactNode;
  faqs: FaqType[];
  blogLinks: { href: string; anchor: string }[];
  relatedSlugs: string[];
}

export function ToolPage({
  tool,
  h1,
  heroAnswer,
  calculator,
  howItWorks,
  faqs,
  blogLinks,
  relatedSlugs,
}: ToolPageProps) {
  const url = `${SITE_URL}/tools/${tool.slug}`;
  const related = relatedSlugs
    .map((s) => getTool(s))
    .filter((t): t is ToolInfo => Boolean(t));

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Legal Tools", item: `${SITE_URL}/tools` },
      { "@type": "ListItem", position: 3, name: tool.name, item: url },
    ],
  };

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    description: tool.short,
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
      <JsonLd data={appLd} />
      <JsonLd data={faqLd} />
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <Link href="/tools">Legal Tools</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">{tool.name}</span>
          </nav>
          <h1>{h1}</h1>
          <p>{heroAnswer}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="disclaimer" style={{ maxWidth: 640, margin: "0 auto 22px" }}>
            <strong>Estimate only — this is not legal advice.</strong>{" "}
            {TOOL_DISCLAIMER}
          </div>

          {calculator}

          <div className="prose" style={{ marginTop: 48 }}>
            {howItWorks}

            <h2>{tool.name} FAQs</h2>
            <Faq items={faqs} />

            {blogLinks.length > 0 && (
              <>
                <h2>Guides That Go Deeper</h2>
                <ul>
                  {blogLinks.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href}>{g.anchor}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href={`/${tool.practiceSlug}`}>
                      about {tool.practiceName.toLowerCase()}s: what they do,
                      what they cost, and how to hire one
                    </Link>
                  </li>
                </ul>
              </>
            )}

            {related.length > 0 && (
              <>
                <h2>Related Free Calculators</h2>
                <ul>
                  {related.map((t) => (
                    <li key={t.slug}>
                      <Link href={`/tools/${t.slug}`}>{t.name}</Link> —{" "}
                      {t.short}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="disclaimer">{DISCLAIMER}</div>
          </div>

          <div className="container prose">
            <div className="cta-banner">
              <h2>Talk to a {tool.practiceName} in Your State</h2>
              <p>
                A calculator gives you a range. A local attorney can tell you
                what your specific case is worth — most offer a free
                consultation and charge nothing unless you win.
              </p>
              <Link href={`/${tool.practiceSlug}`} className="btn btn-gold">
                About {tool.practiceName}s →
              </Link>
            </div>
            <h2 style={{ textAlign: "center" }}>Find an Attorney by State</h2>
            <div className="center">
              {TOP_STATES.map((slug) => {
                const s = ALL_STATES.find((st) => st.slug === slug)!;
                return (
                  <Link key={slug} href={`/attorneys/${slug}`} className="state-pill">
                    {s.name}
                  </Link>
                );
              })}
            </div>
            <p className="center mt-2">
              <Link href="/attorneys">View all 50 states →</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
