"use client"

import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  CopyIcon,
  MoreHorizontalIcon,
  PauseIcon,
  PlayIcon,
  StarIcon,
  Trash2Icon,
} from "lucide-react"
import type { BotListItemDto } from "@kibo/contracts"

import { Button } from "@kibo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@kibo/ui/components/dropdown-menu"

export type BotRowAction =
  | "duplicate"
  | "makeDefault"
  | "pause"
  | "resume"
  | "archive"
  | "restore"
  | "delete"

/**
 * The end of a bot row: the one action the state calls for (Resume a
 * paused bot, Restore an archived one) and the ⋯ menu with the rest.
 * Destructive actions sit last, after a separator.
 */
export function BotRowActions({
  bot,
  atLimit,
  onAction,
}: {
  bot: BotListItemDto
  /** Every bot slot is used, so Duplicate can't make another. */
  atLimit: boolean
  onAction: (action: BotRowAction, bot: BotListItemDto) => void
}) {
  const archived = bot.archivedAt !== null
  const inline = archived
    ? { action: "restore" as const, label: "Restore" }
    : bot.status === "paused"
      ? { action: "resume" as const, label: "Resume" }
      : null

  return (
    <span className="flex items-center justify-end gap-1 whitespace-nowrap">
      {inline ? (
        <Button
          variant="ghost"
          size="sm"
          className="max-sm:hidden"
          onClick={() => onAction(inline.action, bot)}
        >
          {inline.label}
        </Button>
      ) : null}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${bot.name}`}>
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          {archived ? (
            <DropdownMenuItem onSelect={() => onAction("restore", bot)}>
              <ArchiveRestoreIcon />
              Restore bot
            </DropdownMenuItem>
          ) : (
            <>
              <DropdownMenuItem
                disabled={atLimit}
                description={atLimit ? "Every bot slot on your plan is in use." : undefined}
                onSelect={() => onAction("duplicate", bot)}
              >
                <CopyIcon />
                Duplicate bot
              </DropdownMenuItem>
              {bot.isDefault ? null : (
                <DropdownMenuItem onSelect={() => onAction("makeDefault", bot)}>
                  <StarIcon />
                  Set as default bot
                </DropdownMenuItem>
              )}
              {bot.status === "paused" ? (
                <DropdownMenuItem onSelect={() => onAction("resume", bot)}>
                  <PlayIcon />
                  Resume bot
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  disabled={bot.status === "draft"}
                  description={
                    bot.status === "draft" ? "Finish setup to go live first." : undefined
                  }
                  onSelect={() => onAction("pause", bot)}
                >
                  <PauseIcon />
                  Pause bot
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onSelect={() => onAction("archive", bot)}>
                <ArchiveIcon />
                Archive bot
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onSelect={() => onAction("delete", bot)}>
            <Trash2Icon />
            Delete bot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  )
}
