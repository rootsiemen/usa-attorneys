import { requireAdmin } from "../require-admin";
import { ClaimsManager } from "./ClaimsManager";

export const dynamic = "force-dynamic";

export default async function ClaimsPage() {
  await requireAdmin();
  return <ClaimsManager />;
}
