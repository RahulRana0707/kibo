import type { Metadata } from "next"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import {
  CareersCallout,
  StorySection,
  TeamGrid,
} from "@/components/organisms/marketing/about"
import { MarketingSection } from "@/components/organisms/marketing/marketing-section"

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
            wide
            eyebrow="About"
            title="Help creators focus on creating"
            lede="Kibo exists because the best part of streaming — the people who show up — is also the part that gets buried first. We build the teammate that keeps your community looked after, so you can get back to the thing they came for."
          />
        </Container>
      </Section>

      <StorySection title="Why we started">
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
      </StorySection>

      <MarketingSection title="What we believe">
        <AutoGrid min="260px">
          {beliefs.map((item) => (
            <FeatureItem key={item.title} title={item.title}>
              {item.body}
            </FeatureItem>
          ))}
        </AutoGrid>
      </MarketingSection>

      <MarketingSection tone="alt" gap="tight" title="The team">
        <TeamGrid people={team} />
      </MarketingSection>

      <CareersCallout />
    </>
  )
}
