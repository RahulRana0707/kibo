import { cn } from "@kibo/ui/lib/utils"

/** Evenly spaced axis labels under a chart. */
export function ChartAxis({ labels }: { labels: string[] }) {
  return (
    <div className="flex justify-between text-xs text-muted-foreground tabular">
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}

/** Swatches naming each series in a chart. */
export function ChartLegend({
  items,
}: {
  items: { label: string; tone: "accent" | "muted" }[]
}) {
  return (
    <div className="flex flex-wrap gap-4 text-caption text-muted-foreground">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn(
              "inline-block size-2.5 rounded-[3px]",
              item.tone === "accent" ? "bg-primary" : "bg-border-control"
            )}
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

/** Vertical bars from 0 to 100. Decorative: pair it with a summary in text. */
export function BarChart({
  values,
  size = "md",
}: {
  values: number[]
  size?: "sm" | "md"
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex items-end",
        size === "sm" ? "h-12 gap-0.5" : "h-40 gap-1"
      )}
    >
      {values.map((value, index) => (
        <span
          key={index}
          className="min-h-0.5 flex-1 rounded-t-[3px] bg-primary"
          style={{ height: `${value}%` }}
        />
      ))}
    </div>
  )
}

/** The chat mood and activity lines from a stream summary. */
export function MoodChart({ label }: { label: string }) {
  return (
    <svg
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      role="img"
      aria-label={label}
      className="block h-45 w-full overflow-visible"
    >
      <path
        d="M0 150 L80 140 L160 130 L240 135 L320 110 L400 115 L480 90 L560 95 L640 70 L720 30 L800 60 L880 75 L1000 85"
        fill="none"
        stroke="var(--vi-border)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M0 120 L80 112 L160 100 L240 104 L320 90 L400 80 L480 76 L560 70 L640 52 L720 20 L800 40 L880 46 L1000 50"
        fill="none"
        stroke="var(--vi-accent-solid)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
