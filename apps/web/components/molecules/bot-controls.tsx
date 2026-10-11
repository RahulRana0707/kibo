"use client"

import { useId } from "react"
import { PauseIcon, PlayIcon, WrenchIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@kibo/ui/components/tooltip"
import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"

export type BotState = "live" | "paused" | "offline" | "error"

const labels: Record<BotState, string> = {
  live: "Live",
  paused: "Paused",
  offline: "Offline",
  error: "Error",
}

/**
 * The bot's state beside Pause, in role="status" so changes are announced
 * (“Pip is paused”). Offline until a bot is running.
 */
export function BotStatus({
  status = "offline",
  label,
  size = "default",
  className,
}: {
  status?: BotState
  /** Override the word, such as “Live on 2 platforms”. */
  label?: string
  size?: "default" | "sm"
  className?: string
}) {
  return (
    <span role="status" className={cn("inline-flex", className)}>
      <StatusPill tone={status} size={size}>
        {label ?? labels[status]}
      </StatusPill>
    </span>
  )
}

/**
 * Pause bot, always beside the status. Live → Pause, Paused → Resume
 * (primary), Error → Fix. `soonReason` keeps it focusable but inert while
 * pausing doesn't exist. `compact` is the 44px icon button for phones.
 */
export function PauseBotButton({
  status = "offline",
  compact = false,
  pending = false,
  soonReason,
  onToggle,
  onFix,
}: {
  status?: BotState
  compact?: boolean
  /** Pausing or resuming in progress. */
  pending?: boolean
  soonReason?: string
  onToggle?: () => void
  onFix?: () => void
}) {
  const reasonId = useId()

  if (status === "error" && !soonReason) {
    return (
      <Button
        variant="secondary"
        size={compact ? "icon-lg" : "sm"}
        aria-label={compact ? "Fix bot" : undefined}
        onClick={onFix}
      >
        <WrenchIcon aria-hidden="true" />
        {compact ? null : "Fix"}
      </Button>
    )
  }

  const paused = status === "paused"
  const label = pending
    ? paused
      ? "Resuming…"
      : "Pausing…"
    : paused
      ? "Resume bot"
      : "Pause bot"
  const Icon = paused ? PlayIcon : PauseIcon

  const button = (
    <Button
      variant={paused ? "primary" : "secondary"}
      size={compact ? "icon-lg" : "sm"}
      loading={pending}
      aria-disabled={soonReason ? true : undefined}
      aria-describedby={soonReason ? reasonId : undefined}
      aria-label={compact ? label : undefined}
      aria-keyshortcuts="Shift+P"
      onClick={() => {
        if (!soonReason && !pending) onToggle?.()
      }}
      className={cn(
        compact && "text-foreground",
        soonReason && "aria-disabled:bg-raised aria-disabled:text-disabled aria-disabled:shadow-border"
      )}
    >
      {pending ? null : <Icon aria-hidden="true" />}
      {compact ? null : label}
    </Button>
  )

  return (
    <>
      {compact || soonReason ? (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent>{soonReason ?? label}</TooltipContent>
        </Tooltip>
      ) : (
        button
      )}
      {soonReason ? (
        <span id={reasonId} className="sr-only">
          {soonReason}
        </span>
      ) : null}
    </>
  )
}
