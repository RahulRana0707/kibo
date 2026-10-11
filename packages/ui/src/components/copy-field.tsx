"use client"

import * as React from "react"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"
import { CopyButton } from "@kibo/ui/components/code-block"

/** “•” for all but the last four characters. */
function mask(value: string) {
  return "•".repeat(Math.max(0, Math.min(value.length - 4, 24))) + value.slice(-4)
}

/**
 * A read-only value people copy elsewhere: share links, overlay URLs, API
 * keys. Secrets stay masked until revealed and re-mask after 30 seconds;
 * Copy always copies the full value.
 */
function CopyField({
  value,
  label,
  secret = false,
  disabledReason,
  id,
  className,
}: {
  value: string
  /** The visible label, also naming the Copy button. */
  label: string
  secret?: boolean
  disabledReason?: string
  id?: string
  className?: string
}) {
  const fallbackId = React.useId()
  const inputId = id ?? fallbackId
  const [revealed, setRevealed] = React.useState(false)

  React.useEffect(() => {
    if (!revealed) return
    const timer = window.setTimeout(() => setRevealed(false), 30_000)
    return () => window.clearTimeout(timer)
  }, [revealed])

  const shown = secret && !revealed ? mask(value) : value

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={inputId} className="text-body-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-1 rounded-md border border-border-control bg-page pe-1 max-sm:flex-col max-sm:items-stretch max-sm:gap-2 max-sm:border-0 max-sm:bg-transparent max-sm:pe-0">
        <input
          id={inputId}
          readOnly
          value={disabledReason ? "" : shown}
          disabled={Boolean(disabledReason)}
          aria-label={
            secret && !revealed
              ? `${label}, hidden, ends in ${value.slice(-4)}`
              : undefined
          }
          onFocus={(event) => event.currentTarget.select()}
          className="h-10 min-w-0 flex-1 bg-transparent px-3 font-mono text-[0.8125rem] text-foreground outline-none disabled:cursor-not-allowed max-sm:h-12 max-sm:rounded-md max-sm:border max-sm:border-border-control max-sm:bg-page"
        />
        {disabledReason ? null : (
          <div className="flex gap-1 max-sm:*:h-11 max-sm:*:flex-1">
            {secret ? (
              <Button
                variant="ghost"
                size="xs"
                aria-pressed={revealed}
                onClick={() => setRevealed((value) => !value)}
              >
                {revealed ? "Hide" : "Show"}
              </Button>
            ) : null}
            <CopyButton text={value} label={`Copy ${label.toLowerCase()}`} />
          </div>
        )}
      </div>
      {disabledReason ? (
        <p className="text-caption text-muted-foreground">{disabledReason}</p>
      ) : null}
    </div>
  )
}

export { CopyField }
