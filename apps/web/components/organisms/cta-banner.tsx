import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { Heading, Lede } from "@kibo/ui/components/typography"

/** The closing call to action at the bottom of a marketing page. */
export function CtaBanner({
  title,
  lede,
  action = { label: "Start free trial", href: "/signup" },
  flush = false,
}: {
  title: React.ReactNode
  lede?: React.ReactNode
  action?: { label: string; href: string }
  /** Drops the top padding when the section above already has the same tone. */
  flush?: boolean
}) {
  return (
    <Section className={flush ? "pt-0 max-sm:pt-0" : undefined}>
      <Container>
        <div className="flex flex-col items-center gap-6 rounded-xl bg-surface px-6 py-16 text-center">
          <Heading className="max-w-[20ch]">{title}</Heading>
          {lede ? <Lede>{lede}</Lede> : null}
          <Link href={action.href} className={buttonVariants({ size: "lg" })}>
            {action.label}
          </Link>
        </div>
      </Container>
    </Section>
  )
}
