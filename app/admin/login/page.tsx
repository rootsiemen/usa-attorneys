"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

const ERROR_TEXT: Record<string, string> = {
  "google-failed": "Google sign-in failed — please try again.",
  "not-admin": "This Google account is not registered as an admin.",
  db: "Database error — please try again later.",
};

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");
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
          {(urlError && ERROR_TEXT[urlError]) && (
            <p className="notice" style={{ borderColor: "var(--burgundy)", marginBottom: 16 }}>
              {ERROR_TEXT[urlError]}
            </p>
          )}
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

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
            <span style={{ flex: 1, borderTop: "1px solid var(--gray-200)" }} />
            <span style={{ fontSize: 13, color: "var(--gray-600)" }}>or</span>
            <span style={{ flex: 1, borderTop: "1px solid var(--gray-200)" }} />
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/api/admin/oauth-callback" })}
            className="btn btn-gold"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 16,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.1.1c2.2-2 3.9-5 3.9-8.9z" />
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.7 2.9v.1C3.3 21.3 7.3 24 12 24z" />
              <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.7-2.9-.1.1C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-2.9z" />
              <path fill="#EA4335" d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.7l3.9 2.9c1-2.8 3.7-4.9 6.8-4.9z" />
            </svg>
            Continue with Google
          </button>
          <p style={{ fontSize: 13, color: "var(--gray-600)", marginTop: 12, textAlign: "center" }}>
            Google login works only for the registered admin email.
          </p>

          <p style={{ marginTop: 18, fontSize: 14, textAlign: "center" }}>
            <Link href="/admin/reset">Forgot password? Reset it →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginInner />
    </Suspense>
  );
}
