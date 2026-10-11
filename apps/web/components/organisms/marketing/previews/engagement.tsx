import { AutoGrid } from "@/components/atoms/auto-grid"
import { Meter } from "@kibo/ui/components/meter"
import { Avatar } from "@kibo/ui/components/avatar"
import { Panel } from "@kibo/ui/components/panel"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { Stat } from "@/components/atoms/stat"
import { StatusPill } from "@/components/atoms/status-pill"
import { ListRow } from "@/components/molecules/list-row"

const poll = [
  { option: "Jett", value: 58 },
  { option: "Clove", value: 29 },
  { option: "Sova", value: 13 },
]

/** A running poll with results, for the product overview. */
export function PollSnippet() {
  return (
    <Panel>
      <p className="font-medium">Poll · Which agent next round?</p>
      <div className="flex flex-col gap-2">
        {poll.map((item) => (
          <div key={item.option} className="flex flex-col gap-2">
            <div className="flex justify-between text-caption">
              <span>{item.option}</span>
              <span className="tabular">{item.value}%</span>
            </div>
            <Meter value={item.value} />
          </div>
        ))}
      </div>
      <p className="text-caption text-muted-foreground">
        412 votes · 1:20 left
      </p>
    </Panel>
  )
}

const leaders = [
  { name: "tacocat_88", initials: "TC", points: "48,210" },
  { name: "aurora_fps", initials: "AF", points: "41,880" },
  { name: "GG_Rohan", initials: "GR", points: "39,005" },
]

/** An open giveaway and the loyalty leaderboard. */
export function GiveawayAndLeaderboard() {
  return (
    <div className="flex flex-col gap-4">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium">Giveaway · Glyph Audio SM-1</p>
          <StatusPill tone="live">Open</StatusPill>
        </div>
        <AutoGrid min="120px" gap="tight">
          <Stat label="Entries" value="1,284" />
          <Stat
            label="Keyword"
            value="!enter"
            size="sm"
            valueClassName="font-mono font-normal"
          />
          <Stat label="Closes in" value="04:12" />
        </AutoGrid>
      </Panel>
      <Panel>
        <p className="font-medium">Leaderboard · Pip Points</p>
        <ol>
          {leaders.map((leader, index) => (
            <li key={leader.name}>
              <ListRow
                leading={
                  <>
                    <span className="text-muted-foreground tabular">
                      {index + 1}
                    </span>
                    <Avatar name={leader.initials} initials={leader.initials} size="sm" />
                  </>
                }
                trailing={
                  <span className="font-medium tabular">{leader.points}</span>
                }
              >
                {leader.name}
              </ListRow>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  )
}

/** The go-live post Kibo sends to Discord. */
export function GoLivePost() {
  return (
    <Panel>
      <div className="flex items-center gap-2">
        <PlatformIcon platform="discord" label="Discord" />
        <span className="font-medium">#stream-alerts</span>
        <span className="text-caption text-muted-foreground">just now</span>
      </div>
      <p>
        Mira is live:{" "}
        <span className="font-medium">Ranked grind to Immortal — day 14</span>.
        Come hang → youtube.com/@miraplays
      </p>
    </Panel>
  )
}
