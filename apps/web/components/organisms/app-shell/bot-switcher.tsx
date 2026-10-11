"use client"

import { ChevronDownIcon, PlusIcon, SlidersHorizontalIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"
import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"
import type { BotState } from "@/components/molecules/bot-controls"

export type BotSummary = { id: string; name: string; status: BotState }

const statusWord: Record<BotState, string> = {
  live: "live",
  paused: "paused",
  offline: "offline",
  error: "error",
}

/**
 * The bot a page is about, and later the menu to switch. One bot per
 * workspace today: other bots are listed but Soon, and so are Create and
 * Manage.
 */
export function BotSwitcher({
  bots = [],
  currentId,
}: {
  bots?: BotSummary[]
  currentId?: string
}) {
  const current = bots.find((bot) => bot.id === currentId) ?? bots[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          aria-label={
            current
              ? `Bot: ${current.name}, ${statusWord[current.status]}`
              : "Switch bot, no bot yet"
          }
          className="ps-1.5 pe-2.5 aria-expanded:bg-pressed"
        >
          {current ? (
            <Avatar name={current.name} variant="bot" size="sm" />
          ) : (
            <span
              aria-hidden="true"
              className="size-6 shrink-0 rounded-full border border-dashed border-border-strong"
            />
          )}
          <span
            className={cn(
              current ? "text-[0.9375rem] font-semibold" : "text-muted-foreground"
            )}
          >
            {current?.name ?? "No bot yet"}
          </span>
          <ChevronDownIcon aria-hidden="true" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-75">
        <DropdownMenuLabel>Bots in this workspace</DropdownMenuLabel>
        {bots.length === 0 ? (
          <p className="px-2.5 py-2 text-body-sm text-muted-foreground">
            You haven’t created a bot yet.
          </p>
        ) : (
          bots.map((bot) => (
            <DropdownMenuItem
              key={bot.id}
              soon={bot.id !== current?.id}
              className="min-h-11"
            >
              <Avatar name={bot.name} variant="bot" size="sm" />
              <span className="flex-1 font-medium">{bot.name}</span>
              <StatusPill tone={bot.status} size="sm" />
            </DropdownMenuItem>
          ))
        )}
        {bots.length > 1 ? (
          <p className="px-2.5 pb-2 text-caption text-muted-foreground">
            Switching bots is coming soon.
          </p>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem soon>
          <PlusIcon aria-hidden="true" />
          Create bot
        </DropdownMenuItem>
        <DropdownMenuItem soon>
          <SlidersHorizontalIcon aria-hidden="true" />
          Manage bots
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
