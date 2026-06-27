import type { BotListItem } from "@/components/bots/types"

export const seedBots: BotListItem[] = [
  {
    id: "seed-bot-aurora",
    name: "Aurora",
    status: "READY",
    avatarUrl: null,
    createdAtLabel: "2 hours ago",
    knowledgeCount: 12,
    integrationCount: 3,
    isActive: false,
  },
  {
    id: "seed-bot-pulse",
    name: "Pulse",
    status: "ACTIVE",
    avatarUrl: null,
    createdAtLabel: "5 hours ago",
    knowledgeCount: 18,
    integrationCount: 4,
    isActive: false,
  },
  {
    id: "seed-bot-luma",
    name: "Luma",
    status: "DRAFT",
    avatarUrl: null,
    createdAtLabel: "1 day ago",
    knowledgeCount: 7,
    integrationCount: 2,
    isActive: false,
  },
  {
    id: "seed-bot-nova",
    name: "Nova",
    status: "PAUSED",
    avatarUrl: null,
    createdAtLabel: "2 days ago",
    knowledgeCount: 24,
    integrationCount: 5,
    isActive: false,
  },
  {
    id: "seed-bot-echo",
    name: "Echo",
    status: "READY",
    avatarUrl: null,
    createdAtLabel: "4 days ago",
    knowledgeCount: 15,
    integrationCount: 1,
    isActive: false,
  },
  {
    id: "seed-bot-signal",
    name: "Signal",
    status: "ARCHIVED",
    avatarUrl: null,
    createdAtLabel: "1 week ago",
    knowledgeCount: 9,
    integrationCount: 2,
    isActive: false,
  },
]

export function isSeedBotId(botId: string) {
  return botId.startsWith("seed-bot-")
}
