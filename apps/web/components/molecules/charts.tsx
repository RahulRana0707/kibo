import { ChartColumnIcon, CircleAlertIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Skeleton } from "@kibo/ui/components/skeleton"
import { cn } from "@kibo/ui/lib/utils"

/*
 * Small, honest charts for streams and analytics: one accent series, a
 * muted comparison, numbers always available as text. Each chart is an
 * image with a one-sentence summary and a visually hidden table.
 */

type Point = { label: string; value: number }

/** The same data as a hidden table, for screen readers. */
function DataTable({
  caption,
  points,
  compare,
}: {
  caption: string
  points: Point[]
  compare?: Point[]
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <tbody>
        {points.map((point, index) => (
          <tr key={point.label}>
            <th scope="row">{point.label}</th>
            <td>{point.value}</td>
            {compare ? <td>{compare[index]?.value}</td> : null}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Evenly spaced axis labels under a chart. */
export function ChartAxis({ labels }: { labels: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="flex justify-between text-xs text-muted-foreground tabular"
    >
      {labels.map((label) => (
        <span key={label}>{label}</span>
      ))}
    </div>
  )
}

/** Swatches naming each series. */
export function ChartLegend({
  items,
}: {
  items: { label: string; tone: "accent" | "muted" | "dashed" }[]
}) {
  return (
    <div className="flex flex-wrap gap-4 text-caption text-muted-foreground">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cn(
              "inline-block",
              item.tone === "dashed"
                ? "h-0 w-3 border-t-2 border-dashed border-border-strong"
                : "size-2.5 rounded-[3px]",
              item.tone === "accent" && "bg-primary",
              item.tone === "muted" && "bg-border-control"
            )}
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

/** The hover or focus tooltip for one point. */
export function ChartTooltip({
  label,
  value,
  compare,
  className,
}: {
  label: string
  value: string
  compare?: string
  className?: string
}) {
  return (
    <span
      role="tooltip"
      className={cn(
        "pointer-events-none flex flex-col gap-0.5 rounded-md bg-raised px-2.5 py-1.5 text-caption whitespace-nowrap shadow-raised",
        className
      )}
    >
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold tabular">{value}</span>
      {compare ? (
        <span className="text-muted-foreground tabular">{compare}</span>
      ) : null}
    </span>
  )
}

/** Empty, loading and error stand-ins at the chart's height. */
export function ChartState({
  state,
  height = 160,
  onRetry,
}: {
  state: "empty" | "loading" | "error"
  height?: number
  onRetry?: () => void
}) {
  if (state === "loading") {
    return (
      <div aria-busy="true" style={{ height }}>
        <Skeleton variant="chart" className="h-full" />
        <span className="sr-only">Loading chart</span>
      </div>
    )
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-2 rounded-lg bg-sunken p-4 text-center text-caption text-muted-foreground"
      style={{ height }}
    >
      {state === "empty" ? (
        <>
          <ChartColumnIcon aria-hidden="true" className="size-5" />
          <p>Numbers show up after your first stream.</p>
        </>
      ) : (
        <>
          <CircleAlertIcon aria-hidden="true" className="size-5 text-destructive-text" />
          <p>Couldn’t load this chart.</p>
          {onRetry ? (
            <Button variant="secondary" size="xs" onClick={onRetry}>
              Try again
            </Button>
          ) : null}
        </>
      )}
    </div>
  )
}

/** Vertical bars from 0 to 100: md 160 tall, sm 48 beside a Stat. */
export function BarChart({
  values,
  size = "md",
  compare,
  summary,
}: {
  values: number[]
  size?: "sm" | "md"
  /** A muted comparison series, drawn behind. */
  compare?: number[]
  /** One sentence for screen readers; decorative without it. */
  summary?: string
}) {
  return (
    <div
      role={summary ? "img" : undefined}
      aria-label={summary}
      aria-hidden={summary ? undefined : true}
      className={cn(
        "flex items-end",
        size === "sm" ? "h-12 gap-0.5" : "h-40 gap-1"
      )}
    >
      {values.map((value, index) => (
        <span key={index} className="relative flex h-full flex-1 items-end">
          {compare ? (
            <span
              className="absolute inset-x-0 bottom-0 rounded-t-[3px] bg-border-control"
              style={{ height: `${compare[index] ?? 0}%` }}
            />
          ) : null}
          <span
            className={cn(
              "relative min-h-0.5 w-full rounded-t-[3px] bg-primary",
              compare && "mx-[18%] w-auto flex-1"
            )}
            style={{ height: `${value}%` }}
          />
        </span>
      ))}
    </div>
  )
}

function linePath(values: number[], max: number) {
  return values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 1000
      const y = 176 - (value / max) * 168
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
}

/**
 * A line over time (180 tall) with an optional area fill and a dashed
 * comparison line.
 */
export function LineChart({
  points,
  compare,
  area = true,
  summary,
}: {
  points: Point[]
  compare?: Point[]
  area?: boolean
  summary: string
}) {
  const max = Math.max(...points.map((p) => p.value), ...(compare ?? []).map((p) => p.value), 1)
  const line = linePath(points.map((p) => p.value), max)

  return (
    <figure className="m-0 flex flex-col gap-2">
      <svg
        role="img"
        aria-label={summary}
        viewBox="0 0 1000 180"
        preserveAspectRatio="none"
        className="block h-45 w-full overflow-visible"
      >
        {[45, 90, 135].map((y) => (
          <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke="var(--vi-separator)" vectorEffect="non-scaling-stroke" />
        ))}
        {area ? (
          <path d={`${line} L1000 180 L0 180 Z`} fill="var(--vi-accent-subtle)" />
        ) : null}
        {compare ? (
          <path
            d={linePath(compare.map((p) => p.value), max)}
            fill="none"
            stroke="var(--vi-border-strong)"
            strokeWidth="2"
            strokeDasharray="6 4"
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <path
          d={line}
          fill="none"
          stroke="var(--vi-accent-solid)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <ChartAxis labels={points.map((p) => p.label)} />
      <DataTable caption={summary} points={points} compare={compare} />
    </figure>
  )
}

/** A 48px trend line next to a Stat; no axis, no legend. */
export function Sparkline({ values, summary }: { values: number[]; summary: string }) {
  const max = Math.max(...values, 1)
  const line = linePath(values, max)
  return (
    <svg
      role="img"
      aria-label={summary}
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      className="block h-12 w-full overflow-visible"
    >
      <path d={`${line} L1000 180 L0 180 Z`} fill="var(--vi-accent-subtle)" />
      <path d={line} fill="none" stroke="var(--vi-accent-solid)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

/** Parts of a whole, 120 wide with a 14px ring, always with % labels. */
export function DonutChart({
  segments,
  summary,
}: {
  segments: { label: string; value: number; tone: "accent" | "muted" | "positive" | "negative" }[]
  summary: string
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  const radius = 53
  const circumference = 2 * Math.PI * radius
  const colors = {
    accent: "var(--vi-accent-solid)",
    muted: "var(--vi-border)",
    positive: "var(--vi-success-solid)",
    negative: "var(--vi-danger-solid)",
  }
  // Each segment starts where the previous ones end.
  const starts = segments.map((_, index) =>
    segments
      .slice(0, index)
      .reduce((sum, segment) => sum + (segment.value / total) * circumference, 0)
  )

  return (
    <figure className="m-0 flex flex-wrap items-center gap-5">
      <svg role="img" aria-label={summary} viewBox="0 0 120 120" className="size-30 -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--vi-bg-sunken)" strokeWidth="14" />
        {segments.map((segment, index) => {
          const length = (segment.value / total) * circumference
          return (
            <circle
              key={segment.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={colors[segment.tone]}
              strokeWidth="14"
              strokeDasharray={`${length} ${circumference - length}`}
              strokeDashoffset={-starts[index]!}
            />
          )
        })}
      </svg>
      <ul className="flex flex-col gap-1.5 text-caption">
        {segments.map((segment) => (
          <li key={segment.label} className="flex items-center gap-2">
            <span aria-hidden="true" className="size-2.5 rounded-[3px]" style={{ background: colors[segment.tone] }} />
            {segment.label}
            <span className="font-semibold tabular">
              {Math.round((segment.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </figure>
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

/**
 * Best times to stream: rows by day, columns by hour, shaded in four steps
 * of the accent. Zero is sunken.
 */
export function Heatmap({
  rows,
  columns,
  values,
  summary,
}: {
  rows: string[]
  columns: string[]
  /** values[row][column], 0–1. */
  values: number[][]
  summary: string
}) {
  const shade = (value: number) =>
    value <= 0
      ? "var(--vi-bg-sunken)"
      : `color-mix(in oklab, var(--vi-accent-solid) ${value < 0.3 ? 25 : value < 0.55 ? 45 : value < 0.8 ? 70 : 100}%, transparent)`

  return (
    <figure role="img" aria-label={summary} className="m-0 flex flex-col gap-1 overflow-x-auto">
      {rows.map((row, rowIndex) => (
        <div key={row} className="flex items-center gap-1">
          <span className="w-10 shrink-0 text-xs text-muted-foreground">{row}</span>
          {columns.map((column, columnIndex) => (
            <span
              key={column}
              className="size-5 shrink-0 rounded-[3px]"
              style={{ background: shade(values[rowIndex]?.[columnIndex] ?? 0) }}
            />
          ))}
        </div>
      ))}
      <div aria-hidden="true" className="flex gap-1 ps-11 text-[0.6875rem] text-muted-foreground">
        {columns.map((column, index) => (
          <span key={column} className="w-5 shrink-0 text-center">
            {index % 3 === 0 ? column : ""}
          </span>
        ))}
      </div>
    </figure>
  )
}
