"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Contact from USA Attorneys: ${data.get("subject")}`
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:contact@usaattorneys.company?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">›</span> Contact
          </div>
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>
            Questions about the directory, a listing, or a correction? Send us
            a message — we read every one.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="form-card">
            {sent ? (
              <div className="center">
                <h2 style={{ color: "var(--navy)" }}>Opening your email app…</h2>
                <p style={{ color: "var(--gray-600)" }}>
                  Your message is addressed to{" "}
                  <strong>contact@usaattorneys.company</strong>. Just hit send
                  in your email app.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label htmlFor="name">Your name</label>
                <input id="name" name="name" required placeholder="Jane Smith" />
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                />
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject" required>
                  <option value="General question">General question</option>
                  <option value="Listing correction">Listing correction</option>
                  <option value="Claim a listing">Claim a listing</option>
                  <option value="Advertising / partnership">
                    Advertising / partnership
                  </option>
                  <option value="Website for my firm">
                    Website for my firm
                  </option>
                </select>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="How can we help?"
                />
                <button type="submit" className="btn btn-navy">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
