import type { Metadata } from "next"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Chip } from "@kibo/ui/components/chip"
import { Container } from "@/components/atoms/container"
import { Panel } from "@kibo/ui/components/panel"
import { Section } from "@/components/atoms/section"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { TrialLink } from "@/components/molecules/trial-link"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import { ModerationLog } from "@/components/organisms/previews/moderation"

export const metadata: Metadata = {
  title: "Moderation",
  description:
    "Spam, scam links, slurs and floods handled by your rules, with one-click undo.",
}

const filters = [
  { title: "Spam & repeats", body: "Copy-paste walls and bot-like repeats." },
  {
    title: "Links",
    body: "Block every link except the domains you allow, like your Discord and merch store.",
  },
  { title: "Caps, emoji & symbols", body: "Set how loud is too loud." },
  {
    title: "AI toxicity",
    body: "Relaxed, Normal or Strict. Catches disguised spellings your word list misses.",
  },
  {
    title: "Banned words",
    body: "Your own list, including l33t-speak and spaced-out variants.",
  },
  {
    title: "Raids & floods",
    body: "Spikes trigger slow or followers-only mode automatically, then switch it off.",
  },
]

const ladder = [
  { step: "1 · Warn", on: true },
  { step: "2 · Delete", on: true },
  { step: "3 · Timeout 10m", on: true },
  { step: "4 · Ban (ask a human)", on: false },
]

const extras = [
  {
    title: "Review queue",
    body: "Borderline messages wait for you or a mod — approve, remove, timeout or ban, in bulk.",
  },
  {
    title: "One-click undo",
    body: "Every action is logged with the rule that fired. Wrong call? Undo restores the message and lifts the timeout.",
  },
  {
    title: "One ban list",
    body: "Ban someone on Twitch and they’re flagged on YouTube too, if you want.",
  },
]

export default function ModerationPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "Moderation" },
        ]}
        title="A moderator that never blinks"
        lede="Spam, scam links, slurs and floods get handled by your rules in under a second — and every action can be undone with one click."
        actions={<TrialLink />}
        visual={<ModerationLog />}
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Filters that know the difference"
            lede="Turn on what you need, tune what counts, and leave regulars alone."
          />
          <AutoGrid min="260px">
            {filters.map((item) => (
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
            eyebrow="Action ladder"
            title="Firm, but fair"
            lede="Each rule climbs a ladder you choose. First offence gets a warning; repeat offenders get a timeout. Bans are always yours to make."
          />
        }
        visual={
          <Panel>
            <p className="font-medium">Links outside allowed domains</p>
            <ol
              aria-label="Escalation steps"
              className="flex flex-wrap items-center gap-2"
            >
              {ladder.map((item, index) => (
                <li key={item.step} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-muted-foreground">
                      →
                    </span>
                  ) : null}
                  <Chip variant={item.on ? "selected" : "default"}>{item.step}</Chip>
                </li>
              ))}
            </ol>
            <p className="text-caption text-muted-foreground">
              Unsure cases go to the review queue instead of being actioned.
            </p>
          </Panel>
        }
      />
      <Section tone="alt">
        <Container>
          <AutoGrid min="300px">
            {extras.map((item) => (
              <FeatureItem key={item.title} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <CtaBanner title="Give your mods their evenings back" />
    </>
  )
}
