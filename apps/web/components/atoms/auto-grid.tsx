import { cn } from "@kibo/ui/lib/utils"

/**
 * Columns that fill the row at no less than `min` wide each, so the grid
 * reflows by content rather than by device breakpoints.
 */
export function AutoGrid({
  min = "240px",
  gap = "default",
  as: Tag = "div",
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  min?: string
  gap?: "default" | "tight"
  as?: "div" | "ul" | "ol"
}) {
  return (
    <Tag
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(min(var(--min),100%),1fr))]",
        gap === "tight" ? "gap-4" : "gap-6",
        className
      )}
      style={{ "--min": min, ...style } as React.CSSProperties}
      {...props}
    />
  )
}
