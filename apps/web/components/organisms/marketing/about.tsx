import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"
import { Heading } from "@kibo/ui/components/typography"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Placeholder } from "@/components/atoms/placeholder"
import { Prose } from "@/components/atoms/prose"
import { Section } from "@/components/atoms/section"

/** A heading on one side and a few paragraphs of story on the other. */
export function StorySection({
  title,
  children,
}: {
  title: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Section tone="alt">
      <Container className="flex flex-wrap gap-16">
        <div className="flex-[1_1_320px]">
          <Heading>{title}</Heading>
        </div>
        <Prose className="flex-[2_1_480px]">{children}</Prose>
      </Container>
    </Section>
  )
}

/** One photo card per person, with their role. */
export function TeamGrid({
  people,
}: {
  people: { name: string; role: string }[]
}) {
  return (
    <AutoGrid min="200px" gap="tight">
      {people.map((person) => (
        <div key={person.name} className="flex flex-col gap-3">
          <Placeholder label="Photo" ratio="1" />
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{person.name}</span>
            <span className="text-caption text-muted-foreground">
              {person.role}
            </span>
          </div>
        </div>
      ))}
    </AutoGrid>
  )
}

/** The hiring note at the end of the about page. */
export function CareersCallout() {
  return (
    <Section id="careers" className="scroll-mt-20">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-8 rounded-xl bg-surface p-12 max-sm:p-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-title">Work with us</h2>
            <p className="text-muted-foreground">
              We’re a small team of streamers, mods and engineers.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary" })}
            >
              Contact us
            </Link>
            <Link href="/contact" className={buttonVariants()}>
              See open roles
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
