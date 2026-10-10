import { Badge } from "@kibo/ui/components/badge"
import { cn } from "@kibo/ui/lib/utils"

import { Meter } from "@kibo/ui/components/meter"

export type SetupStep = { title: string; detail?: string }

/** The first-run checklist. The first unfinished step is highlighted. */
export function SetupChecklist({
  title,
  steps,
  done = 0,
}: {
  title: string
  steps: SetupStep[]
  done?: number
}) {
  return (
    <section
      aria-labelledby="setup-title"
      className="flex flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-border"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-separator px-6 py-4 max-sm:px-4">
        <div className="flex flex-col gap-1">
          <h2 id="setup-title" className="text-heading">
            {title}
          </h2>
          <p className="text-caption text-muted-foreground">
            {done} of {steps.length} done
          </p>
        </div>
        <Meter value={(done / steps.length) * 100} className="w-50" />
      </div>
      <ol>
        {steps.map((step, index) => {
          const next = index === done
          return (
            <li
              key={step.title}
              aria-current={next ? "step" : undefined}
              className={cn(
                "flex items-center gap-3.5 border-b border-separator px-6 py-4 last:border-b-0 max-sm:px-4",
                next && "bg-primary-subtle"
              )}
            >
              <span
                aria-hidden="true"
                className="size-6 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_var(--vi-border-strong)]"
              />
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className={next ? "font-semibold" : "font-medium"}>
                  {step.title}
                </span>
                {step.detail ? (
                  <span className="text-caption text-muted-foreground">
                    {step.detail}
                  </span>
                ) : null}
              </span>
              <Badge>Soon</Badge>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
