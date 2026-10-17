import Link from "next/link";
import { AuthButton } from "@/components/AuthButton";

export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <strong>USA Attorneys</strong> — America&apos;s Free Attorney
            Directory · 100% Free to Search · 100% Free to List
          </span>
          <span className="topbar-right">
            <Link href="/list-your-firm">Attorneys: List Your Firm Free →</Link>
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">§</span>
            <span className="brand-name">
              USA <span>Attorneys</span>
            </span>
          </Link>
          <nav className="nav">
            <Link href="/attorneys" className="hide-mobile">
              Browse by State
            </Link>
            <Link href="/blog" className="hide-mobile">
              Legal Blog
            </Link>
            <Link href="/about" className="hide-mobile">
              About
            </Link>
            <Link href="/contact" className="hide-mobile">
              Contact
            </Link>
            <AuthButton />
            <Link href="/list-your-firm" className="btn-gold">
              List Your Firm — Free
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
