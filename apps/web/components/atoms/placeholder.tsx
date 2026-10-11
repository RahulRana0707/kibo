import { cn } from "@kibo/ui/lib/utils"

/** A labelled stand-in for an image or screenshot that isn't made yet. */
export function Placeholder({
  label,
  ratio = "16/9",
  className,
}: {
  label: string
  ratio?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "grid place-items-center rounded-lg bg-sunken p-4 text-center text-caption text-muted-foreground",
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      {label}
    </div>
  )
}
