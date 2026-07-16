import { apiClientFetch } from "@/lib/api/client"
import type { BotDetail, BotInput } from "@/lib/api/types"

export async function createBot(input: BotInput) {
  return apiClientFetch<BotDetail>("/bots", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export async function updateBot(botId: string, input: BotInput) {
  return apiClientFetch<BotDetail>(`/bots/${botId}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  })
}

export async function deleteBot(botId: string) {
  return apiClientFetch<{ deleted: boolean }>(`/bots/${botId}`, {
    method: "DELETE",
  })
}

export async function setActiveBot(botId: string) {
  return apiClientFetch<{ activeBotId: string }>(`/bots/${botId}/active`, {
    method: "POST",
  })
}
