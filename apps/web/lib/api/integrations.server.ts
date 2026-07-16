import { apiServerFetch } from "@/lib/api/server"
import type { IntegrationsPageData } from "@/lib/api/types"

export async function getIntegrationsPageData(botId?: string) {
  const searchParams = new URLSearchParams()

  if (botId) {
    searchParams.set("botId", botId)
  }

  const query = searchParams.size ? `?${searchParams.toString()}` : ""

  return apiServerFetch<IntegrationsPageData>(`/integrations${query}`)
}
