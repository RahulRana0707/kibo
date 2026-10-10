import type { Metadata } from "next"
import Link from "next/link"
import { BookIcon, CheckIcon, ListIcon, ShieldIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"

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
  AnswerFlow,
  PersonalityChips,
  ReplyModes,
  VoiceComparison,
} from "@/components/organisms/previews/answers"

export const metadata: Metadata = {
  title: "AI Answers",
  description:
    "Kibo answers viewer questions from what you’ve taught it, in your voice, with the source attached.",
}

const trust = [
  {
    icon: <BookIcon />,
    title: "Only your knowledge",
    body: "Kibo answers from FAQs, links, gear, schedule and sponsors you added — not from the open internet.",
  },
  {
    icon: <CheckIcon />,
    title: "Confidence threshold",
    body: "Below your threshold it stays silent, or sends the question to your inbox instead of guessing.",
  },
  {
    icon: <ListIcon />,
    title: "Answers repeats once",
    body: "Ten people ask the same thing in a minute? One reply that tags them all, not ten.",
  },
  {
    icon: <ShieldIcon />,
    title: "Hard to trick",
    body: "Viewers who try “ignore your instructions” get ignored. Blocked topics stay blocked.",
  },
]

const related = [
  {
    href: "/product/knowledge-base",
    title: "Knowledge Base",
    body: "What Kibo answers from",
  },
  {
    href: "/product/live-console",
    title: "Live Console",
    body: "Approve replies in real time",
  },
  {
    href: "/product/analytics",
    title: "Summaries & Analytics",
    body: "See questions answered and time saved",
  },
]

export default function AiAnswersPage() {
  return (
    <>
      <PageHero
        layout="stacked"
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "AI Answers" },
        ]}
        title="Answers viewers instantly, in your voice"
        lede="Kibo reads every question in chat, finds the answer in what you’ve taught it and replies like you would — with the source attached, so you always know why."
        actions={
          <>
            <TrialLink />
            <Link
              href="/help"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              Read the guide
            </Link>
          </>
        }
        visual={<AnswerFlow />}
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading title="Built to be trusted with your chat" />
          <AutoGrid min="260px">
            {trust.map((item) => (
              <FeatureItem key={item.title} icon={item.icon} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <>
            <SectionHeading
              eyebrow="Personality"
              title="Sounds like your channel, not a help desk"
              lede="Pick Friendly, Hype, Chill, Sarcastic or Professional, then add your own voice notes. Preview replies before you go live."
            />
            <PersonalityChips />
          </>
        }
        visual={<VoiceComparison />}
      />
      <FeatureSplit
        tone="alt"
        reverse
        copy={
          <SectionHeading
            eyebrow="Reply modes"
            title="Go at the pace you trust"
            lede="Start in Approval and okay each reply with one click. Move to Auto when you’re ready. Silent mode just watches and learns."
          />
        }
        visual={<ReplyModes />}
      />
      <Section>
        <Container className="flex flex-col gap-6">
          <h2 className="text-title">Works with</h2>
          <AutoGrid min="260px" gap="tight">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col gap-2 rounded-xl border border-transparent bg-raised p-5 text-foreground no-underline shadow-border transition-shadow duration-150 hover:shadow-border-hover"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="text-caption text-muted-foreground">
                  {item.body}
                </span>
              </Link>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <CtaBanner flush title="Let Kibo take the next “what’s your sens?”" />
    </>
  )
}
