import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service — USA Attorneys",
  description:
    "Terms of Service for USA Attorneys (usaattorneys.company): acceptable use, listing rules, and legal disclaimers.",
  alternates: { canonical: `${SITE_URL}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> Terms of Service
          </div>
          <h1>
            Terms of <span>Service</span>
          </h1>
          <p>Last updated: October 16, 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>1. Not Legal Advice</h2>
          <p>
            All content on USA Attorneys is general legal information for
            educational purposes only. It is <strong>not legal advice</strong>,
            and reading this site does not create an attorney-client
            relationship. Laws vary by state and change over time — consult a
            licensed attorney in your state about your specific situation.
          </p>
          <h2>2. Directory Listings</h2>
          <ul>
            <li>
              Listings are claimed and supplied by the attorneys or firms
              themselves. We do not independently verify credentials, though
              we encourage users to check their state bar association.
            </li>
            <li>
              We may refuse, edit, or remove any listing at our discretion,
              including misleading or incomplete submissions.
            </li>
            <li>
              A listing on this site is not an endorsement or recommendation.
            </li>
          </ul>
          <h2>3. Acceptable Use</h2>
          <p>
            You agree not to misuse the site: no scraping at abusive volumes,
            no spam, no unlawful content, and no attempts to disrupt the
            service.
          </p>
          <h2>4. Intellectual Property</h2>
          <p>
            Site design, text, and graphics are owned by USA Attorneys. You
            may link to our pages but may not republish our content without
            permission.
          </p>
          <h2>5. Limitation of Liability</h2>
          <p>
            The site is provided &quot;as is.&quot; To the maximum extent
            permitted by law, we are not liable for any decisions you make
            based on directory information or site content.
          </p>
          <h2>6. Changes</h2>
          <p>
            We may update these terms; continued use of the site means you
            accept the current version.
          </p>
          <h2>7. Contact</h2>
          <p>
            Questions about these terms? <Link href="/contact">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
