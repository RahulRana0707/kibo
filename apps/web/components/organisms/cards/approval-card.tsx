"use client"

import { useState } from "react"

import { Button } from "@kibo/ui/components/button"
import { FieldCounter } from "@kibo/ui/components/field"
import { Kbd } from "@kibo/ui/components/kbd"
import { Textarea } from "@kibo/ui/components/textarea"
import { cn } from "@kibo/ui/lib/utils"

import { Confidence, SourceChip } from "@/components/atoms/source-chip"

export type ApprovalState = "pending" | "approved" | "rejected" | "expired"

/**
 * One draft waiting in Approve mode: the viewer's question, Pip's draft
 * with its source, a countdown and Approve / Edit / Reject. A, E and R act
 * on the focused card. Resolved cards fade to one line with Undo.
 */
export function ApprovalCard({
  viewer,
  time,
  question,
  draft,
  source,
  confidence,
  secondsLeft,
  state = "pending",
  resolvedBy,
  onApprove,
  onReject,
  onSend,
  onUndo,
}: {
  viewer: string
  time: string
  question: string
  draft: string
  source: string
  confidence: number
  secondsLeft: number
  state?: ApprovalState
  /** “Mira Okafor · posted to Twitch”. */
  resolvedBy?: string
  onApprove?: () => void
  onReject?: () => void
  onSend?: (text: string) => void
  onUndo?: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(draft)

  if (state !== "pending") {
    const line = {
      approved: `Approved by ${resolvedBy ?? "you"}`,
      rejected: "Rejected · not posted",
      expired: "Expired after 60 s. Chat moved on.",
    }[state]
    return (
      <article className="flex flex-wrap items-center gap-3 rounded-xl bg-raised p-4 opacity-70 shadow-border">
        <span className="text-caption text-muted-foreground">
          {viewer} · {time}
        </span>
        <span className="flex-1 text-body-sm">{question}</span>
        <span className="text-caption text-muted-foreground">{line}</span>
        {state !== "expired" && onUndo ? (
          <Button variant="ghost" size="xs" onClick={onUndo}>
            Undo
          </Button>
        ) : null}
      </article>
    )
  }

  return (
    <article
      tabIndex={0}
      aria-label={`${viewer}: ${question}`}
      onKeyDown={(event) => {
        if (editing || event.target !== event.currentTarget) return
        const key = event.key.toLowerCase()
        if (key === "a") onApprove?.()
        if (key === "e") setEditing(true)
        if (key === "r") onReject?.()
      }}
      className="flex flex-col gap-3 rounded-xl bg-raised p-4 shadow-border outline-none focus-visible:shadow-[inset_0_0_0_2px_var(--vi-accent-solid)]"
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-body-sm">
          <span className="font-semibold">{viewer}</span>{" "}
          <span className="text-caption text-muted-foreground">· {time}</span>
          <br />
          {question}
        </p>
        <span className="text-xs text-muted-foreground tabular">
          {editing ? "Paused" : `0:${String(secondsLeft).padStart(2, "0")}`}
        </span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-primary-subtle p-3">
        <p className="text-overline text-link uppercase">Pip’s draft</p>
        {editing ? (
          <>
            <Textarea
              autoGrow
              autoFocus
              aria-label="Edit reply"
              value={text}
              maxLength={200}
              onChange={(event) => setText(event.target.value)}
              className="bg-page"
            />
            <FieldCounter value={text.length} max={200} />
          </>
        ) : (
          <p className="text-body-sm">{text}</p>
        )}
        <span className="flex flex-wrap items-center gap-2">
          <SourceChip>{source}</SourceChip>
          <Confidence value={confidence} suffix="sure" />
        </span>
      </div>
      <div className={cn("flex flex-wrap gap-2 max-sm:*:h-12 max-sm:*:flex-1")}>
        {editing ? (
          <>
            <Button size="sm" onClick={() => onSend?.(text)}>
              Send
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onApprove}>
              Approve <Kbd className="max-sm:hidden">A</Kbd>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
              Edit <Kbd className="max-sm:hidden">E</Kbd>
            </Button>
            <Button variant="ghost" size="sm" onClick={onReject}>
              Reject <Kbd className="max-sm:hidden">R</Kbd>
            </Button>
          </>
        )}
      </div>
    </article>
  )
}
