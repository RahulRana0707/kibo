import { cn } from "@kibo/ui/lib/utils"

const fills = {
  accent: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-destructive",
}

type Tone = keyof typeof fills

/** Usage: under 80% accent, 80–99% warning, 100% danger. */
function usageTone(value: number, max: number): Tone {
  const share = value / max
  if (share >= 1) return "danger"
  if (share >= 0.8) return "warning"
  return "accent"
}

/**
 * A known amount: usage, confidence, deliverables. The value is always
 * written too; tone is never the only signal. With `label` it renders the
 * label row and becomes a role="meter".
 */
function Meter({
  value,
  max = 100,
  tone,
  usage = false,
  size = "default",
  label,
  valueText,
  className,
}: {
  value: number
  max?: number
  tone?: Tone
  /** Pick the tone from the usage thresholds. */
  usage?: boolean
  size?: "default" | "thin"
  label?: React.ReactNode
  /** The written value, such as “9,610 / 15,000”. Defaults to a percent. */
  valueText?: string
  className?: string
}) {
  const share = Math.min(1, Math.max(0, value / max))
  const fill = tone ?? (usage ? usageTone(value, max) : "accent")
  const shown = valueText ?? `${Math.round(share * 100)}%`

  const bar = (
    <span
      aria-hidden={label ? undefined : true}
      role={label ? "meter" : undefined}
      aria-valuenow={label ? value : undefined}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? max : undefined}
      aria-valuetext={label ? shown : undefined}
      className={cn(
        "block overflow-hidden rounded-full bg-sunken",
        size === "thin" ? "h-1" : "h-1.5",
        !label && className
      )}
    >
      <span
        className={cn(
          "block h-full rounded-full transition-[width] duration-slow ease-out",
          fills[fill]
        )}
        style={{ width: `${share * 100}%` }}
      />
    </span>
  )

  if (!label) {
    return bar
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-baseline justify-between gap-2 text-body-sm">
        <span>{label}</span>
        <span
          className={cn(
            "font-medium tabular",
            fill === "warning" && "text-warning-text",
            fill === "danger" && "text-destructive-text"
          )}
        >
          {shown}
        </span>
      </div>
      {bar}
    </div>
  )
}

const strengthSteps = {
  weak: { width: "25%", fill: fills.danger, text: "text-destructive-text" },
  fair: { width: "60%", fill: fills.warning, text: "text-warning-text" },
  strong: { width: "100%", fill: fills.success, text: "text-success-text" },
}

/** Password strength as a bar and a word; only the word is announced. */
function StrengthMeter({
  strength,
  className,
}: {
  strength: keyof typeof strengthSteps
  className?: string
}) {
  const step = strengthSteps[strength]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="block h-1.5 flex-1 overflow-hidden rounded-full bg-sunken"
      >
        <span
          className={cn(
            "block h-full rounded-full transition-colors duration-fast",
            step.fill
          )}
          style={{ width: step.width }}
        />
      </span>
      <span
        aria-live="polite"
        className={cn("text-caption font-medium capitalize", step.text)}
      >
        <span className="sr-only">Password strength: </span>
        {strength}
      </span>
    </div>
  )
}

/**
 * Work moving: an import or export. Without `value` it is indeterminate.
 */
function Progress({
  value,
  max = 100,
  label,
  className,
}: {
  value?: number
  max?: number
  /** Accessible name, such as “Importing faq.csv”. */
  label: string
  className?: string
}) {
  const indeterminate = value === undefined

  return (
    <span
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      className={cn(
        "block h-1 overflow-hidden rounded-full bg-sunken",
        className
      )}
    >
      <span
        className={cn(
          "block h-full rounded-full bg-primary",
          indeterminate
            ? "w-2/5 animate-indeterminate"
            : "transition-[width] duration-moderate ease-linear"
        )}
        style={
          indeterminate
            ? undefined
            : { width: `${Math.min(100, ((value ?? 0) / max) * 100)}%` }
        }
      />
    </span>
  )
}

export { Meter, StrengthMeter, Progress, usageTone }
