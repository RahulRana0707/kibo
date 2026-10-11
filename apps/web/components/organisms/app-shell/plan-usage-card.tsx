import Link from "next/link"

import { Meter } from "@kibo/ui/components/meter"

export type PlanUsage =
  | { kind: "none" }
  | {
      kind: "plan"
      plan: string
      /** Days left in the trial, when there is one. */
      trialDaysLeft?: number
      used: number
      limit: number
    }

/**
 * Plan and usage at the foot of the sidebar. The meter turns warning at
 * 80% and danger at the limit. No plan until billing ships.
 */
export function PlanUsageCard({ usage = { kind: "none" } }: { usage?: PlanUsage }) {
  const none = usage.kind === "none"
  const share = none ? 0 : Math.round((usage.used / usage.limit) * 100)

  return (
    <Link
      href="/pricing"
      className="flex flex-col gap-2.5 rounded-lg border border-transparent bg-raised p-3.5 text-foreground no-underline shadow-border transition-shadow duration-fast hover:shadow-border-hover"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="text-body-sm font-medium">
          {none
            ? "No plan yet"
            : `${usage.plan} plan${usage.trialDaysLeft !== undefined ? " · trial" : ""}`}
        </span>
        <span className="text-caption text-muted-foreground">
          {none
            ? "Free"
            : usage.trialDaysLeft !== undefined
              ? `${usage.trialDaysLeft} days left`
              : null}
        </span>
      </span>
      <Meter
        label={<span className="text-caption text-muted-foreground">AI replies this month</span>}
        value={none ? 0 : usage.used}
        max={none ? 100 : usage.limit}
        usage
        valueText={`${share}%`}
        className="gap-1 [&>div]:text-caption"
      />
      <span className="text-caption font-medium text-link">
        {none ? "View plans" : share >= 100 ? "Upgrade plan" : "View usage"}
      </span>
    </Link>
  )
}
