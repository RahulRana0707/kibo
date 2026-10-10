import type { Metadata } from "next"
import Link from "next/link"

import { Badge } from "@kibo/ui/components/badge"
import { buttonVariants } from "@kibo/ui/components/button"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Avatar } from "@kibo/ui/components/avatar"
import { Panel } from "@kibo/ui/components/panel"
import { Section } from "@/components/atoms/section"
import { Stat } from "@/components/atoms/stat"
import { StatusPill } from "@/components/atoms/status-pill"
import { Eyebrow } from "@kibo/ui/components/typography"
import { FeatureItem } from "@/components/molecules/feature"
import { ListRow } from "@/components/molecules/list-row"
import { SectionHeading } from "@/components/molecules/section-heading"
import { PullQuote } from "@/components/molecules/testimonial"
import { CtaBanner } from "@/components/organisms/cta-banner"
import { FeatureSplit } from "@/components/organisms/feature-split"
import { PageHero } from "@/components/organisms/page-hero"
import { UseCaseNav } from "@/components/organisms/use-case-nav"

export const metadata: Metadata = {
  title: "Kibo for agencies",
  description:
    "Run community management across your whole roster, with workspaces, roles and sponsor reports.",
}

const roster = [
  {
    name: "Mira Okafor",
    initials: "MO",
    status: "live" as const,
    label: "Live",
  },
  {
    name: "Dev Kapoor",
    initials: "DK",
    status: "offline" as const,
    label: "Ready",
  },
  {
    name: "Lena Sato",
    initials: "LS",
    status: "reconnect" as const,
    label: "Needs reconnect",
  },
  {
    name: "The Bake Bros",
    initials: "TB",
    status: "offline" as const,
    label: "Ready",
  },
]

const capabilities = [
  {
    title: "Workspace switcher",
    body: "Every creator is a separate workspace with their own bots, knowledge and history.",
  },
  {
    title: "Roles that fit",
    body: "Owner, Admin, Moderator, Editor and Analyst — per workspace.",
  },
  {
    title: "Sponsor reports",
    body: "Mentions, link clicks and audience numbers in a shareable, branded report.",
  },
  {
    title: "Shared ban lists",
    body: "A known bad actor on one channel is flagged across your roster.",
  },
  { title: "Audit log", body: "Who changed which bot setting, and when." },
  { title: "API & webhooks", body: "Pipe summaries into your own dashboards." },
]

export default function AgenciesUseCasePage() {
  return (
    <>
      <UseCaseNav current="/use-cases/agencies" />
      <PageHero
        eyebrow="Use case · Agencies"
        title="One team, every creator’s chat"
        lede="Run community management across your whole roster. Switch between creators in a click, give each person the right access, and send sponsors reports they’ll actually read."
        actions={
          <>
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Talk to sales
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              See Studio plan
            </Link>
          </>
        }
        visual={
          <Panel className="p-3 max-sm:p-3">
            <Eyebrow className="px-2 pt-2 pb-1">
              Northbound Talent · 12 workspaces
            </Eyebrow>
            <div>
              {roster.map((creator) => (
                <ListRow
                  key={creator.name}
                  className="px-2"
                  leading={<Avatar name={creator.initials} initials={creator.initials} size="sm" />}
                  trailing={
                    <StatusPill tone={creator.status}>
                      {creator.label}
                    </StatusPill>
                  }
                >
                  <span className="font-medium">{creator.name}</span>
                </ListRow>
              ))}
            </div>
          </Panel>
        }
      />
      <Section tone="alt">
        <Container className="flex flex-col gap-12">
          <SectionHeading title="Built for running many channels" />
          <AutoGrid min="260px">
            {capabilities.map((item) => (
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
            eyebrow="Example"
            title="A sponsor report in one click"
            lede="Hydrafuel × Mira Okafor, September: 14 streams, 41 mentions, link clicks tracked through the bot’s replies."
          />
        }
        visual={
          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-medium">Hydrafuel · September</p>
              <Badge>Shared link</Badge>
            </div>
            <AutoGrid min="120px" gap="tight">
              <Stat label="Streams" value="14" />
              <Stat label="Mentions" value="41" />
              <Stat label="Link clicks" value="2,306" />
              <Stat label="Code uses" value="318" />
            </AutoGrid>
          </Panel>
        }
      />
      {/* Placeholder testimonial from the design. Replace before launch. */}
      <Section tone="alt">
        <Container className="max-w-[820px]">
          <PullQuote
            quote="We onboard a new creator in an afternoon instead of hiring another mod."
            person={{
              name: "Priya Shah, Head of Talent",
              initials: "PS",
              detail: "Northbound Talent · 12 creators",
            }}
          />
        </Container>
      </Section>
      <CtaBanner
        title="Bring Kibo to your roster"
        lede="From $49 per creator a month for 10+ creators, with onboarding help and a direct line to our team."
        action={{ label: "Talk to sales", href: "/contact" }}
      />
    </>
  )
}
