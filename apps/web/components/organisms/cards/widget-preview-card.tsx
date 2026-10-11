import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"

export type WidgetStatus = "live" | "hidden" | "draft" | "error"

const pills = {
  live: { tone: "live", word: "On screen" },
  hidden: { tone: "offline", word: "Hidden" },
  draft: { tone: "draft", word: "Draft" },
  error: { tone: "error", word: "Error" },
} as const

/**
 * An overlay widget over a dark stand-in for gameplay, so you see it as
 * viewers will. The preview is decorative; the footer says what and where.
 */
export function WidgetPreviewCard({
  name,
  placement,
  status,
  preview,
  note,
  action,
}: {
  name: string
  /** “Bottom left · 420 × 300”. */
  placement: string
  status: WidgetStatus
  /** The widget drawn at a third of its true size. */
  preview: React.ReactNode
  /** Why it's failing: “OBS isn't loading this URL.” */
  note?: string
  /** One small action, named with the widget. */
  action?: React.ReactNode
}) {
  const pill = pills[status]
  return (
    <article
      aria-label={`${name}, ${placement}, ${pill.word}`}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-border",
        status === "error" && "shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
      )}
    >
      <div aria-hidden="true" className="dark relative aspect-video bg-page p-3">
        <StatusPill tone={pill.tone} size="sm" className="absolute start-3 top-3">
          {pill.word}
        </StatusPill>
        <div className="absolute inset-x-3 bottom-3 flex">{preview}</div>
      </div>
      <div className="flex flex-wrap items-center gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-body-sm font-semibold">{name}</span>
          <span className={cn("text-caption text-muted-foreground", status === "error" && "text-destructive-text")}>
            {note ?? placement}
          </span>
        </div>
        {action}
      </div>
    </article>
  )
}
