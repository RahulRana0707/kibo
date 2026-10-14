import type { BotListQuery } from "@kibo/contracts"

/**
 * Every cache key in one place, so a change can refresh exactly what it
 * affects: `queryKeys.bots.all` covers every bots list.
 */
export const queryKeys = {
  workspace: ["workspace"] as const,
  bots: {
    all: ["bots"] as const,
    list: (query: BotListQuery) => ["bots", query] as const,
  },
  bot: (botId: string) => ["bot", botId] as const,
}
