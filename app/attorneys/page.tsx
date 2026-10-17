import Link from "next/link";
import type { Metadata } from "next";
import {
  SITE_URL,
  SITE_NAME,
  ALL_STATES,
} from "@/lib/data";
import {
  getAttorneyCount,
} from "@/lib/attorneys-db";
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

export default async function AttorneysIndexPage() {
  const attorneyCount = await getAttorneyCount();
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
          {attorneyCount > 0 && (
            <p className="center" style={{ marginTop: 12 }}>
              <strong>{attorneyCount}</strong> attorney
              {attorneyCount === 1 ? "" : "s"} listed and growing —{" "}
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
