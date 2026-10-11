import type { Metadata } from "next"
import Link from "next/link"
import { UsersIcon } from "lucide-react"

import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { IconTile } from "@/components/atoms/icon-tile"
import { Panel } from "@kibo/ui/components/panel"
import { Section } from "@/components/atoms/section"
import { Heading } from "@kibo/ui/components/typography"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { ComparisonTable } from "@/components/organisms/marketing/comparison-table"
import { FaqList, type Faq } from "@/components/organisms/marketing/faq-list"
import { PricingPlans } from "@/components/organisms/marketing/pricing-plans"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Every plan starts with a 14-day free trial. Upgrade, downgrade or cancel whenever you like.",
}

const limits = [
  {
    title: "AI replies",
    body: "Each answer Kibo posts or drafts counts once. Moderation actions, commands and timers are free.",
  },
  {
    title: "Knowledge items",
    body: "One FAQ, link, rule, note or document is one item. Turned-off items still count.",
  },
  {
    title: "Bots",
    body: "Archived bots don’t count. Use separate bots for different shows or languages.",
  },
  {
    title: "Hit a limit live?",
    body: "Your stream finishes normally. You get a heads-up and a one-click upgrade afterwards.",
  },
]

const faqs: Faq[] = [
  {
    question: "What happens when my trial ends?",
    answer:
      "You pick a plan, or your bots pause. Your knowledge, settings and history stay for 30 days.",
  },
  {
    question: "Can I switch between monthly and yearly?",
    answer:
      "Yes. Switching to yearly applies straight away with the unused part of your month credited. Switching to monthly starts when your year ends.",
  },
  {
    question: "Do moderators need their own plan?",
    answer:
      "No. Moderators join your workspace as seats on your plan: 2 on Starter, 5 on Creator and unlimited on Studio.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "All major credit and debit cards. Studio plans can also pay by invoice.",
  },
]

export default function PricingPage() {
  return (
    <>
      <PricingPlans
        heading={
          <SectionHeading
            as="h1"
            size="hero"
            align="center"
            eyebrow="Pricing"
            title="Pick the plan your chat needs"
            lede="Every plan starts with a 14-day free trial. Upgrade, downgrade or cancel whenever you like."
          />
        }
      />

      <Section tone="alt">
        <Container className="flex flex-col gap-8">
          <Heading>Compare every feature</Heading>
          <ComparisonTable />
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            title="How usage limits work"
            lede="Limits reset on your billing date. Kibo warns you at 80% and never cuts you off mid-stream."
          />
          <AutoGrid>
            {limits.map((item) => (
              <FeatureItem key={item.title} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>

      <Section tone="alt">
        <Container className="flex flex-wrap gap-12">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
            <Heading>Pricing questions</Heading>
            <FaqList items={faqs} />
          </div>
          <Panel className="flex-[1_1_320px] self-start">
            <IconTile tone="neutral">
              <UsersIcon />
            </IconTile>
            <h2 className="text-heading">Agencies and large networks</h2>
            <p className="text-body-sm text-muted-foreground">
              Managing ten or more creators? Studio for Agencies starts at{" "}
              <span className="font-semibold text-foreground">
                $49 per creator a month
              </span>
              , with a shared ban list across your roster and an onboarding
              call.
            </p>
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary" })}
            >
              Contact sales
            </Link>
          </Panel>
        </Container>
      </Section>
    </>
  )
}
