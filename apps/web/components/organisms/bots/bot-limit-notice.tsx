import Link from "next/link"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import { Meter } from "@kibo/ui/components/meter"

export function botsWord(count: number) {
  return count === 1 ? "bot" : "bots"
}

/**
 * Shown when every bot slot is in use: what the limit is, the two ways
 * out (archive one, or a bigger plan) and the usage meter. The Create bot
 * button points here with aria-describedby.
 */
export function BotLimitNotice({
  id,
  limit,
  onArchive,
}: {
  id: string
  limit: { used: number; max: number }
  /** Opens Archive for the only bot; left out when there are several. */
  onArchive?: () => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <Callout
        id={id}
        title={
          limit.max === 1
            ? "You’ve used the 1 bot on your trial"
            : `You’ve used all ${limit.max} bots on your plan`
        }
        action={
          <>
            <Button variant="secondary" size="sm" asChild>
              <Link href="/pricing">See plans</Link>
            </Button>
            {onArchive ? (
              <Button variant="ghost" size="sm" onClick={onArchive}>
                Archive a bot
              </Button>
            ) : null}
          </>
        }
      >
        Archive a bot you don’t use to make room, or move to a plan with more
        bots, every platform and team roles.
      </Callout>
      <Meter
        label="Bots"
        value={limit.used}
        max={limit.max}
        valueText={`${limit.used} / ${limit.max}`}
        // Full is expected on a plan, not an error: warn, as the design does.
        tone="warning"
      />
    </div>
  )
}
