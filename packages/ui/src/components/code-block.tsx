"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"
import { Button } from "@kibo/ui/components/button"

type CopyState = "idle" | "copied" | "error"

/** Copies text and reports the result for two seconds. */
function useCopy(text: string) {
  const [state, setState] = React.useState<CopyState>("idle")

  React.useEffect(() => {
    if (state === "idle") return
    const timer = window.setTimeout(() => setState("idle"), 2000)
    return () => window.clearTimeout(timer)
  }, [state])

  const copy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState("copied")
    } catch {
      setState("error")
    }
  }, [text])

  return { state, copy }
}

const copyLabels: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  error: "Copy failed",
}

/** The Copy button used by code blocks and copy fields. */
function CopyButton({
  text,
  label,
  className,
  size = "xs",
}: {
  text: string
  /** Names what is copied: “Copy overlay URL”. */
  label: string
  className?: string
  size?: "xs" | "sm"
}) {
  const { state, copy } = useCopy(text)
  const Icon =
    state === "copied"
      ? CheckIcon
      : state === "error"
        ? TriangleAlertIcon
        : CopyIcon

  return (
    <Button
      variant="secondary"
      size={size}
      aria-label={state === "idle" ? label : undefined}
      onClick={copy}
      className={className}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "motion-safe:animate-in motion-safe:zoom-in-25 motion-safe:fade-in-0 motion-safe:duration-slow",
          state === "copied" && "text-success-text",
          state === "error" && "text-destructive-text"
        )}
        key={state}
      />
      <span aria-live="polite">{copyLabels[state]}</span>
    </Button>
  )
}

/** A block of code or a command, with Copy at the end. */
function CodeBlock({
  code,
  copyLabel = "Copy code",
  className,
}: {
  code: string
  copyLabel?: string
  className?: string
}) {
  return (
    <div className={cn("relative", className)}>
      <pre className="overflow-x-auto rounded-lg bg-sunken p-4 pe-24 font-mono text-[0.8125rem]/[1.6] text-foreground">
        <code>{code}</code>
      </pre>
      <CopyButton
        text={code}
        label={copyLabel}
        className="absolute inset-e-3 top-3"
      />
    </div>
  )
}

export { CodeBlock, CopyButton, useCopy }
