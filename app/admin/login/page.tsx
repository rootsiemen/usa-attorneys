"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"loading" | "setup" | "login">("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/status")
      .then((r) => r.json())
      .then((d) => setMode(d.setupNeeded ? "setup" : "login"))
      .catch(() => setMode("login"));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (mode === "setup" && password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch(mode === "setup" ? "/api/admin/setup" : "/api/admin/login", {
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
          <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>
            {mode === "setup" ? "Set Up Admin Access" : "Admin Login"}
          </h1>
          <p style={{ color: "var(--gray-600)", margin: "0 0 8px", fontSize: 15 }}>
            {mode === "setup"
              ? "This is the first run — create your admin email and password. It will be stored securely (hashed) in the site database."
              : "Log in to manage attorneys, reviews, and claim requests."}
          </p>
          {mode === "loading" ? (
            <p>Loading…</p>
          ) : (
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
              <label htmlFor="a-pass">
                {mode === "setup" ? "Create password (min 10 characters)" : "Password"}
              </label>
              <input
                id="a-pass"
                type="password"
                required
                autoComplete={mode === "setup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={10}
              />
              {mode === "setup" && (
                <>
                  <label htmlFor="a-confirm">Confirm password</label>
                  <input
                    id="a-confirm"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    minLength={10}
                  />
                </>
              )}
              {error && (
                <p style={{ color: "#b42318", fontWeight: 600, margin: "14px 0 0" }}>{error}</p>
              )}
              <button type="submit" className="btn btn-navy" disabled={busy}>
                {busy ? "Please wait…" : mode === "setup" ? "Create Admin Account" : "Log In"}
              </button>
            </form>
          )}
          {mode === "login" && (
            <p style={{ marginTop: 18, fontSize: 14 }}>
              <Link href="/admin/reset">Forgot password? Reset it →</Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
