import Link from "next/link"
import { PlusIcon } from "lucide-react"

import { Avatar } from "@kibo/ui/components/avatar"
import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { IconTile } from "@/components/atoms/icon-tile"
import { StatusPill } from "@/components/atoms/status-pill"

export type BotCardStatus = "live" | "paused" | "draft" | "error" | "offline"

const actions: Record<BotCardStatus, string> = {
  live: "Open console",
  paused: "Resume",
  draft: "Finish setup",
  error: "See what happened",
  offline: "Open bot",
}

/**
 * One bot in Bots: avatar, name, purpose, status, last-stream numbers and
 * the one action for its state. The whole card is one link; the action is
 * its visual call to action, not a nested control.
 */
export function BotCard({
  name,
  purpose,
  status,
  href,
  stats,
  note,
}: {
  name: string
  /** “Ranked nights · Hype”. */
  purpose: string
  status: BotCardStatus
  href: string
  /** Up to three last-stream numbers. */
  stats?: { label: string; value: string }[]
  /** Why it's paused, in draft or failing. */
  note?: string
}) {
  return (
    <Link
      href={href}
      aria-label={`${name}, ${status}`}
      className={cn(
        "group flex min-h-[230px] flex-col gap-4 rounded-xl border border-transparent bg-raised p-5 text-foreground no-underline shadow-border transition-shadow duration-fast hover:shadow-border-hover active:scale-[0.98] motion-reduce:active:scale-100",
        status === "error" && "shadow-[inset_0_0_0_1px_var(--vi-danger-border)] hover:shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar name={name} variant="bot" size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-heading">{name}</span>
          <span className="text-caption text-muted-foreground">{purpose}</span>
        </div>
        <StatusPill tone={status} size="sm" />
      </div>
      {stats?.length ? (
        <dl className="flex flex-wrap gap-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              <dd className="text-heading tabular">{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {note ? (
        <p className={cn("text-caption text-muted-foreground", status === "error" && "text-destructive-text")}>
          {note}
        </p>
      ) : null}
      <span
        aria-hidden="true"
        className={cn(
          buttonVariants({ variant: status === "live" ? "primary" : "secondary", size: "sm" }),
          "mt-auto self-start"
        )}
      >
        {actions[status]}
      </span>
    </Link>
  )
}

/** The dashed first card when there are no bots. */
export function BotCardEmpty({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex min-h-[230px] flex-col items-center justify-center gap-3 rounded-xl border-[1.5px] border-dashed border-border-strong p-5 text-center text-foreground no-underline hover:bg-hovered"
    >
      <IconTile>
        <PlusIcon />
      </IconTile>
      <span className="text-heading">Create your first bot</span>
      <span className="max-w-[32ch] text-caption text-muted-foreground">
        Name it, teach it 3 answers, connect a platform.
      </span>
    </Link>
  )
}
