"use client"

import type { BotListItem } from "@/components/bots/types"
import { Badge } from "@kibo/ui/components/badge"
import { cn } from "@kibo/ui/lib/utils"

import { BotActionsMenu } from "@/components/bots/bot-actions-menu"
import { BotAvatar } from "@/components/bots/bot-avatar"

function formatStatus(status: string) {
  return status.replaceAll("_", " ").toLowerCase()
}

export function generateGradient(seed: string) {
  let hash = 0

  for (const c of seed) {
    hash = (hash * 31 + c.charCodeAt(0)) | 0
  }

  const hue = Math.abs(hash) % 360

  return `linear-gradient(
    145deg,
    hsl(${hue}, 40%, 58%),
    hsl(${(hue + 80) % 360}, 40%, 52%)
  )`
}

interface BotCardProps {
  bot: BotListItem
}

export const BotCard = ({ bot }: BotCardProps) => {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xl bg-card p-3 ring-1 ring-foreground/10">
      <div
        className="relative h-36 overflow-hidden rounded-xl"
        style={{
          backgroundImage: generateGradient(bot.id),
        }}
      ></div>

      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <BotAvatar
            name={bot.name}
            avatarUrl={bot.avatarUrl}
            className="size-10 shrink-0 rounded-full border border-border/60 bg-background shadow-sm"
          />

          <div className="min-w-0">
            <p className="truncate font-heading text-lg font-semibold tracking-tight">
              {bot.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{bot.createdAtLabel}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{bot.isActive ? "Live workspace" : "Draft workspace"}</span>
            </div>
          </div>
        </div>

        <BotActionsMenu
          botId={bot.id}
          isActive={bot.isActive}
          triggerClassName={cn(
            "size-8 shrink-0 rounded-full border border-border/60 bg-background/80 shadow-sm hover:bg-muted"
          )}
        />
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Badge variant={bot.isActive ? "default" : "secondary"}>
          {bot.isActive ? "Active" : formatStatus(bot.status)}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {bot.isActive ? "Ready to respond" : "Not yet published"}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-muted/40 px-3 py-3 ring-1 ring-border/50">
          <p className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            Knowledge
          </p>
          <p className="mt-1 text-xl leading-none font-semibold tabular-nums">
            {bot.knowledgeCount}
          </p>
        </div>
        <div className="rounded-2xl bg-muted/40 px-3 py-3 ring-1 ring-border/50">
          <p className="text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            Integrations
          </p>
          <p className="mt-1 text-xl leading-none font-semibold tabular-nums">
            {bot.integrationCount}
          </p>
        </div>
      </div>
    </div>
  )
}
