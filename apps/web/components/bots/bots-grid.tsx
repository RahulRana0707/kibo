"use client"

import type { BotListItem } from "@/components/bots/types"
import { BotCard } from "./bot-card"

export function BotsGrid({ bots }: { bots: BotListItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {bots.map((bot) => (
        <BotCard bot={bot} key={bot.id} />
      ))}
    </div>
  )
}
