"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ResetForm({ ownerEmail }: { ownerEmail: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

  if (done) {
    return (
      <div className="form-card">
        <span className="eyebrow">Password Reset</span>
        <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Password Updated ✓</h1>
        <p style={{ color: "var(--gray-600)" }}>
          The admin password has been reset. You can now log in with the new password.
        </p>
        <p>
          <Link href="/admin/login" className="btn btn-navy">
            Go to Admin Login
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <span className="eyebrow">Password Reset</span>
      <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Set a New Password</h1>
      <p style={{ color: "var(--gray-600)", margin: "0 0 8px", fontSize: 15 }}>
        Verified as site owner ({ownerEmail}). Enter the admin account email and a new password.
      </p>
      <form onSubmit={submit}>
        <label htmlFor="r-email">Admin email</label>
        <input
          id="r-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />
        <label htmlFor="r-pass">New password (min 10 characters)</label>
        <input
          id="r-pass"
          type="password"
          required
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={10}
        />
        <label htmlFor="r-confirm">Confirm new password</label>
        <input
          id="r-confirm"
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          minLength={10}
        />
        {error && (
          <p style={{ color: "#b42318", fontWeight: 600, margin: "14px 0 0" }}>{error}</p>
        )}
        <button type="submit" className="btn btn-navy" disabled={busy}>
          {busy ? "Please wait…" : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
