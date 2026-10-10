import { cn } from "@kibo/ui/lib/utils"

const tones = {
  accent: "bg-primary",
  warning: "bg-warning",
  danger: "bg-destructive",
  success: "bg-success",
}

export function Meter({
  value,
  tone = "accent",
  className,
}: {
  value: number
  tone?: keyof typeof tones
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block h-1.5 overflow-hidden rounded-full bg-sunken",
        className
      )}
    >
      <span
        className={cn("block h-full rounded-full", tones[tone])}
        style={{ width: `${value}%` }}
      />
    </span>
  )
}
