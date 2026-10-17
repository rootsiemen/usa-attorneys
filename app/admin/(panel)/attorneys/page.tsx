import { Suspense } from "react";
import { requireAdmin } from "../require-admin";
import { AttorneysManager } from "./AttorneysManager";

export const dynamic = "force-dynamic";

export default async function AttorneysPage() {
  await requireAdmin();
  return (
    <Suspense>
      <AttorneysManager />
    </Suspense>
  );
}
