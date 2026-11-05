import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/data";
import { JsonLd } from "@/components/JsonLd";
import { TOOLS } from "@/lib/tools";

const url = `${SITE_URL}/tools`;

export const metadata: Metadata = {
  title: "Free Legal Calculators & Tools",
  description:
    "8 free legal calculators: car accident, personal injury, workers' comp, wrongful death and more — ranges with the math shown. Estimates, not legal advice.",
  alternates: { canonical: url },
  openGraph: {
    title: `Free Legal Calculators & Tools | ${SITE_NAME}`,
    description:
      "Estimate settlement values with free calculators that show their math — settlement, workers' comp, pain and suffering, lost wages, wrongful death and more.",
    url,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" },
    ],
  },
};

export default function ToolsHubPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Legal Tools", item: url },
    ],
  };
  const listLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Legal Calculators",
    itemListElement: TOOLS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: `${SITE_URL}/tools/${t.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={listLd} />
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Legal Tools</span>
          </nav>
          <h1>
            Free Legal <em>Calculators</em>
          </h1>
          <p>
            What is your case worth? These free calculators estimate settlement
            values using the same methods attorneys and insurance adjusters
            start from — and show every step of the math. No sign-up, no email
            required. Every result is an estimate, not legal advice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="practice-grid">
            {TOOLS.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="practice-card">
                <div className="practice-icon">§</div>
                <h3>{t.name}</h3>
                <p>{t.short}</p>
                <span className="card-link">Use this calculator →</span>
              </Link>
            ))}
          </div>

          <div className="prose" style={{ marginTop: 48 }}>
            <h2>How These Calculators Work</h2>
            <p>
              Injury settlements are built from two buckets:{" "}
              <strong>economic damages</strong> (medical bills, lost wages,
              property damage, future care — losses with receipts) and{" "}
              <strong>non-economic damages</strong> (pain, suffering, and loss
              of enjoyment of life). The standard estimation method multiplies
              economic damages by a severity factor of 1–5; the alternative
              per-diem method prices each day of recovery. The result is then
              reduced by your share of fault and, in the real world, limited by
              the at-fault party&apos;s insurance. Our calculators run exactly
              that math and print every step, so you can see which input moves
              your number — and what to ask an attorney about.
            </p>
            <p>
              Workers&apos; compensation is deliberately different: it pays
              two-thirds of your wages plus medical care on a state schedule,
              and never pays pain and suffering. The workers&apos; comp
              calculator uses that model instead.
            </p>
            <h2>More Tools in the Works</h2>
            <p>
              We are building out this library. Next up, based on what readers
              ask for most: a contingency fee calculator, a DUI total cost
              calculator, a divorce cost estimator, a statute of limitations
              checker, a small claims limit checker, an alimony calculator, a
              child custody time-share calculator, and a child support
              calculator. Until then, the{" "}
              <Link href="/blog">legal blog</Link> covers the cost math behind
              most of them.
            </p>
            <div className="cta-banner">
              <h2>An Estimate Is a Starting Point</h2>
              <p>
                The number that matters is the one a local attorney can defend
                with your evidence. Browse attorneys by state and practice
                area — free to search, free to list.
              </p>
              <Link href="/attorneys" className="btn btn-gold">
                Browse Attorneys by State →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
