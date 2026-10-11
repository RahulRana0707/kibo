import { cn } from "@kibo/ui/lib/utils"

const tones = {
  neutral: "bg-sunken text-muted-foreground",
  question: "bg-primary-subtle text-link",
  spam: "bg-warning-subtle text-warning-text",
  toxic: "bg-destructive-subtle text-destructive-text",
  positive: "bg-success-subtle text-success-text",
}

/** What Pip detected in a message: the word, and the tone that groups it. */
const kinds = {
  question: { tone: "question", word: "Question" },
  command: { tone: "neutral", word: "Command" },
  chatter: { tone: "neutral", word: "Chatter" },
  "first-time": { tone: "positive", word: "First time" },
  sponsor: { tone: "question", word: "Sponsor" },
  link: { tone: "spam", word: "Link" },
  caps: { tone: "spam", word: "Caps" },
  "emote-flood": { tone: "spam", word: "Emote flood" },
  repeat: { tone: "spam", word: "Repeat" },
  spam: { tone: "spam", word: "Spam" },
  "self-promo": { tone: "spam", word: "Self-promo" },
  spoiler: { tone: "spam", word: "Spoiler" },
  toxic: { tone: "toxic", word: "Toxic" },
  "banned-word": { tone: "toxic", word: "Banned word" },
} satisfies Record<string, { tone: keyof typeof tones; word: string }>

export type MessageKind = keyof typeof kinds
export type MessageTone = keyof typeof tones

/**
 * Labels a chat message: `kind` sets the word and its tone. Pass `tone`
 * and `children` for a one-off tag (“Backseat”). Uppercase in CSS only.
 */
export function MessageTag({
  kind,
  tone,
  children,
  className,
}: {
  kind?: MessageKind
  tone?: MessageTone
  children?: React.ReactNode
  className?: string
}) {
  const preset = kind ? kinds[kind] : undefined

  return (
    <span
      className={cn(
        "inline-flex h-5 items-center rounded-sm px-1.5 text-[0.6875rem] font-semibold tracking-[0.04em] whitespace-nowrap uppercase",
        tones[tone ?? preset?.tone ?? "neutral"],
        className
      )}
    >
      {children ?? preset?.word}
    </span>
  )
}
