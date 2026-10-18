"use client";

import { useState } from "react";
import Link from "next/link";

export default function CustomerForgotPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/customer/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (r.ok) {
        setSent(true);
      } else {
        setError(d.error || "Something went wrong");
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="section-light">
      <div className="container">
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <span className="eyebrow">Account</span>
          <h2 style={{ fontSize: 32, margin: "0 0 12px" }}>Forgot Password</h2>
          {sent ? (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 24px" }}>
                ✓ If an account exists for <strong>{email}</strong>, a reset link
                is on its way — check your inbox (and spam folder). The link expires in 1 hour.
              </p>
              <Link href="/login" className="btn btn-navy" style={{ width: "100%" }}>
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 24px" }}>
                Enter your account email — we&apos;ll send you a password reset link.
              </p>
              <form onSubmit={submit} style={{ textAlign: "left" }}>
                <label htmlFor="forgot-email" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 6 }}
                />
                {error && (
                  <p style={{ color: "#b42318", fontWeight: 600, margin: "10px 0 0", fontSize: 14 }}>{error}</p>
                )}
                <button type="submit" className="btn btn-navy" disabled={busy} style={{ width: "100%", marginTop: 14 }}>
                  {busy ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
              <p style={{ marginTop: 20, fontSize: 14 }}>
                <Link href="/login">← Back to login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
