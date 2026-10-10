import { cn } from "@kibo/ui/lib/utils"

const sizes = {
  sm: "size-6 text-[0.6875rem]",
  md: "size-8 text-xs",
  lg: "size-12 text-body",
}

/** Initials in a circle. The bot variant marks Kibo's own messages. */
export function Monogram({
  initials,
  bot = false,
  size = "md",
  className,
}: {
  initials: string
  bot?: boolean
  size?: keyof typeof sizes
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-grid shrink-0 place-items-center rounded-full font-semibold",
        bot ? "bg-primary-subtle text-link" : "bg-sunken text-muted-foreground",
        sizes[size],
        className
      )}
    >
      {initials}
    </span>
  )
}
