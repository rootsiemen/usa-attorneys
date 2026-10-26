"use client";

import { use, useState } from "react";
import Link from "next/link";

export default function AdminResetTokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
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
      const r = await fetch("/api/admin/reset-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
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
    <section className="section">
      <div className="container">
        <div className="form-card">
          <span className="eyebrow">Site Administration</span>
          <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Set New Password</h1>
          {done ? (
            <>
              <p className="notice" style={{ borderColor: "var(--gold)", marginBottom: 16 }}>
                ✓ Password changed! You can now log in with your new password.
              </p>
              <Link href="/admin/login" className="btn btn-primary" style={{ width: "100%" }}>
                Go to Login
              </Link>
            </>
          ) : (
            <>
              <p style={{ color: "var(--gray-600)", margin: "0 0 16px", fontSize: 15 }}>
                Choose a new admin password (min 10 characters).
              </p>
              <form onSubmit={submit}>
                <label className="label" htmlFor="new-pass">New password</label>
                <input
                  id="new-pass"
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                />
                <label className="label" htmlFor="confirm-pass" style={{ marginTop: 12 }}>Confirm password</label>
                <input
                  id="confirm-pass"
                  type="password"
                  className="input"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={10}
                  autoComplete="new-password"
                />
                {error && (
                  <p className="notice" style={{ borderColor: "var(--burgundy)", margin: "12px 0" }}>
                    {error}
                  </p>
                )}
                <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }} disabled={busy}>
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
