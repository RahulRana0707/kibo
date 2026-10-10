import { cn } from "@kibo/ui/lib/utils"

/** A row in a divided list: leading content, a growing middle and trailing meta. */
export function ListRow({
  leading,
  trailing,
  inset = false,
  align = "center",
  className,
  children,
}: {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  inset?: boolean
  align?: "center" | "start"
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "flex gap-3 border-b border-separator py-3 last:border-b-0",
        align === "start" ? "items-start" : "items-center",
        inset && "px-6",
        className
      )}
    >
      {leading}
      <div className="min-w-0 flex-1">{children}</div>
      {trailing}
    </div>
  )
}
