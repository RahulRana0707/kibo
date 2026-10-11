import type { Metadata } from "next"
import { FileTextIcon, GlobeIcon } from "lucide-react"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Panel } from "@kibo/ui/components/panel"
import {
  GlyphTile,
  PlatformIcon,
  type Platform,
} from "@/components/atoms/platform-icon"
import { Section } from "@/components/atoms/section"
import { FeatureItem } from "@/components/molecules/feature"
import { SectionHeading } from "@/components/molecules/section-heading"
import { TrialLink } from "@/components/molecules/trial-link"
import { CtaBanner } from "@/components/organisms/marketing/cta-banner"
import { FeatureSplit } from "@/components/organisms/marketing/feature-split"
import { PageHero } from "@/components/organisms/marketing/page-hero"
import {
  KnowledgeList,
  UnansweredCard,
} from "@/components/organisms/marketing/previews/knowledge"

export const metadata: Metadata = {
  title: "Knowledge Base",
  description:
    "Everything your bot knows lives in one place: FAQs, links, rules, gear, schedule, sponsors and documents.",
}

const sources: {
  label: string
  platform?: Platform
  glyph?: React.ReactNode
}[] = [
  { label: "YouTube About & descriptions", platform: "youtube" },
  { label: "Your website", glyph: <GlobeIcon /> },
  { label: "Linktree", platform: "linktree" },
  { label: "Notion", platform: "notion" },
  { label: "Google Drive", platform: "google-drive" },
  { label: "Past stream transcripts", platform: "youtube" },
  { label: "CSV of FAQs", glyph: <FileTextIcon /> },
]

const tools = [
  {
    title: "Ask-a-question tester",
    body: "Type any question and see exactly which item matched and what Kibo would say.",
  },
  {
    title: "Suggested FAQs",
    body: "When you or a mod answers something by hand, Kibo suggests saving it.",
  },
  {
    title: "Knowledge health",
    body: "Flags gaps, conflicting answers and items that look out of date.",
  },
]

export default function KnowledgeBasePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Product", href: "/product" },
          { label: "Knowledge Base" },
        ]}
        title="Teach Kibo once. It remembers every stream."
        lede="Everything your bot knows lives in one place — FAQs, links, rules, gear, schedule, sponsors and documents. Import it from where it already is."
        actions={<TrialLink />}
        visual={<KnowledgeList />}
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            title="Bring what you already have"
            lede="Kibo imports from your channel and tools, then shows you what it learned before using it."
          />
          <AutoGrid as="ul" min="200px" gap="tight">
            {sources.map((source) => (
              <li key={source.label}>
                <Panel className="h-full flex-row items-center gap-3">
                  {source.platform ? (
                    <PlatformIcon platform={source.platform} size="lg" />
                  ) : (
                    <GlyphTile>{source.glyph}</GlyphTile>
                  )}
                  <span className="font-medium">{source.label}</span>
                </Panel>
              </li>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <FeatureSplit
        copy={
          <SectionHeading
            eyebrow="Unanswered questions"
            title="Your knowledge grows from your chat"
            lede="Questions Kibo couldn’t answer are grouped by meaning and ranked by how often they were asked. Answer once, save as an FAQ, done."
          />
        }
        visual={<UnansweredCard />}
      />
      <Section tone="alt">
        <Container>
          <AutoGrid min="300px">
            {tools.map((item) => (
              <FeatureItem key={item.title} title={item.title}>
                {item.body}
              </FeatureItem>
            ))}
          </AutoGrid>
        </Container>
      </Section>
      <CtaBanner title="Start with what’s already on your channel" />
    </>
  )
}
