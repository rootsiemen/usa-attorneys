"use client";

import { useState } from "react";

export function ClaimForm({
  slug,
  attorneyName,
}: {
  slug: string;
  attorneyName: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [barNumber, setBarNumber] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const r = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attorneySlug: slug,
          claimantName: name,
          claimantEmail: email,
          claimantPhone: phone,
          barNumber,
          message,
        }),
      });
      const d = await r.json();
      if (r.ok) {
        setMsg({ ok: true, text: d.message });
        setName("");
        setEmail("");
        setPhone("");
        setBarNumber("");
        setMessage("");
      } else {
        setMsg({ ok: false, text: d.error || "Something went wrong" });
      }
    } catch {
      setMsg({ ok: false, text: "Network error — please try again" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-card" style={{ margin: 0 }}>
      <p style={{ marginTop: 0 }}>
        You are claiming the profile for <strong>{attorneyName}</strong>.
        We verify every claim against public bar records before marking a
        profile as claimed.
      </p>
      <label htmlFor="cl-name">Your full name *</label>
      <input
        id="cl-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={120}
        required
        placeholder="As it appears on your bar registration"
      />
      <label htmlFor="cl-email">Work email *</label>
      <input
        id="cl-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={160}
        required
        placeholder="you@yourfirm.com"
      />
      <label htmlFor="cl-phone">Phone (optional)</label>
      <input
        id="cl-phone"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        maxLength={40}
        placeholder="(555) 123-4567"
      />
      <label htmlFor="cl-bar">Bar number (optional)</label>
      <input
        id="cl-bar"
        value={barNumber}
        onChange={(e) => setBarNumber(e.target.value)}
        maxLength={40}
        placeholder="Helps us verify you faster"
      />
      <label htmlFor="cl-msg">Corrections or notes (optional)</label>
      <textarea
        id="cl-msg"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={2000}
        placeholder="Anything we should fix on this profile?"
      />
      {msg && (
        <p
          className="notice"
          style={
            msg.ok
              ? { borderColor: "green" }
              : { borderColor: "var(--burgundy)" }
          }
        >
          {msg.text}
        </p>
      )}
      <button type="submit" className="btn btn-navy" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Claim Request"}
      </button>
      <p style={{ fontSize: 13, color: "#666", marginTop: 12 }}>
        Free forever. We never sell your information.
      </p>
    </form>
  );
}
