import { cn } from "@kibo/ui/lib/utils"

import { Meter } from "@/components/atoms/meter"

/** The knowledge item a bot reply came from. */
export function SourceChip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[22px] items-center gap-1 rounded-sm bg-sunken px-1.5 text-xs font-medium whitespace-nowrap text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

/** How sure Kibo was of a reply, as a bar and a percentage. */
export function Confidence({
  value,
  suffix,
}: {
  value: number
  suffix?: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground tabular">
      <Meter value={value} className="h-1 w-10" />
      {value}%{suffix ? ` ${suffix}` : null}
    </span>
  )
}
