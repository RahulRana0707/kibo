import { cn } from "@kibo/ui/lib/utils"

const variants = {
  /** A raised card surface with a hairline shadow. */
  panel:
    "flex min-w-0 flex-col gap-4 rounded-xl border border-transparent bg-raised p-6 shadow-border max-sm:p-4",
  /** A flat tinted block on the page. */
  surface: "flex min-w-0 flex-col gap-3 rounded-xl bg-surface p-6",
  /** A recessed block inside a panel. */
  well: "flex min-w-0 flex-col gap-2 rounded-lg bg-sunken p-4",
  /** A floating surface, such as the hero demo. */
  raised:
    "flex min-w-0 flex-col rounded-xl border border-transparent bg-raised shadow-raised",
}

export function Panel({
  variant = "panel",
  className,
  ...props
}: React.ComponentProps<"div"> & { variant?: keyof typeof variants }) {
  return <div className={cn(variants[variant], className)} {...props} />
}
