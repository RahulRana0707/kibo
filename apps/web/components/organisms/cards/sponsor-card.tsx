import Link from "next/link"

import { Avatar } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { StatusPill } from "@/components/atoms/status-pill"

export type SponsorStatus = "active" | "scheduled" | "paused" | "ended" | "draft" | "error"

const pills = {
  active: { tone: "live", word: "Active" },
  scheduled: { tone: "offline", word: "Scheduled" },
  paused: { tone: "paused", word: "Paused" },
  draft: { tone: "draft", word: "Draft" },
  error: { tone: "error", word: "Error" },
} as const

const actions: Partial<Record<SponsorStatus, string>> = {
  paused: "Resume",
  ended: "See report",
  error: "Fix link",
}

/**
 * A sponsor campaign: brand, dates, code, what Pip says and how it did.
 * Every sponsored line Pip posts carries #ad. Ended cards fade but keep
 * full-contrast text.
 */
export function SponsorCard({
  brand,
  logo,
  dates,
  status,
  code,
  note,
  stats,
  href,
}: {
  brand: string
  /** The creator-uploaded brand image; initials until there is one. */
  logo?: string
  dates: string
  status: SponsorStatus
  code?: string
  note?: string
  stats?: { label: string; value: string }[]
  href: string
}) {
  const action = actions[status]

  return (
    <article
      className={cn(
        "relative flex min-h-[220px] flex-col gap-3 rounded-xl border border-transparent bg-raised p-5 shadow-border",
        status === "ended" && "bg-raised/75",
        status === "error" && "shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar name={brand} src={logo} size="md" shape="square" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="text-body-sm font-semibold">
            <Link href={href} className="text-foreground no-underline after:absolute after:inset-0 hover:underline">
              {brand}
            </Link>
          </h3>
          <span className="text-caption text-muted-foreground">{dates}</span>
        </div>
        {status === "ended" ? <Badge>Ended</Badge> : <StatusPill tone={pills[status].tone} size="sm">{pills[status].word}</StatusPill>}
      </div>
      {code ? (
        <p className="text-caption text-muted-foreground">
          Code <code className="rounded-sm bg-sunken px-1.5 py-0.5 font-mono text-[0.8125rem] text-foreground">{code}</code>
        </p>
      ) : null}
      {note ? (
        <p className={cn("text-caption text-muted-foreground", status === "error" && "text-destructive-text")}>
          {note}
        </p>
      ) : null}
      {stats?.length ? (
        <dl className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
          {stats.map((stat) => (
            <div key={stat.label} className="flex gap-1">
              <dd className="text-foreground tabular">{stat.value}</dd>
              <dt>{stat.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
      {action ? (
        <span aria-hidden="true" className={cn(buttonVariants({ variant: "secondary", size: "xs" }), "mt-auto self-start")}>
          {action}
        </span>
      ) : null}
    </article>
  )
}
