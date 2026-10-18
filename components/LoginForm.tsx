"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "signup") {
        const r = await fetch("/api/customer/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const d = await r.json();
        if (!r.ok) {
          setError(d.error || "Signup failed");
          return;
        }
      }
      const res = await signIn("email-login", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      });
      if (res?.error) {
        setError(mode === "signup" ? "Account created — but login failed, please try logging in" : "Invalid email or password");
      } else if (res?.url) {
        window.location.href = res.url;
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Network error — please try again");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setError(null); }}
            className={`btn ${mode === m ? "btn-navy" : "btn-outline"}`}
            style={{ flex: 1 }}
          >
            {m === "login" ? "Log In" : "Sign Up"}
          </button>
        ))}
      </div>

      <form onSubmit={submitEmail}>
        {mode === "signup" && (
          <>
            <label htmlFor="cu-name" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
              Your name
            </label>
            <input
              id="cu-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane D."
              maxLength={80}
              style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 14 }}
            />
          </>
        )}
        <label htmlFor="cu-email" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
          Email
        </label>
        <input
          id="cu-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 14 }}
        />
        <label htmlFor="cu-pass" style={{ display: "block", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>
          Password {mode === "signup" && <span style={{ fontWeight: 400, color: "var(--gray-600)" }}>(min 8 characters)</span>}
        </label>
        <input
          id="cu-pass"
          type="password"
          required
          minLength={mode === "signup" ? 8 : 1}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px 14px", border: "1px solid var(--gray-200)", borderRadius: 8, fontSize: 15, marginBottom: 6 }}
        />
        {error && (
          <p style={{ color: "#b42318", fontWeight: 600, margin: "10px 0 0", fontSize: 14 }}>{error}</p>
        )}
        {mode === "login" && (
          <p style={{ margin: "10px 0 0", fontSize: 14, textAlign: "right" }}>
            <a href="/forgot-password" style={{ color: "var(--navy)", fontWeight: 600 }}>Forgot password?</a>
          </p>
        )}
        <button type="submit" className="btn btn-navy" disabled={busy} style={{ width: "100%", marginTop: 14 }}>
          {busy ? "Please wait…" : mode === "login" ? "Log In with Email" : "Create Account"}
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
        <span style={{ flex: 1, borderTop: "1px solid var(--gray-200)" }} />
        <span style={{ fontSize: 13, color: "var(--gray-600)" }}>or</span>
        <span style={{ flex: 1, borderTop: "1px solid var(--gray-200)" }} />
      </div>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
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
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.9-.1-1.5-.3-2.3H12v4.5h6.5c-.1 1.1-.8 2.7-2.4 3.8l-.1.1 3.5 2.7.1.1c2.2-2 3.9-5 3.9-8.9z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 6-1.1 7.9-2.9l-3.8-2.9c-1 .7-2.4 1.2-4.1 1.2-3.1 0-5.8-2.1-6.8-5l-.1.1-3.7 2.9v.1C3.3 21.3 7.3 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.7.4-2.4l-.1-.1-3.7-2.9-.1.1C.5 8.3 0 10.1 0 12s.5 3.7 1.3 5.3l3.9-2.9z"
          />
          <path
            fill="#EA4335"
            d="M12 4.7c1.8 0 3 .8 3.7 1.4l3.3-3.2C17.9 1.1 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.7l3.9 2.9c1-2.8 3.7-4.9 6.8-4.9z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
