import { InfoIcon, PinIcon, TimerIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { cn } from "@kibo/ui/lib/utils"

import {
  PlatformIcon,
  platforms,
  type Platform,
} from "@/components/atoms/platform-icon"
import { Confidence, SourceChip } from "@/components/atoms/source-chip"
import { ClampedText } from "@/components/molecules/clamped-text"

const noteIcons = { info: InfoIcon, timeout: TimerIcon }

type ChatMessageProps = {
  /** Who sent it, or the note's headline. */
  author: string
  platform?: Platform
  /** Pip's own reply. */
  bot?: boolean
  /** A system note (“Slow mode on”), with `noteKind` for its icon. */
  note?: boolean
  noteKind?: keyof typeof noteIcons
  /** Tags after the name, such as <MessageTag kind="question" />. */
  tag?: React.ReactNode
  time?: string
  source?: string
  /** “Why it answered”, shown when the source chip is opened. */
  sourceWhy?: React.ReactNode
  confidence?: number | null
  tone?: "default" | "flagged"
  /**
   * pending: a draft waiting for approval · removed: deleted by moderation
   * · pinned: pinned by the creator · edited: a reply someone changed.
   */
  status?: "pending" | "removed" | "pinned" | "edited"
  /** Approve / Edit / Reject for pending drafts. */
  actions?: React.ReactNode
  /** A line under the message, such as “Removed by Pip · Undo”. */
  footnote?: React.ReactNode
  /** Clamp long messages to two lines with Show more. */
  clamp?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * One row per chat event from YouTube and Twitch, plus Pip's replies and
 * system notes. Read as an article: “kvn.exe on Twitch, Command, 7:42”.
 */
export function ChatMessage({
  author,
  platform,
  bot = false,
  note = false,
  noteKind = "info",
  tag,
  time,
  source,
  sourceWhy,
  confidence,
  tone = "default",
  status,
  actions,
  footnote,
  clamp = false,
  className,
  children,
}: ChatMessageProps) {
  const NoteIcon = noteIcons[noteKind]
  const muted = note || status === "removed"

  return (
    <article
      className={cn(
        "relative flex items-start gap-2.5 rounded-md px-2.5 py-2 transition-colors duration-instant",
        !bot && !muted && !status && tone === "default" && "hover:bg-hovered",
        bot && "bg-surface",
        tone === "flagged" && "bg-destructive-subtle",
        muted && "bg-sunken",
        status === "pending" &&
          "bg-primary-subtle shadow-[inset_3px_0_0_var(--vi-accent-solid)]",
        status === "pinned" &&
          "bg-warning-subtle shadow-[inset_3px_0_0_var(--vi-warning-solid)]",
        className
      )}
    >
      {note ? (
        <span className="grid size-5.5 shrink-0 place-items-center text-muted-foreground">
          <NoteIcon aria-hidden="true" className="size-4" />
        </span>
      ) : bot ? (
        <Avatar name={author} variant="bot" size="sm" />
      ) : platform ? (
        <PlatformIcon platform={platform} label={platforms[platform]} />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-1.5 text-caption">
          {status === "pinned" ? (
            <PinIcon aria-label="Pinned" className="size-3.5 text-warning-text" />
          ) : null}
          <span className={cn("font-semibold", note && "font-medium")}>
            {author}
          </span>
          {tag}
          {status === "edited" ? (
            <span className="text-xs text-muted-foreground">Edited</span>
          ) : null}
          {time ? (
            <span className="text-xs text-muted-foreground tabular">
              {time}
            </span>
          ) : null}
        </div>
        <div
          className={cn(
            muted ? "text-caption text-muted-foreground" : "text-body-sm",
            status === "removed" && "italic line-through"
          )}
        >
          {clamp ? <ClampedText>{children}</ClampedText> : children}
        </div>
        {source ? (
          <div className="flex flex-wrap items-center gap-2">
            <SourceChip why={sourceWhy}>{source}</SourceChip>
            {confidence !== undefined ? (
              <Confidence value={confidence} />
            ) : null}
          </div>
        ) : null}
        {footnote ? (
          <p className="text-caption text-muted-foreground">{footnote}</p>
        ) : null}
        {actions ? (
          <div className="mt-1 flex flex-wrap gap-2 max-sm:*:h-11">{actions}</div>
        ) : null}
      </div>
    </article>
  )
}

/**
 * A stack of chat messages. Live feeds are role="log" without live
 * announcements; too busy to read aloud.
 */
export function ChatFeed({
  live = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { live?: boolean }) {
  return (
    <div
      role={live ? "log" : undefined}
      aria-live={live ? "off" : undefined}
      className={cn("flex flex-col gap-0.5", className)}
      {...props}
    />
  )
}
