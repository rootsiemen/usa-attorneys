"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span style={{ fontSize: 14, opacity: 0.6 }}>…</span>;
  }

  if (session?.user) {
    return (
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--gold-2)",
            maxWidth: 140,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          title={session.user.email ?? ""}
        >
          {session.user.name?.split(" ")[0] ?? "Account"}
        </span>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            background: "transparent",
            border: "1px solid var(--line-gold)",
            color: "var(--ink-dark)",
            borderRadius: 8,
            padding: "8px 14px",
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Log Out
        </button>
      </span>
    );
  }

  return (
    <Link href="/login" className="hide-mobile" style={{ fontWeight: 600 }}>
      Log In
    </Link>
  );
}
