import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import { DevCta } from "@/components/DevCta";

export const metadata: Metadata = {
  title: "About Us — USA Attorneys",
  description:
    "About USA Attorneys: a free directory helping Americans find qualified attorneys in all 50 states and major practice areas.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> About
          </div>
          <h1>
            About <em>USA Attorneys</em>
          </h1>
          <p>
            A free, independent directory connecting Americans with qualified
            attorneys in every state.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>What We Do</h2>
          <p>
            USA Attorneys (usaattorneys.company) is a legal directory covering
            all 50 US states and the practice areas people search for most —
            personal injury, divorce, criminal defense, immigration,
            bankruptcy, estate planning, DUI, workers&apos; compensation, real
            estate, and business law.
          </p>
          <p>
            Every guide on this site is written in plain English: what each
            type of lawyer does, when you actually need one, how fees work,
            and the questions to ask before you hire. No legal jargon, no
            paywalls.
          </p>
          <h2>How Listings Work</h2>
          <p>
            Attorneys can claim a free listing for their firm so potential
            clients can find them by state and practice area. We do not invent
            or publish attorney profiles — every listing is claimed and
            provided by the firm itself.
          </p>
          <h2>Our Promise</h2>
          <ul className="check-list">
            <li>Free for visitors, free for attorneys to list.</li>
            <li>No fake reviews, no paid rankings, no invented profiles.</li>
            <li>General legal information only — never a substitute for a lawyer.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            Questions, corrections, or partnership inquiries?{" "}
            <Link href="/contact">Get in touch</Link> — we read every message.
          </p>
          <DevCta />
        </div>
      </section>
    </>
  );
}
