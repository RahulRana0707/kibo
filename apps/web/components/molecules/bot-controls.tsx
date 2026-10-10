"use client"

import { useId } from "react"
import { PauseIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"

/** The bot's state beside the kill switch. Offline until a bot is running. */
export function BotStatus({ className }: { className?: string }) {
  return (
    <StatusPill tone="ready" className={className}>
      <span role="status">Offline</span>
    </StatusPill>
  )
}

/**
 * Pause bot, always in the top bar. Disabled while no bot is running; the
 * reason is announced with the button.
 */
export function PauseBotButton({ compact = false }: { compact?: boolean }) {
  const reasonId = useId()

  return (
    <>
      <Button
        variant="secondary"
        size={compact ? "icon" : "default"}
        disabled
        aria-describedby={reasonId}
        aria-label={compact ? "Pause bot" : undefined}
        className={cn(compact && "size-11 text-foreground")}
      >
        <PauseIcon aria-hidden="true" />
        {compact ? null : "Pause bot"}
      </Button>
      <span id={reasonId} className="sr-only">
        No bot is running yet.
      </span>
    </>
  )
}
