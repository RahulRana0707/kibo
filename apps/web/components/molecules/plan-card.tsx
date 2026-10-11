import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"
import { Meter } from "@kibo/ui/components/meter"
import { Separator } from "@kibo/ui/components/separator"
import { cn } from "@kibo/ui/lib/utils"

import { CheckList } from "@/components/molecules/check-list"
import type { Plan } from "@/lib/marketing/plans"

type Relation =
  | { kind: "marketing" }
  | { kind: "current"; trialDaysLeft?: number; trialEnds?: string }
  | { kind: "upgrade"; href: string }
  | { kind: "downgrade"; href: string }

/**
 * A plan: price, who it's for, what it includes and one action. The same
 * card on pricing, onboarding and change plan; `relation` sets the action
 * from the account's current plan. `compact` shows two highlights (landing
 * page and pickers).
 */
export function PlanCard({
  plan,
  yearly = false,
  compact = false,
  relation = { kind: "marketing" },
}: {
  plan: Plan
  yearly?: boolean
  compact?: boolean
  relation?: Relation
}) {
  const price = yearly ? plan.yearlyMonthly : plan.monthly
  const current = relation.kind === "current"
  const trialDaysLeft = current ? relation.trialDaysLeft : undefined

  const action = (() => {
    switch (relation.kind) {
      case "current":
        return (
          <span
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "pointer-events-none bg-sunken text-muted-foreground shadow-none"
            )}
          >
            Current plan
          </span>
        )
      case "upgrade":
        return (
          <Link href={relation.href} className={buttonVariants()}>
            Upgrade to {plan.name}
          </Link>
        )
      case "downgrade":
        return (
          <Link
            href={relation.href}
            className={buttonVariants({ variant: "secondary" })}
          >
            Downgrade to {plan.name}
          </Link>
        )
      default:
        return (
          <Link
            href={`/signup?plan=${plan.code}`}
            className={buttonVariants({
              variant: plan.featured ? "primary" : "secondary",
            })}
          >
            Start free trial
          </Link>
        )
    }
  })()

  return (
    <article
      className={cn(
        "flex min-w-0 flex-col rounded-xl border border-transparent p-6 max-sm:p-5",
        compact ? "gap-4" : "gap-6",
        current
          ? "bg-surface"
          : plan.featured && relation.kind === "marketing"
            ? "bg-raised shadow-[inset_0_0_0_2px_var(--vi-accent-solid)]"
            : "bg-raised shadow-border"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-heading">{plan.name}</h3>
          {trialDaysLeft !== undefined ? (
            <Badge variant="accent">Trial · {trialDaysLeft} days left</Badge>
          ) : current ? (
            <Badge variant="success">Current</Badge>
          ) : plan.featured ? (
            <Badge variant="accent">Most popular</Badge>
          ) : null}
        </div>
        {compact ? null : (
          <p className="text-body-sm text-muted-foreground">{plan.tagline}</p>
        )}
      </div>
      <p>
        <span className="text-[2.25rem] leading-none font-semibold tabular">
          ${price}
        </span>
        <span className="text-body-sm text-muted-foreground"> / month</span>
      </p>
      {trialDaysLeft !== undefined ? (
        <div className="flex flex-col gap-2">
          <Meter value={14 - trialDaysLeft} max={14} />
          {relation.kind === "current" && relation.trialEnds ? (
            <p className="text-caption text-muted-foreground">
              Trial ends {relation.trialEnds}.
            </p>
          ) : null}
        </div>
      ) : null}
      {compact ? (
        <>
          <p className="text-body-sm text-muted-foreground">{plan.tagline}</p>
          <CheckList items={plan.highlights} />
        </>
      ) : (
        <>
          <p className="-mt-4 text-caption text-muted-foreground">
            {yearly ? (
              <>
                Billed ${plan.yearlyTotal} yearly after a 14-day trial.{" "}
                <span className="text-success-text">Save 20%</span>
              </>
            ) : (
              "Billed monthly after a 14-day trial."
            )}
          </p>
          {action}
          <Separator />
          <div className="flex flex-col gap-3">
            {plan.includesPrevious ? (
              <p className="text-caption font-medium">
                {plan.includesPrevious}
              </p>
            ) : null}
            <CheckList items={plan.features} />
          </div>
        </>
      )}
    </article>
  )
}
