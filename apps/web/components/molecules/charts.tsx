"use client"

import { useState } from "react"
import { ChartColumnIcon, CircleAlertIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

/*
 * Small, honest charts for streams and analytics: one accent series, a
 * muted comparison, numbers always available as text. Each chart is an
 * image with a one-sentence summary and a visually hidden data table.
 * Nothing animates on load; tooltips fade in.
 */

type Point = { label: string; value: number }

/** The same data as a hidden table, for screen readers. */
function DataTable({
  caption,
  rows,
}: {
  caption: string
  rows: { label: string; values: (string | number)[] }[]
}) {
  return (
    <table className="sr-only">
      <caption>{caption}</caption>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <th scope="row">{row.label}</th>
            {row.values.map((value, column) => (
              <td key={column}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Evenly spaced labels under a chart: 12px, tabular. */
export function ChartAxis({ labels }: { labels: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="flex justify-between text-xs text-muted-foreground tabular"
    >
      {labels.map((label, index) => (
        <span key={`${label}-${index}`}>{label}</span>
      ))}
    </div>
  )
}

const swatches = {
  accent: "bg-primary",
  second: "bg-primary-border",
  muted: "bg-border-control",
  positive: "bg-success",
  negative: "bg-destructive",
}

export type ChartTone = keyof typeof swatches

/** Names each series. `line` draws a 14×2 stroke instead of a square. */
export function ChartLegend({
  items,
  direction = "row",
}: {
  items: { label: React.ReactNode; tone: ChartTone; line?: boolean }[]
  direction?: "row" | "column"
}) {
  return (
    <div
      className={cn(
        "flex text-caption text-muted-foreground",
        direction === "column" ? "flex-col gap-1.5" : "flex-wrap gap-4"
      )}
    >
      {items.map((item, index) => (
        <span key={index} className="inline-flex items-center">
          <i
            aria-hidden="true"
            className={cn(
              "me-1.5 inline-block",
              item.line ? "h-0.5 w-3.5 rounded-[1px]" : "size-2.5 rounded-[3px]",
              item.line && item.tone === "muted" ? "bg-border-strong" : swatches[item.tone]
            )}
          />
          {item.label}
        </span>
      ))}
    </div>
  )
}

/** The hover or focus tooltip: muted context, a bold value, an optional comparison. */
export function ChartTooltip({
  context,
  value,
  compare,
  className,
  style,
}: {
  context: string
  value: string
  compare?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <span
      role="tooltip"
      style={style}
      className={cn(
        "pointer-events-none z-10 flex flex-col gap-0.5 rounded-md bg-raised px-2.5 py-2 text-caption whitespace-nowrap shadow-raised motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-instant",
        className
      )}
    >
      <span className="text-muted-foreground">{context}</span>
      <b className="font-semibold tabular">{value}</b>
      {compare ? <span className="text-muted-foreground tabular">{compare}</span> : null}
    </span>
  )
}

/** Empty, loading and error stand-ins at the chart's height (180). */
export function ChartState({
  state,
  height = 180,
  onRetry,
}: {
  state: "empty" | "loading" | "error"
  height?: number
  onRetry?: () => void
}) {
  if (state === "loading") {
    return (
      <div aria-busy="true" className="flex items-end gap-1" style={{ height }}>
        {[40, 60, 50, 75, 65, 85].map((value, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="flex-1 rounded-t-[3px] bg-sunken animate-skeleton"
            style={{ height: `${value}%` }}
          />
        ))}
        <span className="sr-only">Loading chart</span>
      </div>
    )
  }

  if (state === "error") {
    return (
      <div
        role="alert"
        className="grid place-items-center rounded-lg bg-destructive-subtle p-4 text-center text-body-sm text-destructive-text"
        style={{ height }}
      >
        <span className="flex flex-col items-center gap-2">
          <CircleAlertIcon aria-hidden="true" className="size-5" />
          Couldn’t load this chart.
          {onRetry ? (
            <Button variant="secondary" size="sm" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </span>
      </div>
    )
  }

  return (
    <div
      className="grid place-items-center rounded-lg bg-sunken p-4 text-center text-body-sm text-muted-foreground"
      style={{ height }}
    >
      <span className="flex flex-col items-center gap-2">
        <ChartColumnIcon aria-hidden="true" className="size-5" />
        <span>
          No streams in this range yet.
          <br />
          Charts fill in after your first stream with Pip.
        </span>
      </span>
    </div>
  )
}

export type Bar = {
  label: string
  /** 0–100, the bar's height. */
  value: number
  /** A comparison bar (“Before Pip”), drawn in the muted tone. */
  muted?: boolean
  /** Tooltip text: context and value. */
  tooltip?: { context: string; value: string }
}

/**
 * Vertical bars: md is 160 tall, sm 48 beside a Stat (no axis, no
 * legend). Muted bars are the comparison. Hovering or focusing a bar with
 * a tooltip highlights it; arrow keys move between bars.
 */
export function BarChart({
  bars,
  size = "md",
  summary,
  defaultHighlight,
}: {
  bars: Bar[]
  size?: "sm" | "md"
  summary: string
  /** A bar to show highlighted with its tooltip, for previews. */
  defaultHighlight?: number
}) {
  const [active, setActive] = useState<number | undefined>(defaultHighlight)
  const interactive = bars.some((bar) => bar.tooltip)
  const current = active !== undefined ? bars[active] : undefined

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={summary}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(event) => {
          if (!interactive) return
          if (event.key === "ArrowRight")
            setActive((index) => Math.min(bars.length - 1, (index ?? -1) + 1))
          if (event.key === "ArrowLeft")
            setActive((index) => Math.max(0, (index ?? bars.length) - 1))
        }}
        onMouseLeave={() => setActive(defaultHighlight)}
        onBlur={() => setActive(defaultHighlight)}
        className={cn(
          "flex items-end rounded-sm",
          size === "sm" ? "h-12 gap-0.5" : "h-40 gap-1"
        )}
      >
        {bars.map((bar, index) => (
          <span
            key={`${bar.label}-${index}`}
            onMouseEnter={() => (bar.tooltip ? setActive(index) : undefined)}
            className={cn(
              "block min-h-0.5 flex-1 rounded-t-[3px]",
              bar.muted ? "bg-border-control" : "bg-primary",
              active === index &&
                "bg-primary-hover outline-2 outline-offset-1 outline-primary-border"
            )}
            style={{ height: `${bar.value}%` }}
          />
        ))}
      </div>
      {current?.tooltip && active !== undefined ? (
        <ChartTooltip
          context={current.tooltip.context}
          value={current.tooltip.value}
          className="absolute top-0"
          style={{
            left: `min(calc(${((active + 1) / bars.length) * 100}% + 8px), calc(100% - 10rem))`,
          }}
        />
      ) : null}
      <DataTable
        caption={summary}
        rows={bars.map((bar) => ({ label: bar.label, values: [bar.value] }))}
      />
    </div>
  )
}

function linePath(values: number[], max: number, width: number) {
  return values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * width
      const y = 180 - (value / max) * 150
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
}

/**
 * A line over time, 180 tall, with an accent-subtle area, a dashed
 * comparison and three grid lines. Hovering or focusing shows a crosshair,
 * a point and the tooltip; arrow keys move between points.
 */
export function LineChart({
  points,
  compare,
  area = true,
  summary,
  formatValue = (value) => String(value),
  compareLabel = "Last stream",
  compareStyle = "dashed",
  defaultHighlight,
}: {
  points: Point[]
  compare?: Point[]
  area?: boolean
  summary: string
  /** “142 msgs/min”. */
  formatValue?: (value: number) => string
  compareLabel?: string
  /** Solid when the comparison is another measure, not a past period. */
  compareStyle?: "dashed" | "solid"
  defaultHighlight?: number
}) {
  const [active, setActive] = useState<number | undefined>(defaultHighlight)
  const width = 300
  const max = Math.max(
    ...points.map((point) => point.value),
    ...(compare ?? []).map((point) => point.value),
    1
  )
  const line = linePath(points.map((point) => point.value), max, width)
  const x = (index: number) => (index / Math.max(1, points.length - 1)) * width
  const y = (value: number) => 180 - (value / max) * 150
  const current = active !== undefined ? points[active] : undefined

  return (
    <div className="relative">
      <svg
        role="img"
        aria-label={summary}
        tabIndex={0}
        viewBox={`0 0 ${width} 180`}
        preserveAspectRatio="none"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            setActive((index) => Math.min(points.length - 1, (index ?? -1) + 1))
          if (event.key === "ArrowLeft")
            setActive((index) => Math.max(0, (index ?? points.length) - 1))
        }}
        onMouseMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          const share = (event.clientX - box.left) / box.width
          setActive(Math.round(share * (points.length - 1)))
        }}
        onMouseLeave={() => setActive(defaultHighlight)}
        onBlur={() => setActive(defaultHighlight)}
        className="block h-45 w-full overflow-visible rounded-sm"
      >
        <g>
          {[45, 90, 135].map((lineY) => (
            <line
              key={lineY}
              x1="0"
              x2={width}
              y1={lineY}
              y2={lineY}
              className="stroke-separator"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
        {area ? (
          <path d={`${line} L${width} 180 L0 180 Z`} className="fill-primary-subtle" />
        ) : null}
        {compare ? (
          <path
            d={linePath(compare.map((point) => point.value), max, width)}
            fill="none"
            className={compareStyle === "solid" ? "stroke-border-control" : "stroke-border-strong"}
            strokeWidth="2"
            strokeDasharray={compareStyle === "solid" ? undefined : "4 4"}
            vectorEffect="non-scaling-stroke"
          />
        ) : null}
        <path
          d={line}
          fill="none"
          className="stroke-primary"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {current && active !== undefined ? (
          <>
            <line
              x1={x(active)}
              x2={x(active)}
              y1="0"
              y2="180"
              className="stroke-border-strong"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>
      {current && active !== undefined ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute size-2.5 -translate-1/2 rounded-full border-2 border-primary bg-raised"
          style={{
            left: `${(active / Math.max(1, points.length - 1)) * 100}%`,
            top: `${(y(current.value) / 180) * 100}%`,
          }}
        />
      ) : null}
      {current && active !== undefined ? (
        <ChartTooltip
          context={current.label}
          value={formatValue(current.value)}
          compare={
            compare?.[active]
              ? `${compareLabel} ${compare[active].value}`
              : undefined
          }
          className="absolute"
          style={{
            top: `calc(${(y(current.value) / 180) * 100}% + 12px)`,
            left: `min(calc(${(active / Math.max(1, points.length - 1)) * 100}% + 12px), calc(100% - 11rem))`,
          }}
        />
      ) : null}
      <DataTable
        caption={summary}
        rows={points.map((point, index) => ({
          label: point.label,
          values: compare?.[index] ? [point.value, compare[index].value] : [point.value],
        }))}
      />
    </div>
  )
}

/** A 48-tall trend line next to a Stat: no area, no axis, no legend. */
export function Sparkline({
  values,
  summary,
}: {
  values: number[]
  summary: string
}) {
  const max = Math.max(...values, 1)
  const min = Math.min(...values)
  const range = max - min || 1
  const d = values
    .map((value, index) => {
      const x = (index / Math.max(1, values.length - 1)) * 100
      const y = 44 - ((value - min) / range) * 40
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <svg
      role="img"
      aria-label={summary}
      viewBox="0 0 100 48"
      preserveAspectRatio="none"
      className="block h-12 w-full"
    >
      <path
        d={d}
        fill="none"
        className="stroke-primary"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

const moodTones = {
  positive: "bg-success",
  neutral: "bg-border-control",
  toxic: "bg-destructive",
}

/**
 * Chat mood as one stacked bar (24 tall): positive, neutral and toxic,
 * always with the percentages in the legend.
 */
export function MoodChart({
  positive,
  neutral,
  toxic,
}: {
  positive: number
  neutral: number
  toxic: number
}) {
  const parts = [
    { key: "positive", label: "Positive", value: positive },
    { key: "neutral", label: "Neutral", value: neutral },
    { key: "toxic", label: "Toxic", value: toxic },
  ] as const

  return (
    <div className="flex flex-col gap-3">
      <div
        role="img"
        aria-label={`Chat mood: ${positive}% positive, ${neutral}% neutral, ${toxic}% toxic`}
        className="flex h-6 gap-0.5 overflow-hidden rounded-sm"
      >
        {parts.map((part) => (
          <span
            key={part.key}
            className={cn("block", moodTones[part.key])}
            style={{ width: `${part.value}%` }}
          />
        ))}
      </div>
      <ChartLegend
        items={[
          { label: `Positive ${positive}%`, tone: "positive" },
          { label: `Neutral ${neutral}%`, tone: "muted" },
          { label: `Toxic ${toxic}%`, tone: "negative" },
        ]}
      />
    </div>
  )
}

const donutStrokes = {
  accent: "stroke-primary",
  second: "stroke-primary-border",
  muted: "stroke-border-control",
}

/**
 * Parts of a whole: 120 wide, a 14px ring with a 2px gap between parts,
 * and the legend with percentages beside it.
 */
export function DonutChart({
  segments,
  summary,
}: {
  segments: { label: string; value: number; tone: keyof typeof donutStrokes }[]
  summary: string
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const gap = 2
  const starts = segments.map((_, index) =>
    segments
      .slice(0, index)
      .reduce((sum, segment) => sum + (segment.value / total) * circumference, 0)
  )

  return (
    <div className="flex flex-wrap items-center gap-6">
      <svg
        role="img"
        aria-label={summary}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="-rotate-90"
      >
        <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="14" className="stroke-sunken" />
        {segments.map((segment, index) => {
          const length = (segment.value / total) * circumference
          return (
            <circle
              key={segment.label}
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="14"
              className={donutStrokes[segment.tone]}
              strokeDasharray={`${Math.max(0, length - gap)} ${circumference}`}
              strokeDashoffset={-starts[index]!}
            />
          )
        })}
      </svg>
      <ChartLegend
        direction="column"
        items={segments.map((segment) => ({
          label: `${segment.label} ${Math.round((segment.value / total) * 100)}%`,
          tone: segment.tone,
        }))}
      />
    </div>
  )
}

const heatSteps = ["bg-sunken", "bg-primary/25", "bg-primary/45", "bg-primary/70", "bg-primary"]

/**
 * Best times to stream: days down the side, hours along the top, the
 * accent in four steps (25, 45, 70, 100%) and sunken for none.
 */
export function Heatmap({
  rows,
  columns,
  values,
  summary,
}: {
  rows: string[]
  /** Hour labels; every other one is printed. */
  columns: string[]
  /** values[row][column] as a step from 0 (none) to 4 (busiest). */
  values: (0 | 1 | 2 | 3 | 4)[][]
  summary: string
}) {
  return (
    <figure className="m-0 flex flex-col gap-3">
      <div
        role="img"
        aria-label={summary}
        className="grid items-center gap-[3px] text-[0.6875rem] text-muted-foreground"
        style={{ gridTemplateColumns: `36px repeat(${columns.length}, minmax(0, 1fr))` }}
      >
        <span />
        {columns.map((column, index) => (
          <span key={column}>{index % 2 === 0 ? column : ""}</span>
        ))}
        {rows.map((row, rowIndex) => (
          <div key={row} className="contents">
            <span>{row}</span>
            {columns.map((column, columnIndex) => (
              <i
                key={column}
                className={cn(
                  "block h-5 rounded-[3px]",
                  heatSteps[values[rowIndex]?.[columnIndex] ?? 0]
                )}
              />
            ))}
          </div>
        ))}
      </div>
      <figcaption className="flex items-center justify-between text-caption text-muted-foreground">
        <span>Fewer chatters</span>
        <span aria-hidden="true" className="flex gap-1">
          <i className="block h-2.5 w-3.5 rounded-[2px] bg-primary/25" />
          <i className="block h-2.5 w-3.5 rounded-[2px] bg-primary" />
        </span>
        <span>More</span>
      </figcaption>
    </figure>
  )
}
