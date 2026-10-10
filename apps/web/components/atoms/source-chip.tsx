"use client"

import { BookOpenIcon, PlugIcon, TerminalIcon } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@kibo/ui/components/popover"
import { cn } from "@kibo/ui/lib/utils"

const kindIcons = {
  faq: BookOpenIcon,
  integration: PlugIcon,
  command: TerminalIcon,
}

const chipClassName =
  "inline-flex h-5.5 items-center gap-1 rounded-sm px-1.5 text-xs font-medium whitespace-nowrap max-sm:h-8 [&_svg]:size-3 [&_svg]:shrink-0"

/**
 * Where an answer came from. With `why` it is a button that opens “Why it
 * answered”; `stale` marks a source that changed since, `removed` one that
 * no longer exists (plain text, struck through).
 */
export function SourceChip({
  kind = "faq",
  state = "default",
  why,
  className,
  children,
}: {
  kind?: keyof typeof kindIcons
  state?: "default" | "stale" | "removed"
  /** The content of the “Why it answered” popover. */
  why?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  const Icon = kindIcons[kind]

  if (state === "removed") {
    return (
      <span
        className={cn(
          chipClassName,
          "bg-sunken text-disabled line-through",
          className
        )}
      >
        <Icon aria-hidden="true" />
        {children}
      </span>
    )
  }

  const tone =
    state === "stale"
      ? "bg-warning-subtle text-warning-text"
      : "bg-sunken text-muted-foreground"

  if (!why) {
    return (
      <span className={cn(chipClassName, tone, className)}>
        <Icon aria-hidden="true" />
        {children}
      </span>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          chipClassName,
          tone,
          "cursor-pointer hover:bg-hovered data-[state=open]:bg-primary-subtle data-[state=open]:text-link",
          className
        )}
      >
        <Icon aria-hidden="true" />
        {children}
      </PopoverTrigger>
      <PopoverContent className="flex w-85 flex-col gap-3 p-4">
        <p className="text-overline text-muted-foreground uppercase">
          Why it answered
        </p>
        {why}
      </PopoverContent>
    </Popover>
  )
}

const levels = {
  high: "bg-success",
  medium: "bg-warning",
  low: "bg-destructive",
}

/** High at 85% and up, medium from 60%, low below. */
function levelFor(value: number): keyof typeof levels {
  if (value >= 85) return "high"
  if (value >= 60) return "medium"
  return "low"
}

/**
 * How sure Pip was, text first (“92% sure”) with a small meter. `null`
 * means no score, such as a command reply.
 */
export function Confidence({
  value,
  suffix,
}: {
  value: number | null
  suffix?: string
}) {
  if (value === null) {
    return <span className="text-xs text-muted-foreground">—</span>
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground tabular">
      <span
        role="meter"
        aria-label="Confidence"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        className="block h-1 w-10 overflow-hidden rounded-full bg-sunken"
      >
        <span
          className={cn("block h-full rounded-full", levels[levelFor(value)])}
          style={{ width: `${value}%` }}
        />
      </span>
      {value}%{suffix ? ` ${suffix}` : null}
    </span>
  )
}
