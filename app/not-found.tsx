import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container center">
        <h1 style={{ fontSize: 64, color: "var(--navy)", margin: "20px 0 10px" }}>
          404
        </h1>
        <h2>Page not found</h2>
        <p style={{ color: "var(--gray-600)" }}>
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <div className="mt-2">
          <Link href="/" className="btn btn-navy">
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
