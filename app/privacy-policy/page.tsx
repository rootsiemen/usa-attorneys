import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy — USA Attorneys",
  description:
    "Privacy Policy for USA Attorneys (usaattorneys.company): what data we collect, how we use it, cookies, and third-party advertising.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> Privacy Policy
          </div>
          <h1>
            Privacy <em>Policy</em>
          </h1>
          <p>Last updated: October 16, 2026</p>
        </div>
      </section>
      <section className="section">
        <div className="container prose">
          <h2>1. Information We Collect</h2>
          <p>
            <strong>Information you provide:</strong> When you use our contact
            form or list-your-firm form, we receive your name, email address,
            firm details, and message content.
          </p>
          <p>
            <strong>Automatically collected:</strong> We may collect basic
            technical data such as your IP address, browser type, device
            information, and pages visited, for security and analytics
            purposes.
          </p>
          <h2>2. How We Use Information</h2>
          <ul>
            <li>To respond to your inquiries and listing requests.</li>
            <li>To operate, maintain, and improve the directory.</li>
            <li>To detect and prevent fraud, spam, and abuse.</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
          <h2>3. Cookies</h2>
          <p>
            We use essential cookies for site functionality and may use
            analytics cookies to understand aggregate usage. You can control
            cookies through your browser settings.
          </p>
          <h2>4. Third-Party Advertising</h2>
          <p>
            We may display ads served by third-party advertising companies,
            including Google. These companies may use cookies (including the
            Google DoubleClick cookie) to serve ads based on your visits to
            this and other websites. Google&apos;s use of advertising cookies
            enables it and its partners to serve ads based on your visit to
            our site and/or other sites on the Internet. You may opt out of
            personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </p>
          <h2>5. Data Security</h2>
          <p>
            We take reasonable measures to protect your information, but no
            internet transmission is completely secure.
          </p>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            This site is not directed at children under 13, and we do not
            knowingly collect their information.
          </p>
          <h2>7. Changes</h2>
          <p>
            We may update this policy; the &quot;Last updated&quot; date above
            will reflect changes.
          </p>
          <h2>8. Contact</h2>
          <p>
            Privacy questions? <Link href="/contact">Contact us</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
