import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  SITE_NAME,
  DISCLAIMER,
  getState,
  getPractice
} from "@/lib/data";
import {
  getAttorney,
  getAllAttorneySlugs,
} from "@/lib/attorneys-db";
import { DevCta } from "@/components/DevCta";
import { JsonLd } from "@/components/JsonLd";
import { Reviews } from "@/components/Reviews";

export async function generateStaticParams() {
  const slugs = await getAllAttorneySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const attorney = await getAttorney(params.slug);
  if (!attorney) return {};
  const url = `${SITE_URL}/attorney/${attorney.slug}`;
  const state = getState(attorney.state);
  const description = `${attorney.name} — ${attorney.firm}, ${attorney.city}, ${state?.name ?? ""}. Phone, practice areas, and profile. Claim this listing free.`;
  return {
    title: `${attorney.name} — ${attorney.firm} (${attorney.city})`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${attorney.name} | ${SITE_NAME}`,
      description,
      url,
      type: "profile",
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

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `tel:+1${digits}`;
}

export default async function AttorneyPage({ params }: { params: { slug: string } }) {
  const attorney = await getAttorney(params.slug);
  if (!attorney) notFound();

  const state = getState(attorney.state);
  const url = `${SITE_URL}/attorney/${attorney.slug}`;
  const areas = attorney.practiceAreas
    .map((s) => getPractice(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

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
      ...(state
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: `${state.name} Attorneys`,
              item: `${SITE_URL}/attorneys/${state.slug}`,
            },
          ]
        : []),
      {
        "@type": "ListItem",
        position: state ? 4 : 3,
        name: attorney.name,
        item: url,
      },
    ],
  };

  const attorneyLd = {
    "@context": "https://schema.org",
    "@type": "Attorney",
    name: attorney.name,
    url,
    telephone: attorney.phone,
    ...(attorney.address
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: attorney.address,
            addressLocality: attorney.city,
            addressRegion: state?.name ?? attorney.state,
            addressCountry: "US",
          },
        }
      : {}),
    ...(attorney.website ? { sameAs: [attorney.website] } : {}),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={attorneyLd} />
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
            {state && (
              <>
                <Link href={`/attorneys/${state.slug}`}>
                  {state.name} Attorneys
                </Link>
                <span className="sep" aria-hidden="true">
                  ›
                </span>
              </>
            )}
            <span aria-current="page">{attorney.name}</span>
          </nav>
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "var(--navy)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                fontFamily: "serif",
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {initials(attorney.name)}
            </div>
            <div>
              <h1 style={{ margin: 0 }}>{attorney.name}</h1>
              <p style={{ margin: "4px 0 0" }}>
                {attorney.firm} · {attorney.city}
                {state ? `, ${state.name}` : ""}
              </p>
              {attorney.claimed ? (
                <span className="badge-claimed">✓ Claimed Profile</span>
              ) : (
                <span className="badge-unclaimed">Unclaimed Profile</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          {!attorney.claimed && (
            <p className="notice">
              This is an unclaimed profile. The information below comes from
              public records and has not been verified by the attorney. Are
              you {attorney.name}?{" "}
              <Link href={`/claim/${attorney.slug}`}>Claim this profile free</Link> to
              update it.
            </p>
          )}

          <h2>Contact</h2>
          {attorney.phone ? (
            <p>
              <a href={telHref(attorney.phone)} className="btn btn-burgundy">
                Call {attorney.phone}
              </a>
            </p>
          ) : (
            <p className="notice">
              No public phone number on file for this attorney.{" "}
              <Link href={`/claim/${attorney.slug}`}>
                Claim this profile
              </Link>{" "}
              to add contact details.
            </p>
          )}
          {attorney.address && (
            <p>
              <strong>Address:</strong> {attorney.address}
            </p>
          )}
          {attorney.website && (
            <p>
              <strong>Website:</strong>{" "}
              <a
                href={attorney.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {attorney.website.replace(/^https?:\/\//, "")}
              </a>
            </p>
          )}
          {typeof attorney.yearsLicensed === "number" && (
            <p>
              <strong>Years licensed:</strong> {attorney.yearsLicensed}
            </p>
          )}

          {attorney.bio && (
            <>
              <h2>About</h2>
              <p>{attorney.bio}</p>
            </>
          )}

          {areas.length > 0 && (
            <>
              <h2>Practice Areas</h2>
              <div className="grid-3">
                {areas.map((p) => (
                  <Link key={p.slug} href={`/${p.slug}`} className="card">
                    <h3>{p.title}</h3>
                    <p>{p.directAnswer}</p>
                    <span className="card-link">Learn more →</span>
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2>Client Reviews</h2>
          <Reviews slug={attorney.slug} attorneyName={attorney.name} />

          <div className="disclaimer">{DISCLAIMER}</div>
          <DevCta />
          <div className="cta-banner">
            <h2>Are You {attorney.name}?</h2>
            <p>
              Claim this profile to update your information, add a photo, and
              respond to reviews — free.
            </p>
            <Link href={`/claim/${attorney.slug}`} className="btn btn-navy">
              Claim This Profile — Free
            </Link>
          </div>
          <p className="center">
            {state ? (
              <Link href={`/attorneys/${state.slug}`}>
                ← Back to {state.name} attorneys
              </Link>
            ) : (
              <Link href="/attorneys">← Browse all 50 states</Link>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
