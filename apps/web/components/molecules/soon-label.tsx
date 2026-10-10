import { cn } from "@kibo/ui/lib/utils"

/** Marks a menu item or control whose feature hasn't shipped yet. */
export function SoonLabel({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ms-auto text-xs font-semibold text-muted-foreground",
        className
      )}
    >
      Soon
    </span>
  )
}
