import type { Metadata } from "next"
import Link from "next/link"

import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@kibo/ui/components/panel"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { Section } from "@/components/atoms/section"
import { Code } from "@kibo/ui/components/typography"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { DetailList } from "@/components/molecules/detail-list"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { PullQuote } from "@/components/molecules/testimonial"
import { TrialLink } from "@/components/molecules/trial-link"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import { UseCaseNav } from "@/components/organisms/use-case-nav"

export const metadata: Metadata = {
  title: "Kibo for gaming streamers",
  description:
    "Kibo answers settings, rank and schedule questions, handles backseaters and spam, and marks your best plays for clips.",
}

export default function GamingUseCasePage() {
  return (
    <>
      <UseCaseNav current="/use-cases/gaming" />
      <PageHero
        eyebrow="Use case · Gaming"
        title="Stay locked in. Kibo has chat."
        lede="Ranked doesn’t pause for “what’s your rank?”. Kibo answers settings, rank and schedule questions, handles backseaters and spam, and marks your best plays for clips."
        actions={
          <>
            <TrialLink />
            <Link
              href="/product/ai-answers"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              See the Gaming template
            </Link>
          </>
        }
        visual={
          <Panel>
            <ChatFeed>
              <ChatMessage
                author="kvn.exe"
                platform="twitch"
                tag={<MessageTag tone="question">Question</MessageTag>}
              >
                what rank r u rn
              </ChatMessage>
              <ChatMessage author="Pip" bot source="Live · Riot rank lookup">
                @kvn.exe Ascendant 3, 62 RR — Immortal push is on.
              </ChatMessage>
              <ChatMessage
                author="shadowfax_tv"
                platform="youtube"
                tag={<MessageTag>Backseat</MessageTag>}
              >
                go B go B go B
              </ChatMessage>
              <ChatMessage author="Pip" bot source="Rule · No backseating">
                @shadowfax_tv friendly reminder: no backseating in ranked. Mira
                will ask if she wants calls!
              </ChatMessage>
            </ChatFeed>
          </Panel>
        }
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading title="What gaming streamers set up first" />
          <AutoGrid min="260px">
            <FeatureItem boxed title="Settings & gear FAQs">
              Sens, DPI, crosshair code, keybinds, PC specs and peripherals.
            </FeatureItem>
            <div className="flex min-w-0 flex-col gap-2 rounded-xl border border-transparent bg-raised p-6 shadow-border max-sm:p-4">
              <span className="mb-1 flex gap-2">
                <PlatformIcon platform="riot" size="lg" label="Riot Games" />
                <PlatformIcon platform="steam" size="lg" label="Steam" />
                <PlatformIcon platform="igdb" size="lg" label="IGDB" />
              </span>
              <h3 className="text-heading">Rank lookups</h3>
              <p className="text-body-sm text-muted-foreground">
                Live rank and recent matches from Riot, with Steam and IGDB for
                game info.
              </p>
            </div>
            <FeatureItem boxed title="Backseat rule">
              A friendly reminder first, then timeouts for repeat offenders.
            </FeatureItem>
            <FeatureItem boxed title="Viewer queue">
              <Code>!join</Code> for customs and community nights, with a fair
              rotation.
            </FeatureItem>
            <FeatureItem boxed title="Predictions">
              “Will Mira clutch this round?” with live results on stream.
            </FeatureItem>
            <FeatureItem boxed title="Clip moments">
              Chat spikes after aces get marked in your stream summary.
            </FeatureItem>
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <SectionHeading
            eyebrow="Example setup"
            title="How Mira runs Pip on ranked nights"
            lede="Hype personality, Auto replies above 85% confidence, toxicity on Strict, raid protection on, and the giveaway timer every 20 minutes when chat is active."
          />
        }
        visual={
          <Panel>
            <DetailList
              emphasize
              items={[
                { term: "Personality", value: "Hype" },
                { term: "Reply mode", value: "Auto · 85% threshold" },
                { term: "Toxicity", value: "Strict" },
                { term: "Knowledge", value: "64 items · 3 sources" },
                {
                  term: "Commands",
                  value: <Code>!rank !setup !crosshair !join</Code>,
                },
              ]}
            />
          </Panel>
        }
      />
      {/* Placeholder testimonial from the design. Replace before launch. */}
      <Section tone="alt">
        <Container className="max-w-[820px]">
          <PullQuote
            quote="Ranked is where I need my brain the most. Pip handles chat so I can actually play."
            person={{
              name: "Aarav “Zephyr” Mehta",
              initials: "AM",
              detail: "48K followers · Valorant",
              platforms: ["twitch"],
            }}
          />
        </Container>
      </Section>
      <CtaBanner title="Set up Kibo for your game" />
    </>
  )
}
