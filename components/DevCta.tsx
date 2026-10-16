import Link from "next/link";

/** Monetization CTA: drives attorney visitors toward the web-dev business. */
export function DevCta() {
  return (
    <div className="dev-cta">
      <div>
        <h3>
          Need a <span>website for your firm?</span>
        </h3>
        <p>
          Most clients check your website before they ever call. Get a fast,
          professional attorney website that turns visitors into consultations
          — designed and built by Raza, web developer.
        </p>
      </div>
      <Link href="/list-your-firm" className="btn btn-burgundy">
        Get a Free Quote
      </Link>
    </div>
  );
}
