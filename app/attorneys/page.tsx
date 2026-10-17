import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL, SITE_NAME, ALL_STATES, ATTORNEYS } from "@/lib/data";
import { DevCta } from "@/components/DevCta";

export const metadata: Metadata = {
  title: "Find Attorneys by State — All 50 US States",
  description:
    "Browse attorneys in all 50 US states. Select your state to find lawyers by practice area — personal injury, divorce, criminal defense, and more.",
  alternates: { canonical: `${SITE_URL}/attorneys` },
  openGraph: {
    title: "Find Attorneys by State | USA Attorneys",
    description: "Browse attorneys in all 50 US states.",
    url: `${SITE_URL}/attorneys`,
    type: "website",
  },
};

export default function AttorneysIndexPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> Attorneys by State
          </div>
          <h1>
            Find Attorneys <em>by State</em>
          </h1>
          <p>
            Laws, courts, and licensing differ in every state. Choose your
            state to find attorneys who practice where you live — plus
            plain-English guides on fees and what to ask before you hire.
          </p>
          {ATTORNEYS.length > 0 && (
            <p className="center" style={{ marginTop: 12 }}>
              <strong>{ATTORNEYS.length}</strong> attorney
              {ATTORNEYS.length === 1 ? "" : "s"} listed and growing —{" "}
              <Link href="/list-your-firm">list your firm free</Link>.
            </p>
          )}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="center">
            {ALL_STATES.map((s) => (
              <Link
                key={s.slug}
                href={`/attorneys/${s.slug}`}
                className="state-pill"
              >
                {s.name}
              </Link>
            ))}
          </div>
          <div className="mt-2">
            <DevCta />
          </div>
        </div>
      </section>
    </>
  );
}
