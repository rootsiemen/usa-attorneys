import type { Metadata } from "next";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log In — USA Attorneys",
  description: "Log in to USA Attorneys with your Google account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <section className="section-light">
      <div className="container">
        <div style={{ maxWidth: 460, margin: "0 auto", textAlign: "center" }}>
          <span className="eyebrow">Account</span>
          <h2 style={{ fontSize: 32, margin: "0 0 12px" }}>Welcome Back</h2>
          <p style={{ color: "var(--gray-600)", margin: "0 0 28px" }}>
            Log in with your Google account to save attorneys, write
            reviews, and manage your firm listing.
          </p>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
