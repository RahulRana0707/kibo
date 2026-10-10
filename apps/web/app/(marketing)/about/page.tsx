import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Placeholder } from "@/components/atoms/placeholder"
import { Prose } from "@/components/atoms/prose"
import { Section } from "@/components/atoms/section"
import { Heading } from "@kibo/ui/components/typography"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"

export const metadata: Metadata = {
  title: "About",
  description: "Kibo helps creators focus on creating.",
}

const beliefs = [
  {
    title: "Trust before automation",
    body: "Show what Kibo did, why, and how to undo it. Every time.",
  },
  {
    title: "The creator’s voice",
    body: "Kibo sounds like your channel, or it stays quiet.",
  },
  {
    title: "Viewers are people",
    body: "Moderation is firm and fair. Bans are a human decision.",
  },
  {
    title: "Small creators first",
    body: "If it works for someone streaming to 12 people, it works for everyone.",
  },
]

// Placeholder team from the design. Replace with the real team and photos.
const team = [
  { name: "Ishaan Verma", role: "Co-founder · Product" },
  { name: "Neha Kulkarni", role: "Co-founder · AI engineering" },
  { name: "Marcus Lee", role: "Community lead · 6 years as a Twitch mod" },
  { name: "Ana Sousa", role: "Product designer" },
]

export default function AboutPage() {
  return (
    <>
      <Section>
        <Container className="max-w-[900px]">
          <SectionHeading
            as="h1"
            size="hero"
            className="max-w-none"
            eyebrow="About"
            title="Help creators focus on creating"
            lede="Kibo exists because the best part of streaming — the people who show up — is also the part that gets buried first. We build the teammate that keeps your community looked after, so you can get back to the thing they came for."
          />
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-wrap gap-16">
          <div className="flex-[1_1_320px]">
            <Heading>Why we started</Heading>
          </div>
          <Prose className="flex-[2_1_480px]">
            <p>
              Every streamer hits the same wall. Chat grows, the same questions
              repeat, and either you answer them and stop playing, or you don’t
              and new viewers feel ignored. Small creators can’t afford
              moderators. Big creators need a small army.
            </p>
            <p>
              Kibo started in 2025 as a weekend bot for a friend’s Valorant
              stream. He had 300 viewers, no mods, and spent half of every
              stream answering “what’s your sens?”. Within a month, eleven of
              his streamer friends were asking for the same bot — and every one
              of them wanted it to sound like them, not like a help desk.
            </p>
            <p>
              We think an AI community manager should earn trust the way a good
              mod does: by knowing the channel, saying only what it knows,
              showing its work, and stepping back the second you say so.
            </p>
          </Prose>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <Heading>What we believe</Heading>
          <AutoGrid min="260px">
            {beliefs.map((item) => (
              <FeatureItem key={item.title} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-col gap-8">
          <Heading>The team</Heading>
          <AutoGrid min="200px" gap="tight">
            {team.map((person) => (
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
        </Container>
      </Section>

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
    </>
  )
}
