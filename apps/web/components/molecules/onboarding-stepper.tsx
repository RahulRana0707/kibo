import { CheckIcon } from "lucide-react"

import { cn } from "@kibo/ui/lib/utils"

export const onboardingSteps = [
  "Your profile",
  "Create a bot",
  "Teach Pip",
  "Connect a platform",
  "Reply mode",
  "Test drive",
  "Choose a plan",
  "You’re ready",
]

/**
 * Progress through the setup steps. `bar` is the segmented bar in the
 * onboarding header (“Step 3 of 8 · Teach Pip”); `list` is the step list on
 * the resume screen.
 */
export function OnboardingStepper({
  step,
  steps = onboardingSteps,
  variant = "bar",
  className,
}: {
  /** The current step, from 1. */
  step: number
  steps?: string[]
  variant?: "bar" | "list"
  className?: string
}) {
  const name = steps[step - 1]
  const percent = Math.round(((step - 1) / steps.length) * 100)

  if (variant === "list") {
    return (
      <ol className={cn("flex flex-col gap-1", className)}>
        {steps.map((label, index) => {
          const number = index + 1
          const state =
            number < step ? "done" : number === step ? "current" : "upcoming"
          return (
            <li
              key={label}
              aria-current={state === "current" ? "step" : undefined}
              className={cn(
                "flex min-h-10 items-center gap-3 rounded-md px-2.5 text-body-sm",
                state === "current" && "bg-primary-subtle font-semibold",
                state === "upcoming" && "text-muted-foreground"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-6 shrink-0 place-items-center rounded-full text-xs font-semibold tabular",
                  state === "done" && "bg-success-subtle text-success-text",
                  state === "current" && "bg-primary text-on-accent",
                  state === "upcoming" && "shadow-[inset_0_0_0_1.5px_var(--vi-border-strong)]"
                )}
              >
                {state === "done" ? <CheckIcon className="size-3.5" strokeWidth={2.5} /> : number}
              </span>
              {label}
              {state === "done" ? <span className="sr-only"> (completed)</span> : null}
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <div className="flex justify-between gap-3 text-caption">
        <span className="font-medium">
          Step {step} of {steps.length} · {name}
        </span>
        <span className="text-muted-foreground tabular">{percent}% set up</span>
      </div>
      <div
        role="progressbar"
        aria-label="Setup progress"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={step}
        aria-valuetext={`Step ${step} of ${steps.length}, ${name}`}
        className="flex gap-1.5"
      >
        {steps.map((label, index) => (
          <span
            key={label}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors duration-moderate ease-out",
              index + 1 < step
                ? "bg-primary"
                : index + 1 === step
                  ? "bg-primary-border"
                  : "bg-sunken"
            )}
          />
        ))}
      </div>
    </div>
  )
}
