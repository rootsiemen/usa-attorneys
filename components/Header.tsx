import Link from "next/link";

export function Header() {
  return (
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
          <Link href="/about" className="hide-mobile">
            About
          </Link>
          <Link href="/contact" className="hide-mobile">
            Contact
          </Link>
          <Link href="/blog" className="hide-mobile">
            Blog
          </Link>
          <Link href="/list-your-firm" className="btn-burgundy">
            List Your Firm
          </Link>
        </nav>
      </div>
    </header>
  );
}
