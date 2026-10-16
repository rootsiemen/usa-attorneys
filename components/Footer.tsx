import Link from "next/link";
import { PRACTICE_AREAS, ALL_STATES } from "@/lib/data";

export function Footer() {
  const topPractices = PRACTICE_AREAS.slice(0, 6);
  const topStates = ALL_STATES.slice(0, 6);
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>
              USA <span style={{ color: "var(--gold)" }}>Attorneys</span>
            </h4>
            <p>
              Helping Americans find qualified attorneys in every state and
              practice area. Free directory — attorneys can claim and list
              their firms.
            </p>
          </div>
          <div>
            <h4>Practice Areas</h4>
            <ul>
              {topPractices.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Popular States</h4>
            <ul>
              {topStates.map((s) => (
                <li key={s.slug}>
                  <Link href={`/attorneys/${s.slug}`}>
                    {s.name} Attorneys
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/list-your-firm">List Your Firm</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 USA Attorneys. All rights reserved.</span>
          <span>
            General legal information only — not legal advice. See our{" "}
            <Link href="/terms">Terms</Link>.
          </span>
        </div>
      </div>
    </footer>
  );
}
