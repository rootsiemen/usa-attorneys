import { requireAdmin } from "../require-admin";
import { ReviewsManager } from "./ReviewsManager";

export const dynamic = "force-dynamic";

export default async function ReviewsPage() {
  await requireAdmin();
  return <ReviewsManager />;
}
