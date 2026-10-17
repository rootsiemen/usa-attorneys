import { requireAdmin } from "../require-admin";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireAdmin();
  return <SettingsForm />;
}
