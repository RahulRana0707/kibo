import { cn } from "@kibo/ui/lib/utils"

const valueSizes = {
  sm: "text-[1.25rem]",
  md: "text-[1.75rem]",
  lg: "text-[3rem]",
}

/** One number with its label, such as "Time saved 2h 40m". */
export function Stat({
  label,
  value,
  size = "md",
  labelFirst = true,
  valueClassName,
  className,
}: {
  label: React.ReactNode
  value: React.ReactNode
  size?: keyof typeof valueSizes
  labelFirst?: boolean
  valueClassName?: string
  className?: string
}) {
  const labelNode = (
    <span className="text-caption text-muted-foreground">{label}</span>
  )

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      {labelFirst ? labelNode : null}
      <span
        className={cn(
          "leading-[1.15] font-semibold tracking-[-0.01em] tabular",
          valueSizes[size],
          valueClassName
        )}
      >
        {value}
      </span>
      {labelFirst ? null : labelNode}
    </div>
  )
}
