import { CheckIcon, MinusIcon } from "lucide-react"

import { Meter } from "@kibo/ui/components/meter"
import { Skeleton } from "@kibo/ui/components/skeleton"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { cn } from "@kibo/ui/lib/utils"

export type SetupStep = {
  title: string
  detail?: string
  status?: "todo" | "current" | "done" | "skipped"
  /** The current step's button (primary sm). */
  action?: React.ReactNode
  /** Not built yet: shows Soon instead of an action. */
  soon?: boolean
}

const hiddenStatus = {
  todo: "",
  current: "Next step",
  done: "Done",
  skipped: "Skipped",
}

function Marker({ status }: { status: NonNullable<SetupStep["status"]> }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-6 shrink-0 place-items-center rounded-full [&_svg]:size-3.5",
        status === "todo" && "shadow-[inset_0_0_0_1.5px_var(--vi-border-strong)]",
        status === "current" && "shadow-[inset_0_0_0_2px_var(--vi-accent-solid)]",
        status === "done" && "bg-success-subtle text-success-text",
        status === "skipped" && "text-disabled shadow-[inset_0_0_0_1.5px_var(--vi-border)]"
      )}
    >
      {status === "done" ? <CheckIcon strokeWidth={2.5} /> : null}
      {status === "skipped" ? <MinusIcon strokeWidth={2.5} /> : null}
    </span>
  )
}

/** One task. The current row is tinted and holds the one action. */
export function SetupChecklistRow({ step }: { step: SetupStep }) {
  const status = step.status ?? "todo"
  const current = status === "current"

  return (
    <li
      aria-current={current ? "step" : undefined}
      className={cn(
        "flex flex-wrap items-center gap-3.5 border-b border-separator px-5 py-4 last:border-b-0 max-sm:px-4",
        current && "bg-primary-subtle"
      )}
    >
      <Marker status={status} />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span
          className={cn(
            "text-body-sm font-medium",
            current && "font-semibold",
            (status === "done" || status === "skipped") && "text-muted-foreground"
          )}
        >
          {step.title}
        </span>
        {step.detail ? (
          <span className="text-caption text-muted-foreground">{step.detail}</span>
        ) : null}
      </span>
      {step.soon ? (
        <>
          <SoonLabel />
          <span className="sr-only">Coming soon</span>
        </>
      ) : current && step.action ? (
        <span className="max-sm:w-full max-sm:*:h-11 max-sm:*:w-full">{step.action}</span>
      ) : null}
      {hiddenStatus[status] ? (
        <span className="sr-only">{hiddenStatus[status]}</span>
      ) : null}
    </li>
  )
}

/**
 * Tasks left after onboarding, on a brand-new dashboard. One row is next at
 * a time; done rows stay so progress is visible. `loading` shows the rows
 * as skeletons.
 */
export function SetupChecklist({
  title,
  steps,
  loading = false,
}: {
  title: string
  steps: SetupStep[]
  loading?: boolean
}) {
  const done = steps.filter((step) => step.status === "done").length

  return (
    <section
      aria-labelledby="setup-title"
      aria-busy={loading || undefined}
      className="flex flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-border"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-separator px-5 py-4 max-sm:px-4">
        <div className="flex flex-col gap-1">
          <h2 id="setup-title" className="text-heading">
            {title}
          </h2>
          <p className="text-caption text-muted-foreground tabular">
            {done} of {steps.length} done
          </p>
        </div>
        <Meter value={done} max={steps.length} className="w-50 max-sm:w-full" />
      </div>
      {loading ? (
        <div className="flex flex-col px-5">
          {steps.map((step) => (
            <Skeleton key={step.title} variant="avatar-line" className="py-4" />
          ))}
        </div>
      ) : (
        <ol>
          {steps.map((step) => (
            <SetupChecklistRow key={step.title} step={step} />
          ))}
        </ol>
      )}
    </section>
  )
}
