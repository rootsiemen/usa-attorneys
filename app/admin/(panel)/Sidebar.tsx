"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/attorneys", label: "Attorneys" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/claims", label: "Claims" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [counts, setCounts] = useState<{ pendingReviews: number; pendingClaims: number } | null>(null);

  useEffect(() => {
    fetch("/api/admin?action=stats")
      .then((r) => r.json())
      .then((d) => {
        if (d.stats) {
          setCounts({
            pendingReviews: d.stats.pendingReviews ?? 0,
            pendingClaims: d.stats.pendingClaims ?? 0,
          });
        }
      })
      .catch(() => {});
  }, [pathname]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function badge(href: string): number {
    if (!counts) return 0;
    if (href === "/admin/reviews") return counts.pendingReviews;
    if (href === "/admin/claims") return counts.pendingClaims;
    return 0;
  }

  return (
    <aside className="admin-sidebar">
      <Link href="/admin/dashboard" className="admin-brand">
        <span className="brand-mark">§</span>
        <span>
          USA <em>Attorneys</em>
        </span>
      </Link>
      <nav className="admin-nav">
        {NAV.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const n = badge(item.href);
          return (
            <Link key={item.href} href={item.href} className={active ? "active" : ""}>
              {item.label}
              {n > 0 && <span className="nav-count">{n}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="admin-side-foot">
        <Link href="/" target="_blank" rel="noopener">
          ← View Site
        </Link>
        <button type="button" onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
