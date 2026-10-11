"use client"

import { useState } from "react"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { PlanCard } from "@/components/molecules/plan-card"
import { SegmentedControl } from "@kibo/ui/components/segmented-control"
import { plans } from "@/lib/marketing/plans"

type Period = "monthly" | "yearly"

/** The billing-period switch and the three plan cards. */
export function PricingPlans({ heading }: { heading: React.ReactNode }) {
  const [period, setPeriod] = useState<Period>("monthly")

  return (
    <>
      <section className="pt-24 pb-12 max-sm:pt-16">
        <div className="mx-auto flex max-w-300 flex-col items-center gap-8 px-6 text-center max-sm:px-4">
          {heading}
          <SegmentedControl
            label="Billing period"
            value={period}
            onValueChange={setPeriod}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly · save 20%" },
            ]}
          />
        </div>
      </section>
      <section className="pb-24">
        <div className="mx-auto max-w-300 px-6 max-sm:px-4">
          <AutoGrid min="300px">
            {plans.map((plan) => (
              <PlanCard
                key={plan.code}
                plan={plan}
                yearly={period === "yearly"}
              />
            ))}
          </AutoGrid>
        </div>
      </section>
    </>
  )
}
