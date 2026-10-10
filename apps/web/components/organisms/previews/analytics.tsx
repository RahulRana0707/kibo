import { AutoGrid } from "@/components/atoms/auto-grid"
import { DemoButton } from "@/components/atoms/demo-button"
import { Panel } from "@kibo/ui/components/panel"
import { Stat } from "@/components/atoms/stat"
import {
  BarChart,
  ChartAxis,
  ChartLegend,
  MoodChart,
} from "@/components/molecules/charts"

const streamBars = [30, 42, 38, 55, 61, 92, 70, 58, 64, 100, 76, 49]

/** A compact stream summary, for the product overview. */
export function SummarySnippet() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">Ranked grind — day 14</p>
        <span className="text-caption text-muted-foreground">3h 12m</span>
      </div>
      <BarChart values={streamBars} size="sm" />
      <AutoGrid min="120px" gap="tight">
        <Stat label="Time saved" value="2h 40m" />
        <Stat label="New chatters" value="37" />
      </AutoGrid>
    </Panel>
  )
}

/** The full summary card with numbers and the mood chart. */
export function SummaryPreview() {
  return (
    <Panel className="gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-heading">Ranked grind to Immortal — day 14</p>
          <p className="text-caption text-muted-foreground">
            Oct 9 · 3h 12m · YouTube + Twitch
          </p>
        </div>
        <span className="flex gap-2">
          <DemoButton>Export PDF</DemoButton>
          <DemoButton>Share</DemoButton>
        </span>
      </div>
      <AutoGrid min="150px" gap="tight">
        <Stat label="Time saved" value="2h 40m" />
        <Stat label="Questions answered" value="312" />
        <Stat label="Response rate" value="94%" />
        <Stat label="New chatters" value="37" />
        <Stat label="Mod actions" value="58" />
      </AutoGrid>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium">Chat mood</p>
          <ChartLegend
            items={[
              { label: "Positive", tone: "accent" },
              { label: "Messages / min", tone: "muted" },
            ]}
          />
        </div>
        <MoodChart label="Chat mood rises through the stream and peaks around 2 hours 10 minutes after the ace clutch" />
        <ChartAxis labels={["0:00", "0:48", "1:36", "2:24", "3:12"]} />
      </div>
    </Panel>
  )
}

/** Eight weeks of time saved. */
export function TimeSavedChart() {
  return (
    <Panel>
      <div className="flex items-center justify-between gap-3">
        <p className="font-medium">Time saved · last 8 weeks</p>
        <span className="text-caption font-medium text-success-text tabular">
          +31%
        </span>
      </div>
      <BarChart values={[38, 44, 41, 56, 62, 60, 78, 92]} />
      <ChartAxis labels={["Aug 18", "Oct 6"]} />
    </Panel>
  )
}
