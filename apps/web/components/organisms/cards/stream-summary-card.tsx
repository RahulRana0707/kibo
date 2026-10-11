import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { PlatformIcon, type Platform } from "@/components/atoms/platform-icon"
import { Stat } from "@/components/atoms/stat"
import { StatusPill } from "@/components/atoms/status-pill"
import { Sparkline } from "@/components/molecules/charts"

/**
 * One stream in Streams and on the dashboard: title, date, platforms,
 * three numbers and a chat-activity sparkline. Links to the full summary;
 * a live stream links to the console instead.
 */
export function StreamSummaryCard({
  title,
  date,
  platforms,
  href,
  status = "finished",
  stats,
  activity,
  note,
}: {
  title: string
  /** “Fri, Oct 9 · 7:00–10:42 PM · 3 h 42 m”. */
  date: string
  platforms: Platform[]
  href: string
  status?: "finished" | "live" | "processing" | "error"
  stats?: { label: string; value: string }[]
  /** Chat messages per interval, for the sparkline. */
  activity?: number[]
  /** A highlight (“Raid from nightowl_gg”) or what went wrong. */
  note?: string
}) {
  return (
    <article
      className={cn(
        "relative flex min-h-[250px] flex-col gap-4 rounded-xl border border-transparent bg-raised p-5 shadow-border transition-shadow duration-fast hover:shadow-border-hover",
        status === "live" && "shadow-[inset_0_0_0_1px_var(--vi-success-border)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="text-heading">
            <Link href={href} className="text-foreground no-underline after:absolute after:inset-0 hover:underline">
              {title}
            </Link>
          </h3>
          <p className="flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
            <span className="flex gap-1">
              {platforms.map((platform) => (
                <PlatformIcon key={platform} platform={platform} label={platform} />
              ))}
            </span>
            {date}
          </p>
        </div>
        {status === "live" ? <StatusPill tone="live" size="sm" /> : null}
        {status === "processing" ? (
          <StatusPill tone="connecting" size="sm">
            Processing
          </StatusPill>
        ) : null}
        {status === "error" ? <StatusPill tone="error" size="sm" /> : null}
      </div>
      {stats?.length ? (
        <div className="grid grid-cols-3 gap-3">
          {stats.slice(0, 3).map((stat) => (
            <Stat
              key={stat.label}
              size="sm"
              label={stat.label}
              value={stat.value}
              labelFirst={false}
              state={status === "processing" ? "loading" : undefined}
            />
          ))}
        </div>
      ) : null}
      {activity && status === "finished" ? (
        <Sparkline values={activity} summary={`Chat activity during ${title}`} />
      ) : null}
      {note ? (
        <p className={cn("text-caption text-muted-foreground", status === "error" && "text-destructive-text")}>
          {note}
        </p>
      ) : null}
      {status === "live" ? (
        <span aria-hidden="true" className={cn(buttonVariants({ size: "sm" }), "relative mt-auto self-start")}>
          Open live console
        </span>
      ) : null}
    </article>
  )
}
