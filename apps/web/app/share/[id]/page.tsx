import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Badge } from "@kibo/ui/components/badge"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { Container } from "@/components/atoms/container"
import { Avatar } from "@kibo/ui/components/avatar"
import { Panel } from "@kibo/ui/components/panel"
import { PlatformIcon, platforms } from "@/components/atoms/platform-icon"
import { Stat } from "@/components/atoms/stat"
import { Eyebrow, Heading } from "@kibo/ui/components/typography"
import {
  ChartAxis,
  ChartLegend,
  LineChart,
} from "@/components/molecules/charts"
import { ListRow } from "@/components/molecules/list-row"
import { sampleSummary, activityTrend, moodTrend } from "@/lib/marketing/sample-summary"

type Props = { params: Promise<{ id: string }> }

const summaries = { sample: sampleSummary }

export function generateStaticParams() {
  return Object.keys(summaries).map((id) => ({ id }))
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: "Stream summary",
  robots: { index: false },
}

export default async function SharedSummaryPage({ params }: Props) {
  const summary = summaries[(await params).id as keyof typeof summaries]

  if (!summary) {
    notFound()
  }

  return (
    <div className="min-h-svh bg-surface text-foreground">
      <header className="border-b border-separator bg-background">
        <Container className="flex min-h-16 max-w-[1040px] flex-wrap items-center justify-between gap-3 py-3">
          <span className="flex items-center gap-3">
            <Avatar name={summary.creator.initials} initials={summary.creator.initials} />
            <span className="flex flex-col">
              <span className="font-semibold">{summary.creator.name}</span>
              <span className="text-caption text-muted-foreground">
                {summary.creator.links}
              </span>
            </span>
          </span>
          <span className="text-caption text-muted-foreground">
            Read-only summary · Made with{" "}
            <Link href="/" className="font-semibold text-foreground">
              Kibo
            </Link>
          </span>
        </Container>
      </header>

      <main id="main">
        <Container className="flex max-w-[1040px] flex-col gap-8 pt-12 pb-24">
          <section className="flex flex-col gap-3">
            <Eyebrow>Stream summary</Eyebrow>
            <Heading as="h1">{summary.title}</Heading>
            <p className="flex flex-wrap items-center gap-3 text-muted-foreground">
              <span>{summary.when}</span>
              <span className="flex gap-1">
                {summary.platforms.map((platform) => (
                  <PlatformIcon
                    key={platform}
                    platform={platform}
                    label={platforms[platform]}
                  />
                ))}
              </span>
              <span>{summary.game}</span>
            </p>
          </section>

          <Panel>
            <AutoGrid min="150px" gap="tight">
              {summary.stats.map((stat) => (
                <Stat key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </AutoGrid>
          </Panel>

          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-heading">Chat over the stream</h2>
              <ChartLegend
                items={[
                  { label: "Positive mood", tone: "accent", line: true },
                  { label: "Messages / min", tone: "muted", line: true },
                ]}
              />
            </div>
            <LineChart
          summary="Chat activity and mood rise through the stream, peaking at 2:10 after the ace"
          points={moodTrend}
          compare={activityTrend}
          compareStyle="solid"
          compareLabel="Messages / min"
          area={false}
        />
            <ChartAxis labels={summary.axis} />
          </Panel>

          <div className="flex flex-wrap items-start gap-6">
            <Panel className="flex-[999_1_560px] gap-3">
              <h2 className="text-heading">Highlights</h2>
              <ol>
                {summary.highlights.map((item) => (
                  <li key={item.at}>
                    <ListRow
                      align="start"
                      className="gap-4 py-3.5"
                      leading={
                        <span className="w-16 shrink-0 pt-0.5 font-mono text-caption text-muted-foreground tabular">
                          {item.at}
                        </span>
                      }
                    >
                      <span className="flex flex-col gap-1">
                        <span className="flex flex-wrap items-center gap-2 font-medium">
                          {item.title}
                          {item.clip ? (
                            <Badge variant="accent">Clip-worthy</Badge>
                          ) : null}
                        </span>
                        <span className="text-caption text-muted-foreground">
                          {item.detail}
                        </span>
                      </span>
                    </ListRow>
                  </li>
                ))}
              </ol>
            </Panel>
            <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
              <Panel className="gap-3">
                <h2 className="text-heading">Top questions</h2>
                <ol>
                  {summary.topQuestions.map((item) => (
                    <li key={item.question}>
                      <ListRow
                        trailing={
                          <span className="text-muted-foreground tabular">
                            {item.count}×
                          </span>
                        }
                      >
                        {item.question}
                      </ListRow>
                    </li>
                  ))}
                </ol>
              </Panel>
              <Panel className="gap-3">
                <h2 className="text-heading">Sponsor</h2>
                <div className="flex justify-between gap-3">
                  <span className="font-medium">{summary.sponsor.name}</span>
                  <span className="text-caption text-muted-foreground">
                    Code {summary.sponsor.code}
                  </span>
                </div>
                <AutoGrid min="100px" gap="tight">
                  <Stat
                    label="Mentions"
                    value={summary.sponsor.mentions}
                    size="sm"
                  />
                  <Stat
                    label="Link clicks"
                    value={summary.sponsor.clicks}
                    size="sm"
                  />
                </AutoGrid>
              </Panel>
            </aside>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-3 pt-4 text-caption text-muted-foreground">
            <span>
              Shared by {summary.creator.name}. Viewer names and moderation
              details are hidden.
            </span>
            <Link href="/" className="text-link">
              Get summaries like this with Kibo
            </Link>
          </footer>
        </Container>
      </main>
    </div>
  )
}
