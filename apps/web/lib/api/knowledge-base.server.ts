import { apiServerFetch } from "@/lib/api/server"
import type { KnowledgeBasePageData } from "@/lib/api/types"
import { formatRelativeTime } from "@/lib/format-relative-time"

export async function getKnowledgeBasePageData(botId?: string) {
  const searchParams = new URLSearchParams()

  if (botId) {
    searchParams.set("botId", botId)
  }

  const query = searchParams.size ? `?${searchParams.toString()}` : ""
  const data = await apiServerFetch<KnowledgeBasePageData>(
    `/knowledge-base${query}`
  )

  return {
    ...data,
    selectedBot: data.selectedBot
      ? {
          ...data.selectedBot,
          knowledgeItems: data.selectedBot.knowledgeItems.map((item) => ({
            ...item,
            createdAtLabel: formatRelativeTime(new Date(item.createdAt)),
          })),
        }
      : null,
  }
}
