import { cn } from "@kibo/ui/lib/utils"

import { Monogram } from "@/components/atoms/monogram"
import {
  PlatformIcon,
  platforms,
  type Platform,
} from "@/components/atoms/platform-icon"
import { Confidence, SourceChip } from "@/components/atoms/source-chip"

type ChatMessageProps = {
  /** Who sent it. Omit `platform` and set `bot` for Kibo's own replies. */
  author: string
  platform?: Platform
  bot?: boolean
  /** A tag or badge after the name, such as <MessageTag>Question</MessageTag>. */
  tag?: React.ReactNode
  time?: string
  /** Renders the message body as a caption, for "Message deleted" notes. */
  note?: boolean
  source?: string
  confidence?: number
  tone?: "default" | "flagged"
  className?: string
  children: React.ReactNode
}

/** One line of live chat, including Kibo's replies with their source. */
export function ChatMessage({
  author,
  platform,
  bot = false,
  tag,
  time,
  note = false,
  source,
  confidence,
  tone = "default",
  className,
  children,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-md px-2.5 py-2",
        bot && "bg-surface",
        tone === "flagged" && "bg-destructive-subtle",
        className
      )}
    >
      {bot ? (
        <Monogram initials={author.charAt(0)} bot size="sm" />
      ) : platform ? (
        <PlatformIcon platform={platform} label={platforms[platform]} />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-1.5 text-caption">
          <span className="font-semibold">{author}</span>
          {tag}
          {time ? (
            <span className="text-xs text-muted-foreground tabular">
              {time}
            </span>
          ) : null}
        </div>
        <div className={cn(note ? "text-caption" : "text-body-sm")}>
          {children}
        </div>
        {source ? (
          <div className="flex flex-wrap items-center gap-2">
            <SourceChip>{source}</SourceChip>
            {confidence !== undefined ? (
              <Confidence value={confidence} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

/** A vertical stack of chat messages. */
export function ChatFeed({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-0.5", className)} {...props} />
}
