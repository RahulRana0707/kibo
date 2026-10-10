import type { Metadata } from "next"
import Link from "next/link"

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
  SummaryPreview,
  TimeSavedChart,
} from "@/components/organisms/previews/analytics"

export const metadata: Metadata = {
  title: "Summaries & analytics",
  description:
    "End your stream and Kibo has the summary ready: what people asked, when chat popped off, who was new and how much time you got back.",
}

const parts = [
  {
    title: "Top questions",
    body: "What your audience wants to know, ranked — with what Kibo answered.",
  },
  {
    title: "Highlights timeline",
    body: "Chat spikes, raids and big moments with timestamps you can jump to in the VOD.",
  },
  {
    title: "Clip-worthy moments",
    body: "When chat explodes with “CLIP IT”, Kibo marks the moment for your editor.",
  },
  {
    title: "Unanswered questions",
    body: "Everything Kibo didn’t know, ready to answer once and save as an FAQ.",
  },
]

export default function AnalyticsPage() {
  return (
    <>
      <PageHero
        layout="stacked"
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "Summaries & Analytics" },
        ]}
        title="The recap you never had time to write"
        lede="End your stream and Kibo has the summary ready: what people asked, when chat popped off, who was new and how much time you got back."
        actions={
          <>
            <TrialLink />
            <Link
              href="/share/sample"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              See a sample summary
            </Link>
          </>
        }
        visual={<SummaryPreview />}
      />
      <Section tone="alt">
        <Container>
          <AutoGrid min="260px">
            {parts.map((item) => (
              <FeatureItem key={item.title} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <SectionHeading
            eyebrow="Analytics"
            title="See your community grow"
            lede="Questions answered, response rate, time saved, chat activity, moderation, new and returning chatters — by date range and platform."
          />
        }
        visual={<TimeSavedChart />}
      />
      <Section tone="alt">
        <Container>
          <SectionHeading
            className="max-w-[900px]"
            eyebrow="For sponsors"
            title="Share a summary, not a screenshot"
            lede="Send sponsors a read-only link with mentions, link clicks and audience numbers. Hide anything you don’t want to share."
          />
        </Container>
      </Section>
      <CtaBanner title="Get your first summary tonight" />
    </>
  )
}
