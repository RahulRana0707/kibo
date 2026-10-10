import type { Metadata } from "next"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { Code, Heading } from "@/components/atoms/typography"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { TrialLink } from "@/components/molecules/trial-link"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import {
  GiveawayAndLeaderboard,
  GoLivePost,
} from "@/components/organisms/previews/engagement"

export const metadata: Metadata = {
  title: "Engagement",
  description:
    "Welcomes, commands, timed reminders, polls, giveaways and loyalty points, run by the bot that answers questions.",
}

const tools = [
  {
    title: "Welcomes",
    body: <>A hello for every first-time chatter, in your bot’s voice.</>,
  },
  {
    title: "Commands",
    body: (
      <>
        <Code>!discord</Code>, <Code>!socials</Code>, <Code>!schedule</Code> —
        some written for you from your knowledge.
      </>
    ),
  },
  {
    title: "Timers",
    body: (
      <>
        Follow reminders and sponsor plugs that only post when chat is active.
      </>
    ),
  },
  {
    title: "Shout-outs & alerts",
    body: <>Raids, new members, Super Chats and milestones get a thank-you.</>,
  },
  {
    title: "Polls, predictions & trivia",
    body: <>Started from the console, results on stream via overlays.</>,
  },
  {
    title: "Giveaways",
    body: (
      <>Entry keyword, eligibility rules and a fair random draw with history.</>
    ),
  },
  {
    title: "Loyalty",
    body: <>Points, ranks and badges that reward your regulars.</>,
  },
  {
    title: "Viewer queue & songs",
    body: (
      <>
        <Code>!join</Code> to play with you; song requests through Spotify or
        YouTube.
      </>
    ),
  },
  {
    title: "Q&A mode",
    body: <>Collect and rank questions so you can answer the best ones live.</>,
  },
]

export default function EngagementPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "Engagement" },
        ]}
        title="Keep the room warm while you focus"
        lede="Welcomes, commands, timed reminders, polls, giveaways and loyalty points — run by the same bot that answers questions."
        actions={<TrialLink />}
        visual={<GiveawayAndLeaderboard />}
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <Heading>Everything in one bot</Heading>
          <AutoGrid min="260px">
            {tools.map((item) => (
              <FeatureItem key={item.title} boxed title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <SectionHeading
            eyebrow="Go-live announcements"
            title="Tell everyone you’re live, everywhere"
            lede="Kibo posts to Discord, X, Bluesky and Instagram the moment your stream starts, using a template you control."
          />
        }
        visual={<GoLivePost />}
      />
      <CtaBanner flush title="Make every viewer feel like a regular" />
    </>
  )
}
