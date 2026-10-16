"use client";

import { useState } from "react";
import { ALL_STATES, PRACTICE_AREAS } from "@/lib/data";

export function ListingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `New firm listing request: ${data.get("firm")} (${data.get("state")})`
    );
    const body = encodeURIComponent(
      [
        `Firm name: ${data.get("firm")}`,
        `Contact name: ${data.get("name")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `State: ${data.get("state")}`,
        `Practice areas: ${data.get("practice")}`,
        `Website: ${data.get("website")}`,
        ``,
        `About the firm:`,
        `${data.get("about")}`,
        ``,
        `Also interested in a new firm website: ${data.get("needsite")}`,
      ].join("\n")
    );
    window.location.href = `mailto:listings@usaattorneys.company?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
<div className="form-card" style={{ margin: 0 }}>
              {sent ? (
                <div className="center">
                  <h2 style={{ color: "var(--navy)" }}>
                    Almost done — check your email app
                  </h2>
                  <p style={{ color: "var(--gray-600)" }}>
                    Your listing request is addressed to{" "}
                    <strong>listings@usaattorneys.company</strong>. Hit send
                    and we&apos;ll review your firm within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label htmlFor="firm">Firm name *</label>
                  <input
                    id="firm"
                    name="firm"
                    required
                    placeholder="Smith & Associates LLC"
                  />
                  <label htmlFor="name">Your name *</label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="John Smith"
                  />
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="john@smithlaw.com"
                  />
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                  />
                  <label htmlFor="state">State *</label>
                  <select id="state" name="state" required>
                    {ALL_STATES.map((s) => (
                      <option key={s.slug} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="practice">Primary practice area *</label>
                  <select id="practice" name="practice" required>
                    {PRACTICE_AREAS.map((p) => (
                      <option key={p.slug} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <label htmlFor="website">Firm website (if any)</label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://www.example.com"
                  />
                  <label htmlFor="about">About your firm *</label>
                  <textarea
                    id="about"
                    name="about"
                    required
                    placeholder="Years in practice, areas of focus, what makes your firm different…"
                  />
                  <label
                    htmlFor="needsite"
                    style={{ display: "flex", gap: 10, alignItems: "start" }}
                  >
                    <input
                      id="needsite"
                      name="needsite"
                      type="checkbox"
                      value="yes"
                      style={{ width: "auto", marginTop: 4 }}
                    />
                    <span style={{ fontWeight: 500 }}>
                      I&apos;m also interested in a professional website for my
                      firm — send me a free quote.
                    </span>
                  </label>
                  <button type="submit" className="btn btn-gold">
                    Submit Free Listing
                  </button>
                </form>
              )}
            </div>
  );
}
