import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"
import { cn } from "@kibo/ui/lib/utils"

import { Container } from "@/components/atoms/container"

type CtaAction = { label: string; href: string }

/**
 * The closing call to action before the footer: once per page, always the
 * dark section tone. The default is an inset card with the copy beside the
 * actions; `flush` runs full bleed with everything centered.
 */
export function CtaBanner({
  title,
  lede,
  action = { label: "Start free trial", href: "/signup" },
  secondary,
  flush = false,
}: {
  title: React.ReactNode
  lede?: React.ReactNode
  action?: CtaAction
  /** Outlined on dark, before the primary action. */
  secondary?: CtaAction
  flush?: boolean
}) {
  const id = "cta-title"
  const actions = (
    <div
      className={cn(
        "flex flex-wrap gap-3 max-sm:w-full max-sm:flex-col-reverse",
        flush && "justify-center"
      )}
    >
      {secondary ? (
        <Link
          href={secondary.href}
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "bg-transparent max-sm:w-full"
          )}
        >
          {secondary.label}
        </Link>
      ) : null}
      <Link
        href={action.href}
        className={cn(buttonVariants({ size: "lg" }), "max-sm:w-full")}
      >
        {action.label}
      </Link>
    </div>
  )
  const copy = (
    <div className={cn("flex min-w-0 flex-col gap-2", flush && "items-center gap-6")}>
      <h2
        id={id}
        className="text-[1.75rem] leading-tight font-semibold tracking-[-0.01em] max-sm:text-2xl"
      >
        {title}
      </h2>
      {lede ? <p className="text-body text-muted-foreground">{lede}</p> : null}
    </div>
  )

  if (flush) {
    return (
      <section
        aria-labelledby={id}
        className="dark bg-background py-16 text-center text-foreground max-sm:py-12"
      >
        <Container className="flex flex-col items-center gap-8">
          {copy}
          {actions}
        </Container>
      </section>
    )
  }

  return (
    <section aria-labelledby={id} className="py-12">
      <Container>
        <div className="dark flex flex-wrap items-center justify-between gap-x-8 gap-y-6 rounded-xl bg-background p-16 text-foreground max-md:p-10 max-sm:flex-col max-sm:items-start max-sm:px-6 max-sm:py-8">
          {copy}
          {actions}
        </div>
      </Container>
    </section>
  )
}
