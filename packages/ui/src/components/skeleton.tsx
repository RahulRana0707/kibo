import { cn } from "@kibo/ui/lib/utils"

const block = "rounded-sm bg-sunken animate-skeleton"

/**
 * First load only, mirroring the real layout so nothing jumps. Refreshes
 * keep the old data and show a spinner instead. Hidden from screen
 * readers: mark the loading region aria-busy with a status line.
 */
function Skeleton({
  variant = "block",
  lines = 3,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "block" | "text" | "avatar-line" | "card" | "row" | "chart"
  /** Number of text lines for `variant="text"`. */
  lines?: number
}) {
  const shared = {
    "aria-hidden": true,
    "data-slot": "skeleton",
    ...props,
  }

  switch (variant) {
    case "text":
      return (
        <div {...shared} className={cn("flex flex-col gap-2", className)}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={cn(block, "h-3", index === lines - 1 && "w-3/5")}
            />
          ))}
        </div>
      )
    case "avatar-line":
      return (
        <div {...shared} className={cn("flex items-center gap-3", className)}>
          <div className={cn(block, "size-8 shrink-0 rounded-full")} />
          <div className="flex flex-1 flex-col gap-2">
            <div className={cn(block, "h-3 w-2/5")} />
            <div className={cn(block, "h-3 w-3/5")} />
          </div>
        </div>
      )
    case "card":
      return (
        <div
          {...shared}
          className={cn(
            "flex flex-col gap-4 rounded-xl bg-raised p-5 shadow-border",
            className
          )}
        >
          <div className={cn(block, "size-10 rounded-lg")} />
          <div className={cn(block, "h-5 w-1/2")} />
          <div className="flex flex-col gap-2">
            <div className={cn(block, "h-3")} />
            <div className={cn(block, "h-3 w-4/5")} />
          </div>
        </div>
      )
    case "row":
      return (
        <div
          {...shared}
          className={cn(
            "flex items-center gap-4 border-b border-separator py-3",
            className
          )}
        >
          <div className={cn(block, "size-8 shrink-0 rounded-full")} />
          <div className={cn(block, "h-3 flex-[2]")} />
          <div className={cn(block, "h-3 flex-1")} />
          <div className={cn(block, "h-3 w-12")} />
        </div>
      )
    case "chart":
      return (
        <div
          {...shared}
          className={cn("flex h-40 items-end gap-2", className)}
        >
          {[45, 70, 35, 85, 60, 75, 50].map((height, index) => (
            <div
              key={index}
              className={cn(block, "flex-1 rounded-t-sm rounded-b-none")}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      )
    default:
      return <div {...shared} className={cn(block, "h-20", className)} />
  }
}

export { Skeleton }
