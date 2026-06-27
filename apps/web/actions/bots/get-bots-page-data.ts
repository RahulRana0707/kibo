import "server-only"

import { formatRelativeTime } from "@/lib/format-relative-time"
import { prisma } from "@/lib/prisma"

import { seedBots } from "@/components/bots/bot-seed-data"
import type { BotListItem } from "@/components/bots/types"

export async function getBotsPageData(sessionUserId: string) {
  const [user, bots] = await Promise.all([
    prisma.user.findUnique({
      where: { id: sessionUserId },
      select: { activeBotId: true },
    }),
    prisma.bot.findMany({
      where: { userId: sessionUserId },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        name: true,
        status: true,
        avatarUrl: true,
        createdAt: true,
        _count: {
          select: {
            knowledgeItems: true,
            integrations: true,
          },
        },
      },
    }),
  ])

  const createdBots: BotListItem[] = bots.map((bot) => ({
    id: bot.id,
    name: bot.name,
    status: bot.status,
    avatarUrl: bot.avatarUrl,
    createdAtLabel: formatRelativeTime(bot.createdAt),
    knowledgeCount: bot._count.knowledgeItems,
    integrationCount: bot._count.integrations,
    isActive: user?.activeBotId === bot.id,
  }))

  return { user, bots: [...createdBots] }
}
