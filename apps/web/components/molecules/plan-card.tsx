import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"
import { Separator } from "@kibo/ui/components/separator"
import { cn } from "@kibo/ui/lib/utils"

import { CheckList } from "@/components/molecules/check-list"
import type { Plan } from "@/lib/marketing/plans"

/**
 * One pricing plan. `compact` shows the two highlights used on the landing
 * page; the full card adds the billing note, a trial button and every feature.
 */
export function PlanCard({
  plan,
  yearly = false,
  compact = false,
}: {
  plan: Plan
  yearly?: boolean
  compact?: boolean
}) {
  const price = yearly ? plan.yearlyMonthly : plan.monthly

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col rounded-xl border border-transparent p-6 max-sm:p-4",
        compact ? "gap-4" : "gap-6",
        plan.featured
          ? "bg-primary-subtle shadow-[inset_0_0_0_1px_var(--vi-accent-border)]"
          : "bg-raised shadow-border"
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-heading">{plan.name}</h3>
          {plan.featured ? <Badge variant="accent">Most popular</Badge> : null}
        </div>
        {compact ? null : (
          <p className="text-body-sm text-muted-foreground">{plan.tagline}</p>
        )}
      </div>
      <p>
        <span className="text-display tabular">${price}</span>
        <span className="text-muted-foreground"> / month</span>
      </p>
      {compact ? (
        <>
          <p className="text-body-sm text-muted-foreground">{plan.tagline}</p>
          <CheckList items={plan.highlights} className="text-body-sm" />
        </>
      ) : (
        <>
          <p className="-mt-4 text-caption text-muted-foreground">
            {yearly
              ? `Billed $${plan.yearlyTotal} yearly after a 14-day trial.`
              : "Billed monthly after a 14-day trial."}
          </p>
          <Link
            href={`/signup?plan=${plan.code}`}
            className={buttonVariants({
              variant: plan.featured ? "default" : "secondary",
            })}
          >
            Start free trial
          </Link>
          <Separator />
          <div className="flex flex-col gap-3 text-body-sm">
            {plan.includesPrevious ? (
              <p className="text-caption font-medium">
                {plan.includesPrevious}
              </p>
            ) : null}
            <CheckList items={plan.features} />
          </div>
        </>
      )}
    </div>
  )
}
