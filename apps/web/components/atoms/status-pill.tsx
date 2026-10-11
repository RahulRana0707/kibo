import { cn } from "@kibo/ui/lib/utils"

const tones = {
  live: { className: "bg-success-subtle text-success-text", word: "Live" },
  offline: { className: "bg-sunken text-muted-foreground", word: "Offline" },
  paused: { className: "bg-warning-subtle text-warning-text", word: "Paused" },
  error: {
    className: "bg-destructive-subtle text-destructive-text",
    word: "Error",
  },
  connecting: {
    className: "bg-primary-subtle text-link before:bg-transparent before:ring-[1.5px] before:ring-current before:ring-inset",
    word: "Connecting",
  },
  reconnect: {
    className: "bg-warning-subtle text-warning-text",
    word: "Needs reconnect",
  },
  draft: {
    className: "bg-sunken text-muted-foreground before:bg-transparent before:ring-[1.5px] before:ring-current before:ring-inset",
    word: "Draft",
  },
}

export type StatusTone = keyof typeof tones

/**
 * The one look for bot, stream and integration state: a dot and a word,
 * never color alone. Pass `children` to use another word with the same
 * look (“Ready”, “Importing”, “Archived”). Live does not pulse.
 */
export function StatusPill({
  tone,
  size = "default",
  className,
  children,
}: {
  tone: StatusTone
  size?: "default" | "sm"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium whitespace-nowrap before:shrink-0 before:rounded-full before:bg-current",
        size === "sm"
          ? "h-5.5 gap-1.25 px-2 text-xs before:size-1.5"
          : "h-7 gap-1.5 px-2.5 text-caption before:size-2",
        tones[tone].className,
        className
      )}
    >
      {children ?? tones[tone].word}
    </span>
  )
}
