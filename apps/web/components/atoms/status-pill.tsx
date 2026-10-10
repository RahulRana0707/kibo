import { cn } from "@kibo/ui/lib/utils"

const tones = {
  live: "bg-success-subtle text-success-text",
  ready: "bg-sunken text-muted-foreground",
  paused: "bg-warning-subtle text-warning-text",
  error: "bg-destructive-subtle text-destructive-text",
}

/** A state word with a dot, so the state never rests on color alone. */
export function StatusPill({
  tone,
  children,
  className,
}: {
  tone: keyof typeof tones
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-caption font-medium whitespace-nowrap before:size-2 before:shrink-0 before:rounded-full before:bg-current",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
