import Link from "next/link";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — USA Attorneys",
  description:
    "Contact USA Attorneys: questions about the directory, listings, or corrections. We read every message.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact Us | USA Attorneys",
    description: "Get in touch with the USA Attorneys directory team.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep" aria-hidden="true">›</span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1>
            Contact <em>Us</em>
          </h1>
          <p>
            Questions about the directory, a listing, or a correction? Send us
            a message — we read every one.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
