"use client"

import {
  CircleAlertIcon,
  InfoIcon,
  TriangleAlertIcon,
  WrenchIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

const tones = {
  info: "bg-primary-subtle text-link",
  warning: "bg-warning-subtle text-warning-text",
  danger: "bg-destructive-subtle text-destructive-text",
  neutral: "bg-sunken text-muted-foreground",
}

const icons = {
  info: InfoIcon,
  warning: TriangleAlertIcon,
  danger: CircleAlertIcon,
  neutral: WrenchIcon,
}

/** When several apply, the highest wins: payment first, maintenance last. */
export const bannerPriority = [
  "payment",
  "paused",
  "reconnect",
  "setup",
  "trial",
  "maintenance",
] as const

export type BannerKind = (typeof bannerPriority)[number]

/**
 * Account-wide state that affects every page, full width under the top
 * bar, one at a time. Danger can't be dismissed until it's fixed.
 */
export function SystemBanner({
  kind,
  tone,
  icon,
  action,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
}: {
  kind: BannerKind
  tone: keyof typeof tones
  /** A platform logo for platform issues; defaults to the tone's icon. */
  icon?: React.ReactNode
  /** One secondary small button. */
  action?: React.ReactNode
  onDismiss?: () => void
  /** Says for how long: “Dismiss for 3 days”. */
  dismissLabel?: string
  children: React.ReactNode
}) {
  const Icon = icons[tone]

  return (
    <div
      data-kind={kind}
      role={tone === "danger" ? "alert" : "status"}
      className={cn(
        "flex flex-wrap items-center gap-3 px-6 py-2.5 text-body-sm max-sm:px-4",
        tones[tone]
      )}
    >
      <span aria-hidden="true" className="shrink-0 [&_svg]:size-4">
        {icon ?? <Icon />}
      </span>
      <span className="min-w-[200px] flex-1">{children}</span>
      {action ? (
        <span className="max-sm:order-last max-sm:w-full max-sm:*:h-11 max-sm:*:w-full">
          {action}
        </span>
      ) : null}
      {onDismiss && tone !== "danger" ? (
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="text-current hover:bg-transparent hover:text-current max-sm:size-11"
        >
          <XIcon />
        </Button>
      ) : null}
    </div>
  )
}

/** Shown until setup is finished: the bot can't join chat yet. */
export function SetupBanner() {
  return (
    <SystemBanner
      kind="setup"
      tone="info"
      action={
        <Button variant="secondary" size="sm" soon aria-describedby="setup-banner-reason">
          Resume setup
        </Button>
      }
    >
      <span id="setup-banner-reason">
        Setup isn’t finished. Your bot won’t join chat until a platform is
        connected. Setup opens soon.
      </span>
    </SystemBanner>
  )
}
