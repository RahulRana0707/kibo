"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { Checkbox } from "@kibo/ui/components/checkbox"
import { cn } from "@kibo/ui/lib/utils"

import { MessageTag, type MessageKind } from "@/components/atoms/message-tag"

/**
 * A message Pip held for review: who, what, which rule held it and why,
 * then Allow, Delete, Time out or Ban. Banned words stay hidden until
 * “Show message”. Nothing held reaches chat until allowed.
 */
export function ModQueueItem({
  viewer,
  kinds,
  context,
  message,
  reason,
  hidden = false,
  selected,
  onSelectedChange,
  resolved,
  onAction,
  onUndo,
}: {
  viewer: string
  kinds: MessageKind[]
  /** “7:46 · first message”. */
  context: string
  message: string
  /** “Held by Links rule: domain not on your allowed list.” */
  reason: string
  hidden?: boolean
  selected?: boolean
  onSelectedChange?: (selected: boolean) => void
  /** “Allowed by kvn.exe · posted to chat”. */
  resolved?: string
  onAction?: (action: "allow" | "delete" | "timeout" | "ban") => void
  onUndo?: () => void
}) {
  const [shown, setShown] = useState(!hidden)

  return (
    <li
      className={cn(
        "flex items-start gap-3 border-b border-separator p-4 transition-colors duration-instant last:border-b-0 hover:bg-hovered",
        selected && "bg-primary-subtle hover:bg-primary-subtle",
        resolved && "opacity-65"
      )}
    >
      {onSelectedChange ? (
        <Checkbox
          checked={selected}
          onCheckedChange={(value) => onSelectedChange(value === true)}
          aria-label={`Select ${viewer}`}
          className="mt-0.5"
        />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <h3 className="flex flex-wrap items-center gap-1.5 text-body-sm font-semibold">
          {viewer}
          {kinds.map((kind) => (
            <MessageTag key={kind} kind={kind} />
          ))}
          <span className="text-caption font-normal text-muted-foreground">{context}</span>
        </h3>
        {shown ? (
          <p className="text-body-sm">{message}</p>
        ) : (
          <p className="text-body-sm text-muted-foreground">
            Message hidden (banned word).{" "}
            <button type="button" className="text-link hover:underline" onClick={() => setShown(true)}>
              Show message
            </button>
          </p>
        )}
        {resolved ? (
          <p className="flex items-center gap-2 text-caption text-success-text">
            {resolved}
            {onUndo ? (
              <Button variant="ghost" size="xs" onClick={onUndo}>
                Undo
              </Button>
            ) : null}
          </p>
        ) : (
          <>
            <p className="text-caption text-muted-foreground">{reason}</p>
            <div className="mt-1 flex flex-wrap gap-2 max-sm:*:h-11">
              <Button variant="secondary" size="xs" onClick={() => onAction?.("allow")}>
                Allow
              </Button>
              <Button variant="secondary" size="xs" onClick={() => onAction?.("delete")}>
                Delete
              </Button>
              <Button variant="secondary" size="xs" className="max-sm:hidden" onClick={() => onAction?.("timeout")}>
                Time out
              </Button>
              <Button
                variant="destructive"
                size="xs"
                aria-label={`Ban ${viewer}`}
                className="max-sm:hidden"
                onClick={() => onAction?.("ban")}
              >
                Ban
              </Button>
            </div>
          </>
        )}
      </div>
    </li>
  )
}
