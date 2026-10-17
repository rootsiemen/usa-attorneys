"use client";

import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  return (
    <button
      type="button"
      className="btn btn-navy"
      style={{ width: "100%" }}
      onClick={() => signIn("google", { callbackUrl: "/admin/reset" })}
    >
      Continue with Google
    </button>
  );
}
