import { cn } from "@kibo/ui/lib/utils"

/**
 * Marks something that will exist but doesn't yet. Never alone: it sits on
 * a control that is aria-disabled and whose reason is written nearby.
 */
function SoonLabel({
  when,
  className,
  ...props
}: React.ComponentProps<"span"> & {
  /** A committed month, such as “Nov”. Leave out unless it’s certain. */
  when?: string
}) {
  return (
    <span
      data-slot="soon-label"
      className={cn(
        "inline-flex h-5 shrink-0 items-center rounded-full bg-sunken px-1.5 text-[0.6875rem] leading-none font-semibold tracking-[0.04em] text-muted-foreground uppercase",
        className
      )}
      {...props}
    >
      {when ? `Soon · ${when}` : "Soon"}
    </span>
  )
}

export { SoonLabel }
