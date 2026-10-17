"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const r = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (r.ok) {
        router.push("/admin");
        router.refresh();
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
          <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Admin Login</h1>
          <p style={{ color: "var(--gray-600)", margin: "0 0 8px", fontSize: 15 }}>
            Log in to manage attorneys, reviews, and claim requests.
          </p>
          <form onSubmit={submit}>
            <label htmlFor="a-email">Email</label>
            <input
              id="a-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            <label htmlFor="a-pass">Password</label>
            <input
              id="a-pass"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p style={{ color: "#b42318", fontWeight: 600, margin: "14px 0 0" }}>{error}</p>
            )}
            <button type="submit" className="btn btn-navy" disabled={busy}>
              {busy ? "Please wait…" : "Log In"}
            </button>
          </form>
          <p style={{ marginTop: 18, fontSize: 14 }}>
            <Link href="/admin/reset">Forgot password? Reset it →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
