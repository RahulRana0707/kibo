import Link from "next/link"

import { Meter } from "@/components/atoms/meter"

/** Plan and usage at the foot of the sidebar. No plan until billing ships. */
export function PlanUsageCard() {
  return (
    <Link
      href="/pricing"
      className="flex flex-col gap-2.5 rounded-lg border border-transparent bg-raised p-3.5 text-foreground no-underline shadow-border transition-shadow duration-150 hover:shadow-border-hover"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="font-medium">No plan yet</span>
        <span className="text-caption text-muted-foreground">Free</span>
      </span>
      <span className="flex flex-col gap-1">
        <span className="flex items-center justify-between gap-2 text-caption">
          <span className="text-muted-foreground">AI replies this month</span>
          <span className="font-medium tabular">0%</span>
        </span>
        <Meter value={0} />
      </span>
      <span className="text-caption font-medium text-link">View plans</span>
    </Link>
  )
}
