"use client"

import { useState } from "react"
import type { BotListItemDto } from "@kibo/contracts"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import { ConfirmDialog } from "@kibo/ui/components/confirm-dialog"

/**
 * Deleting can't be undone: the name must be typed exactly, and a bot
 * that isn't archived yet is offered Archive instead.
 */
export function DeleteBotDialog({
  bot,
  onOpenChange,
  onConfirm,
  onArchiveInstead,
}: {
  bot: BotListItemDto | null
  onOpenChange: (open: boolean) => void
  /** Resolves once deleted; the dialog shows “Deleting…” until then. */
  onConfirm: (bot: BotListItemDto) => Promise<void>
  onArchiveInstead: (bot: BotListItemDto) => void
}) {
  // Keep the last bot on screen while the dialog animates closed.
  const [shown, setShown] = useState(bot)
  if (bot && bot !== shown) setShown(bot)

  return (
    <ConfirmDialog
      open={bot !== null}
      onOpenChange={onOpenChange}
      title={`Delete “${shown?.name ?? ""}”?`}
      description={
        <div className="flex flex-col gap-4">
          <p>
            This permanently deletes {shown?.name}, its settings and its
            escalation rules. Shared knowledge stays with your other bots.
            This can’t be undone.
          </p>
          {shown && !shown.archivedAt ? (
            <Callout tone="warning">
              Want to keep the history?{" "}
              <Button
                variant="link"
                className="text-current underline underline-offset-4"
                onClick={() => onArchiveInstead(shown)}
              >
                Archive it instead
              </Button>
              .
            </Callout>
          ) : null}
        </div>
      }
      typeToConfirm={shown?.name}
      confirmLabel={`Delete ${shown?.name ?? "bot"}`}
      pendingLabel="Deleting…"
      onConfirm={async () => {
        if (bot) await onConfirm(bot)
      }}
    />
  )
}
