import Link from "next/link"
import { CodeIcon, LockIcon } from "lucide-react"

import { Badge } from "@kibo/ui/components/badge"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { cn } from "@kibo/ui/lib/utils"

import { GlyphTile, PlatformIcon } from "@/components/atoms/platform-icon"
import { StatusPill } from "@/components/atoms/status-pill"
import type { Integration } from "@/lib/marketing/integrations"

const appStates = {
  "not-connected": { tone: "offline", word: "Not connected" },
  connecting: { tone: "connecting", word: "Connecting" },
  connected: { tone: "live", word: "Connected" },
  reconnect: { tone: "reconnect", word: "Needs reconnect" },
  error: { tone: "error", word: "Error" },
} as const

const cardClassName =
  "flex rounded-xl border border-transparent bg-raised text-foreground no-underline shadow-border"

function Logo({ integration, muted }: { integration: Integration; muted?: boolean }) {
  return integration.platform ? (
    <PlatformIcon platform={integration.platform} size="lg" muted={muted} />
  ) : (
    <GlyphTile>
      <CodeIcon />
    </GlyphTile>
  )
}

/**
 * One integration in the marketing directory. Links to its page when
 * available; coming-soon ones show a muted logo and a Soon label.
 */
export function IntegrationCard({
  integration,
  compact = false,
}: {
  integration: Integration
  compact?: boolean
}) {
  const body = (
    <>
      <Logo integration={integration} muted={!integration.available} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-semibold">{integration.name}</span>
          {compact ? null : integration.available ? (
            <Badge variant="success">Available</Badge>
          ) : (
            <SoonLabel />
          )}
        </span>
        {!compact && integration.description ? (
          <span className="text-caption text-muted-foreground">
            {integration.description}
          </span>
        ) : null}
      </span>
    </>
  )

  const className = cn(
    cardClassName,
    "items-start gap-3 p-4",
    compact && "items-center rounded-lg p-3"
  )

  return integration.available ? (
    <Link
      href={`/integrations/${integration.slug}`}
      className={cn(
        className,
        "transition-shadow duration-fast hover:shadow-border-hover"
      )}
    >
      {body}
    </Link>
  ) : (
    <div className={className}>{body}</div>
  )
}

/**
 * One integration in the app: logo, status pill and the one action for
 * its state. A reconnect or error state edges the card in its tone;
 * `lockedPlan` gates it behind a higher plan.
 */
export function AppIntegrationCard({
  integration,
  state,
  account,
  detail,
  action,
  lockedPlan,
}: {
  integration: Integration
  state: keyof typeof appStates
  /** The connected account, such as “miraplays”. */
  account?: string
  /** One line under the name: what it does or what went wrong. */
  detail?: React.ReactNode
  /** One small button; at most one primary (Reconnect). */
  action?: React.ReactNode
  lockedPlan?: string
}) {
  const status = appStates[state]

  return (
    <article
      aria-label={`${integration.name}, ${lockedPlan ? `${lockedPlan} plan required` : status.word}${account ? `, ${account}` : ""}`}
      className={cn(
        cardClassName,
        "min-h-50 flex-col gap-3 p-5",
        state === "reconnect" &&
          "shadow-[inset_0_0_0_1px_var(--vi-warning-border)]",
        state === "error" && "shadow-[inset_0_0_0_1px_var(--vi-danger-border)]"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <Logo integration={integration} />
        {lockedPlan ? (
          <Badge variant="outline">
            <LockIcon />
            {lockedPlan}
          </Badge>
        ) : (
          <StatusPill tone={status.tone} size="sm">
            {status.word}
          </StatusPill>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="text-heading">{integration.name}</h3>
        {account ? (
          <p className="text-caption text-muted-foreground">{account}</p>
        ) : null}
        {detail ? (
          <p
            className={cn(
              "text-caption text-muted-foreground",
              state === "error" && "text-destructive-text",
              state === "reconnect" && "text-warning-text"
            )}
          >
            {detail}
          </p>
        ) : null}
      </div>
      {action ? <div className="flex flex-wrap gap-2">{action}</div> : null}
    </article>
  )
}
