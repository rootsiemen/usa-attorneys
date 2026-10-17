import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import { ListingForm } from "@/components/ListingForm";

export const metadata: Metadata = {
  title: "List Your Firm — Free Attorney Listing",
  description:
    "Attorneys: claim your free listing on USA Attorneys and get found by clients in your state and practice area.",
  alternates: { canonical: `${SITE_URL}/list-your-firm` },
  openGraph: {
    title: "List Your Firm — Free | USA Attorneys",
    description: "Free attorney listings — get found by clients in your state.",
    url: `${SITE_URL}/list-your-firm`,
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

export default function ListYourFirmPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span aria-current="page">List Your Firm</span>
          </nav>
          <h1>
            List Your Firm — <em>Free</em>
          </h1>
          <p>
            Get found by clients searching for attorneys in your state and
            practice area. Submit your details below and we&apos;ll add your
            free listing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col" style={{ alignItems: "start" }}>
            <div>
              <h2 style={{ color: "var(--navy)", textAlign: "left" }}>
                Why list with us?
              </h2>
              <ul className="check-list">
                <li>
                  <strong>100% free</strong> — no listing fees, no commissions.
                </li>
                <li>
                  <strong>Found by local clients</strong> — your firm appears
                  on your state and practice-area pages.
                </li>
                <li>
                  <strong>SEO-friendly profile</strong> — a public page that
                  can rank on Google for your name + city.
                </li>
                <li>
                  <strong>Direct inquiries</strong> — clients contact you, not
                  a middleman.
                </li>
              </ul>
              <div className="dev-cta" style={{ marginTop: 26 }}>
                <div>
                  <h3>
                    Need a <span>website for your firm?</span>
                  </h3>
                  <p>
                    Tick the box in the form and we&apos;ll include a free
                    website quote with your listing confirmation — professional
                    attorney websites by Raza, web developer.
                  </p>
                </div>
              </div>
            </div>
            <ListingForm />
          </div>
        </div>
      </section>
    </>
  );
}
