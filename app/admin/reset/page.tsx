import { redirect } from "next/navigation";
import Link from "next/link";
import { getOwnerSession } from "@/lib/admin-auth";
import { ResetForm } from "./ResetForm";
import { GoogleSignInButton } from "./GoogleSignInButton";

export const dynamic = "force-dynamic";

export default async function AdminResetPage() {
  const owner = await getOwnerSession();

  return (
    <section className="section">
      <div className="container">
        {owner ? (
          <ResetForm ownerEmail={owner.user?.email ?? ""} />
        ) : (
          <div className="form-card">
            <span className="eyebrow">Password Reset</span>
            <h1 style={{ margin: "0 0 8px", fontSize: 30 }}>Owner Verification</h1>
            <p style={{ color: "var(--gray-600)", margin: "0 0 20px", fontSize: 15 }}>
              To reset the admin password, first verify you are the site owner by
              signing in with Google using the owner account.
            </p>
            <GoogleSignInButton />
            <p style={{ marginTop: 18, fontSize: 14 }}>
              <Link href="/admin/login">← Back to login</Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
