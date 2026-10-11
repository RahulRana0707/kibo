import { cn } from "@kibo/ui/lib/utils"

/**
 * A main column beside a narrower aside; the aside wraps under the main
 * column when there isn't room for both.
 */
export function MainAside({
  main,
  aside,
  mainClassName,
  className,
}: {
  main: React.ReactNode
  aside?: React.ReactNode
  /** Spacing between the main column's blocks; defaults to gap-6. */
  mainClassName?: string
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-6", className)}>
      <div
        className={cn(
          "flex min-w-0 flex-[999_1_560px] flex-col gap-6",
          mainClassName
        )}
      >
        {main}
      </div>
      {aside ? (
        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
          {aside}
        </aside>
      ) : null}
    </div>
  )
}
