import { cn } from "@kibo/ui/lib/utils"

const tones = {
  neutral: "bg-sunken text-muted-foreground",
  question: "bg-primary-subtle text-link",
  spam: "bg-warning-subtle text-warning-text",
  toxic: "bg-destructive-subtle text-destructive-text",
}

/** The type Kibo gave a chat message: Question, Spam, Toxic and so on. */
export function MessageTag({
  tone = "neutral",
  children,
  className,
}: {
  tone?: keyof typeof tones
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-sm px-1.5 text-[0.6875rem] font-semibold tracking-[0.04em] whitespace-nowrap uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
