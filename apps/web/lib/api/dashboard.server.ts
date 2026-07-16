import { apiServerFetch } from "@/lib/api/server"
import type { DashboardPageData } from "@/lib/api/types"

export async function getDashboardPageData() {
  return apiServerFetch<DashboardPageData>("/dashboard")
}
