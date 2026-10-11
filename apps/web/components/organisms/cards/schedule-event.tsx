import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { cn } from "@kibo/ui/lib/utils"

export type EventStatus =
  | "upcoming"
  | "live"
  | "ended"
  | "cancelled"
  | "synced"
  | "conflict"

const chipTones: Record<EventStatus, string> = {
  upcoming: "bg-primary-subtle shadow-[inset_3px_0_0_var(--vi-accent-solid)]",
  live: "bg-success-subtle shadow-[inset_3px_0_0_var(--vi-success-solid)]",
  ended: "bg-sunken shadow-[inset_3px_0_0_var(--vi-border-strong)]",
  cancelled: "bg-sunken text-disabled line-through shadow-[inset_3px_0_0_var(--vi-border)]",
  synced: "bg-raised shadow-[inset_3px_0_0_var(--vi-accent-border),0_0_0_1px_var(--vi-border-subtle)]",
  conflict: "bg-warning-subtle shadow-[inset_3px_0_0_var(--vi-warning-solid)]",
}

const statusWords: Record<EventStatus, string> = {
  upcoming: "upcoming",
  live: "live now",
  ended: "ended",
  cancelled: "cancelled",
  synced: "from Google Calendar, read-only",
  conflict: "conflicts with another event",
}

/**
 * A planned stream as a calendar chip. Pip reads its title, game and
 * sponsor to answer “when's the next stream?”. State is in words too.
 */
export function ScheduleEventChip({
  title,
  meta,
  status,
  href,
  when,
}: {
  title: string
  /** “Tue 7:00 PM · Valorant”. */
  meta: string
  status: EventStatus
  href: string
  /** Full date for the accessible name: “Tuesday October 13, 7 PM”. */
  when: string
}) {
  return (
    <Link
      href={href}
      aria-label={`${title}, ${when}, ${statusWords[status]}`}
      className={cn(
        "flex flex-col gap-0.5 rounded-sm px-2 py-1.5 text-foreground no-underline",
        chipTones[status]
      )}
    >
      <span className="truncate text-caption font-semibold">{title}</span>
      <span className="truncate text-xs text-muted-foreground">{meta}</span>
    </Link>
  )
}

/** A planned stream in a list: date block, title, time with timezone. */
export function ScheduleEventRow({
  day,
  date,
  title,
  meta,
  sponsor,
  action,
  status = "upcoming",
}: {
  /** “Tue”. */
  day: string
  /** “13”. */
  date: string
  title: string
  /** Always with the timezone: “7:00 PM IST · Valorant · YouTube + Twitch”. */
  meta: string
  sponsor?: string
  action?: React.ReactNode
  status?: EventStatus
}) {
  return (
    <li className="flex items-center gap-3 border-b border-separator py-3 last:border-b-0">
      <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-md bg-sunken leading-tight">
        <span className="text-xs text-muted-foreground">{day}</span>
        <span className="text-body-sm font-semibold tabular">{date}</span>
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn("text-body-sm font-semibold", status === "cancelled" && "text-disabled line-through")}>
          {title}
        </span>
        <span className="text-caption text-muted-foreground">{meta}</span>
      </div>
      {sponsor ? <Badge>{sponsor}</Badge> : null}
      {action}
    </li>
  )
}
