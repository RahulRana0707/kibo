import { CheckIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

const tones = {
  accent: "bg-primary-subtle text-link",
  neutral: "bg-sunken text-foreground",
  success: "bg-success-subtle text-success-text",
  warning: "bg-warning-subtle text-warning-text",
  danger: "bg-destructive-subtle text-destructive-text",
}

const sizes = {
  sm: "size-8 rounded-md [&_svg]:size-4",
  md: "size-10 rounded-lg [&_svg]:size-5",
  lg: "size-14 rounded-lg [&_svg]:size-6",
}

const stepTones = {
  upcoming: "neutral",
  current: "accent",
  done: "success",
} as const

/**
 * A tinted square holding an icon or a step number: feature lists,
 * notification types, setup steps. Decorative; the title beside it
 * carries the meaning. A done step shows a check.
 */
export function IconTile({
  tone = "accent",
  size = "md",
  step,
  className,
  children,
}: {
  tone?: keyof typeof tones
  size?: keyof typeof sizes
  /** A numbered step and its state; replaces `tone`. */
  step?: { number: number; state: keyof typeof stepTones }
  className?: string
  children?: React.ReactNode
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center text-body-sm font-semibold tabular [&_svg]:stroke-[1.5]",
        tones[step ? stepTones[step.state] : tone],
        sizes[size],
        className
      )}
    >
      {step ? (
        step.state === "done" ? (
          <CheckIcon className="stroke-2!" />
        ) : (
          step.number
        )
      ) : (
        children
      )}
    </span>
  )
}
