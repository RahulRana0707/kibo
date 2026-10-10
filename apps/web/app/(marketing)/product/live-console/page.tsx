import type { Metadata } from "next"
import { CheckIcon, ListIcon, TriangleAlertIcon, ZapIcon } from "lucide-react"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Section } from "@/components/atoms/section"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { TrialLink } from "@/components/molecules/trial-link"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import {
  ConsoleMock,
  PhoneConsole,
} from "@/components/organisms/previews/console"

export const metadata: Metadata = {
  title: "Live Console",
  description:
    "Every platform’s chat in one feed, Kibo’s replies with their sources, approvals and quick actions.",
}

const points = [
  {
    icon: <ListIcon />,
    title: "One feed, every platform",
    body: "Each message tagged with its platform and type: Question, Spam, Toxic, Command or Chatter.",
  },
  {
    icon: <CheckIcon />,
    title: "Approve in one click",
    body: "Drafted replies queue on the right. Approve, edit or reject — or let a mod do it from their phone.",
  },
  {
    icon: <ZapIcon />,
    title: "Quick actions",
    body: "Pause bot, slow mode, followers-only, emote-only, clear chat, announcements. Keyboard shortcuts for all of them.",
  },
  {
    icon: <TriangleAlertIcon />,
    title: "Alerts that matter",
    body: "Raids, floods, toxicity spikes and expired tokens surface at the top — never buried in chat.",
  },
]

export default function LiveConsolePage() {
  return (
    <>
      <PageHero
        layout="centered"
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "Live Console" },
        ]}
        title="Your stream’s control room"
        lede="Every platform’s chat in one feed, Kibo’s replies with their sources, approvals and quick actions — built to be read in a two-second glance between plays."
        actions={<TrialLink />}
        visual={<ConsoleMock />}
      />
      <Section tone="alt">
        <Container>
          <AutoGrid min="260px">
            {points.map((item) => (
              <FeatureItem key={item.title} icon={item.icon} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <SectionHeading
            eyebrow="For moderators"
            title="Works in a phone browser too"
            lede="Mods open the same console on their phone — no app to install. Approvals, the moderation queue and the pause button are one thumb away."
          />
        }
        visual={<PhoneConsole />}
      />
      <CtaBanner flush title="Run your next stream from one screen" />
    </>
  )
}
