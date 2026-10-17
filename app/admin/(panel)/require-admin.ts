import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";

/** Server-component guard: redirects to /admin/login when not logged in. Returns admin email. */
export async function requireAdmin(): Promise<string> {
  const email = await getAdminSession();
  if (!email) {
    redirect("/admin/login");
  }
  return email;
}
