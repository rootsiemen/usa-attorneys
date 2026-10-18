"use client";

import { useState } from "react";
import Link from "next/link";

export default function CustomerResetTokenPage({ params }: { params: { token: string } }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/customer/reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: params.token, password }),
      });
      const d = await r.json();
      if (r.ok) {
        setDone(true);
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
          <h2 style={{ fontSize: 32, margin: "0 0 12px" }}>Set New Password</h2>
          {done ? (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 24px" }}>
                ✓ Password changed! You can now log in with your new password.
              </p>
              <Link href="/login" className="btn btn-navy" style={{ width: "100%" }}>
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 24px" }}>
                Choose a new password (min 8 characters).
              </p>
              <form onSubmit={submit} style={{ textAlign: "left" }}>
                <label htmlFor="new-pass" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
                  New password
                </label>
                <input
                  id="new-pass"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 14 }}
                />
                <label htmlFor="confirm-pass" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
                  Confirm password
                </label>
                <input
                  id="confirm-pass"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 6 }}
                />
                {error && (
                  <p style={{ color: "#b42318", fontWeight: 600, margin: "10px 0 0", fontSize: 14 }}>{error}</p>
                )}
                <button type="submit" className="btn btn-navy" disabled={busy} style={{ width: "100%", marginTop: 14 }}>
                  {busy ? "Saving…" : "Set New Password"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
