import { cn } from "@kibo/ui/lib/utils"

const valueSizes = {
  sm: "text-[1.25rem]",
  md: "text-[1.75rem]",
  lg: "text-[2.25rem]",
  /** Marketing proof rows only. */
  xl: "text-[3rem]",
}

const changeTones = {
  positive: "text-success-text",
  negative: "text-destructive-text",
  neutral: "text-muted-foreground",
}

/** A small line chart of recent values, next to a Stat. */
function Sparkline({ values, label }: { values: number[]; label: string }) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * 100
    const y = 44 - ((value - min) / range) * 40
    return `${x},${y}`
  })

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className="h-12 w-full overflow-visible"
    >
      <polygon
        points={`0,48 ${points.join(" ")} 100,48`}
        className="fill-primary-subtle"
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        vectorEffect="non-scaling-stroke"
        className="stroke-primary stroke-2"
      />
    </svg>
  )
}

/**
 * A number, what it counts and how it moved. Change is a sign and words,
 * never color alone; `tone` says whether the move is good (“−12 messages
 * held” can be positive). No count-up animation.
 */
export function Stat({
  label,
  value,
  size = "md",
  labelFirst = true,
  change,
  sparkline,
  state,
  emptyReason,
  valueClassName,
  className,
}: {
  label: React.ReactNode
  /** `null` shows an em dash with `emptyReason`. */
  value: React.ReactNode | null
  size?: keyof typeof valueSizes
  labelFirst?: boolean
  change?: { text: string; tone: keyof typeof changeTones }
  sparkline?: { values: number[]; label: string }
  state?: "loading" | "error"
  emptyReason?: string
  valueClassName?: string
  className?: string
}) {
  const labelNode = (
    <span className="text-caption text-muted-foreground">{label}</span>
  )

  let valueNode: React.ReactNode
  if (state === "loading") {
    valueNode = (
      <span
        aria-hidden="true"
        className="block h-7 w-20 rounded-sm bg-sunken animate-skeleton"
      />
    )
  } else if (state === "error") {
    valueNode = (
      <span className="text-caption text-destructive-text">
        Couldn’t load this number.
      </span>
    )
  } else {
    valueNode = (
      <span
        className={cn(
          "leading-[1.15] font-semibold tracking-[-0.01em] tabular",
          valueSizes[size],
          value === null && "text-muted-foreground",
          valueClassName
        )}
      >
        {value ?? "—"}
      </span>
    )
  }

  return (
    <div
      aria-busy={state === "loading" || undefined}
      className={cn("flex min-w-0 flex-col gap-1", className)}
    >
      {labelFirst ? labelNode : null}
      {valueNode}
      {labelFirst ? null : labelNode}
      {value === null && emptyReason ? (
        <span className="text-caption text-muted-foreground">
          {emptyReason}
        </span>
      ) : null}
      {change && !state ? (
        <span
          className={cn("text-caption font-medium", changeTones[change.tone])}
        >
          {change.text}
        </span>
      ) : null}
      {sparkline && !state ? (
        <Sparkline values={sparkline.values} label={sparkline.label} />
      ) : null}
    </div>
  )
}
