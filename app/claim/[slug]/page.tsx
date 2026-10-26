import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  getState
} from "@/lib/data";
import {
  getAttorney,
  getAllAttorneySlugs,
} from "@/lib/attorneys-db";
import { ClaimForm } from "@/components/ClaimForm";

export async function generateStaticParams() {
  const slugs = await getAllAttorneySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const attorney = await getAttorney((await params).slug);
  if (!attorney) return {};
  const url = `${SITE_URL}/claim/${attorney.slug}`;
  const title = `Claim Your Profile — ${attorney.name} | ${SITE_NAME}`;
  const description = `${attorney.name}: claim your free attorney profile on ${SITE_NAME} to update your information and respond to reviews.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "USA Attorneys" }],
    },
  };
}

export default async function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const attorney = await getAttorney((await params).slug);
  if (!attorney) notFound();
  const state = getState(attorney.state);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <Link href={`/attorney/${attorney.slug}`}>{attorney.name}</Link>
            <span className="sep" aria-hidden="true">
              ›
            </span>
            <span aria-current="page">Claim Profile</span>
          </nav>
          <h1>
            Claim Your <em>Profile</em>
          </h1>
          <p>
            {attorney.name}
            {attorney.firm ? ` — ${attorney.firm}` : ""} · {attorney.city}
            {state ? `, ${state.name}` : ""}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: "start" }}>
            <div>
              <ClaimForm slug={attorney.slug} attorneyName={attorney.name} />
            </div>
            <div>
              <h2 style={{ color: "var(--navy)", textAlign: "left" }}>
                What happens next?
              </h2>
              <ul className="check-list">
                <li>
                  <strong>We verify</strong> — your name and bar details are
                  checked against public records.
                </li>
                <li>
                  <strong>Profile marked claimed</strong> — the "Unclaimed"
                  badge is replaced with a verified badge.
                </li>
                <li>
                  <strong>You control the listing</strong> — update phone,
                  address, website, photo, and practice areas.
                </li>
                <li>
                  <strong>Respond to reviews</strong> — engage with clients
                  who review your firm.
                </li>
              </ul>
              <p style={{ marginTop: 16 }}>
                <Link href={`/attorney/${attorney.slug}`}>
                  ← Back to {attorney.name}&apos;s profile
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
