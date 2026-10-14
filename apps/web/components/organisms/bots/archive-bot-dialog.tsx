"use client"

import { useState } from "react"
import type { BotListItemDto } from "@kibo/contracts"

import { ConfirmDialog } from "@kibo/ui/components/confirm-dialog"

/**
 * Archiving is reversible, so the dialog is calm (no red) and the toast
 * that follows offers Undo. It says what stops and what stays.
 */
export function ArchiveBotDialog({
  bot,
  onOpenChange,
  onConfirm,
}: {
  bot: BotListItemDto | null
  onOpenChange: (open: boolean) => void
  onConfirm: (bot: BotListItemDto) => void
}) {
  // Keep the last bot on screen while the dialog animates closed.
  const [shown, setShown] = useState(bot)
  if (bot && bot !== shown) setShown(bot)

  return (
    <ConfirmDialog
      open={bot !== null}
      onOpenChange={onOpenChange}
      variant="default"
      title={`Archive “${shown?.name ?? ""}”?`}
      description={
        <p>
          {shown?.name} stops running and frees up a bot slot on your plan. Its
          knowledge, settings and history stay, and you can restore it any
          time.
        </p>
      }
      confirmLabel="Archive bot"
      onConfirm={() => {
        if (bot) onConfirm(bot)
      }}
    />
  )
}
