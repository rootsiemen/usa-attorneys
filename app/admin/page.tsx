import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

// Note: /admin is disallowed in robots.ts and should never be indexed.

export default async function AdminPage() {
  const email = await getAdminSession();
  if (!email) {
    redirect("/admin/login");
  }
  return <AdminDashboard adminEmail={email} />;
}
