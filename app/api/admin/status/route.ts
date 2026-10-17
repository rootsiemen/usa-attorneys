import { NextResponse } from "next/server";
import { adminUserCount } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** GET /api/admin/status — public: tells the login page whether setup is needed. */
export async function GET() {
  try {
    const count = await adminUserCount();
    return NextResponse.json({ setupNeeded: count === 0 });
  } catch {
    return NextResponse.json({ setupNeeded: false, dbDown: true });
  }
}
