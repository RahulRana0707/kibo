import Link from "next/link"

import { Avatar } from "@kibo/ui/components/avatar"
import { Badge } from "@kibo/ui/components/badge"
import { Panel } from "@kibo/ui/components/panel"
import { Eyebrow, Heading } from "@kibo/ui/components/typography"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { PlatformIcon, platforms } from "@/components/atoms/platform-icon"
import { Stat } from "@/components/atoms/stat"
import {
  ChartAxis,
  ChartLegend,
  LineChart,
} from "@/components/molecules/charts"
import { ListRow } from "@/components/molecules/list-row"
import {
  activityTrend,
  moodTrend,
  type StreamSummary,
} from "@/lib/marketing/sample-summary"

/** Who shared the summary, and that Kibo made it. */
export function SummaryCreatorBar({ summary }: { summary: StreamSummary }) {
  return (
    <>
      <span className="flex items-center gap-3">
        <Avatar
          name={summary.creator.initials}
          initials={summary.creator.initials}
        />
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
    </>
  )
}

/** The stream title with its date, platforms and game. */
export function SummaryTitle({ summary }: { summary: StreamSummary }) {
  return (
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
  )
}

/** The headline numbers in one panel. */
export function SummaryStats({ summary }: { summary: StreamSummary }) {
  return (
    <Panel>
      <AutoGrid min="150px" gap="tight">
        {summary.stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </AutoGrid>
    </Panel>
  )
}

/** Mood against chat activity across the stream. */
export function SummaryChatChart({ summary }: { summary: StreamSummary }) {
  return (
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
  )
}

/** Timestamped moments, with clip-worthy ones marked. */
export function SummaryHighlights({ summary }: { summary: StreamSummary }) {
  return (
    <Panel className="gap-3">
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
  )
}

/** What chat asked most, with counts. */
export function SummaryTopQuestions({ summary }: { summary: StreamSummary }) {
  return (
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
  )
}

/** The sponsor’s mentions and link clicks during the stream. */
export function SummarySponsor({ summary }: { summary: StreamSummary }) {
  return (
    <Panel className="gap-3">
      <h2 className="text-heading">Sponsor</h2>
      <div className="flex justify-between gap-3">
        <span className="font-medium">{summary.sponsor.name}</span>
        <span className="text-caption text-muted-foreground">
          Code {summary.sponsor.code}
        </span>
      </div>
      <AutoGrid min="100px" gap="tight">
        <Stat label="Mentions" value={summary.sponsor.mentions} size="sm" />
        <Stat label="Link clicks" value={summary.sponsor.clicks} size="sm" />
      </AutoGrid>
    </Panel>
  )
}
