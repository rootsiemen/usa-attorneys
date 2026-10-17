"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminForgotPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/forgot", {
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
    <section className="section">
      <div className="container">
        <div className="form-card">
          <span className="eyebrow">Site Administration</span>
          <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Forgot Password</h1>
          {sent ? (
            <>
              <p className="notice" style={{ borderColor: "var(--gold)", marginBottom: 16 }}>
                ✓ If an admin account exists for <strong>{email}</strong>, a reset link
                is on its way — check your inbox (and spam folder). The link expires in 1 hour.
              </p>
              <Link href="/admin/login" className="btn btn-primary" style={{ width: "100%" }}>
                Back to Login
              </Link>
            </>
          ) : (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 16px", fontSize: 15 }}>
                Enter your admin email — we&apos;ll send you a password reset link.
              </p>
              <form onSubmit={submit}>
                <label className="label" htmlFor="forgot-email">Email</label>
                <input
                  id="forgot-email"
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
                {error && (
                  <p className="notice" style={{ borderColor: "var(--burgundy)", margin: "12px 0" }}>
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} disabled={busy}>
                  {busy ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
              <p style={{ marginTop: 16, fontSize: 14 }}>
                <Link href="/admin/login">← Back to login</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
