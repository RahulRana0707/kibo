import { apiServerFetch } from "@/lib/api/server"
import type { BotDetail, BotsPageData } from "@/lib/api/types"
import { formatRelativeTime } from "@/lib/format-relative-time"

export async function getBotsPageData() {
  const data = await apiServerFetch<BotsPageData>("/bots")

  return {
    ...data,
    bots: data.bots.map((bot) => ({
      ...bot,
      createdAtLabel: formatRelativeTime(new Date(bot.createdAt)),
    })),
  }
}

export async function getBot(botId: string) {
  return apiServerFetch<BotDetail>(`/bots/${botId}`)
}
