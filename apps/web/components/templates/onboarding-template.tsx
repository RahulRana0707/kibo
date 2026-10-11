import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"
import { Eyebrow } from "@kibo/ui/components/typography"

import { BrandLogo } from "@/components/atoms/brand-logo"
import {
  OnboardingStepper,
  onboardingSteps,
} from "@/components/molecules/onboarding-stepper"

/**
 * Setup steps C1–C8: progress bar on top, one centered card per step, and
 * Back / Skip / Continue at the bottom of the card (a sticky footer on
 * phones). Save and exit always works; progress is kept.
 */
export function OnboardingTemplate({
  step,
  title,
  description,
  back,
  skip,
  next,
  exitHref,
  children,
}: {
  /** From 1. */
  step: number
  /** The step's h1. */
  title: string
  description?: string
  back?: React.ReactNode
  skip?: React.ReactNode
  /** Continue: disabled with a reason, never hidden, when input is needed. */
  next: React.ReactNode
  exitHref: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <header className="border-b border-separator bg-page">
        <div className="mx-auto flex max-w-280 flex-wrap items-center gap-x-8 gap-y-4 px-6 py-3.5 max-sm:px-4">
          <BrandLogo />
          <OnboardingStepper step={step} className="flex-[1_1_320px]" />
          <Link href={exitHref} className={buttonVariants({ variant: "secondary", size: "sm" })}>
            Save and exit
          </Link>
        </div>
      </header>
      <main id="main" className="flex flex-1 justify-center p-8 max-sm:p-0">
        <div className="flex w-full max-w-180 flex-col gap-5 self-start rounded-xl bg-raised p-6 shadow-border max-sm:min-h-full max-sm:rounded-none max-sm:p-4 max-sm:pb-24">
          <div className="flex flex-col gap-2">
            <Eyebrow>
              Step {step} of {onboardingSteps.length}
            </Eyebrow>
            <h1 className="text-title">{title}</h1>
            {description ? <p className="text-muted-foreground">{description}</p> : null}
          </div>
          {children}
          <div className="flex items-center gap-3 border-t border-separator pt-5 max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:bg-raised max-sm:px-4 max-sm:py-3 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))] max-sm:shadow-raised">
            {back}
            <div className="ms-auto flex items-center gap-3 max-sm:*:last:h-12">
              {skip ? <span className="max-sm:hidden">{skip}</span> : null}
              {next}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
