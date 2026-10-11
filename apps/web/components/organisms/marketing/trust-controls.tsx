import { PauseIcon } from "lucide-react"

import { Panel } from "@kibo/ui/components/panel"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { DemoButton } from "@/components/atoms/demo-button"
import { Confidence, SourceChip } from "@/components/atoms/source-chip"
import { StatusPill } from "@/components/atoms/status-pill"

function Control({
  title,
  body,
  demo,
}: {
  title: string
  body: string
  demo: React.ReactNode
}) {
  return (
    <Panel>
      <h3 className="text-heading">{title}</h3>
      <p className="text-body-sm text-muted-foreground">{body}</p>
      <Panel
        variant="well"
        className="flex-row flex-wrap items-center justify-between gap-3"
      >
        {demo}
      </Panel>
    </Panel>
  )
}

/** Approval mode, the kill switch and “why it said this”, each with a demo. */
export function TrustControls() {
  return (
    <AutoGrid min="320px">
      <Control
        title="Approval mode"
        body="Kibo drafts, you approve. Every reply waits for a click until you switch it to Auto."
        demo={
          <>
            <span className="text-caption">“@GG_Rohan 0.32 at 800 DPI…”</span>
            <span className="flex gap-2">
              <DemoButton variant="ghost">Reject</DemoButton>
              <DemoButton variant="primary">Approve</DemoButton>
            </span>
          </>
        }
      />
      <Control
        title="Kill switch"
        body="Pause the bot instantly from any screen — or your phone — mid-stream."
        demo={
          <>
            <StatusPill tone="live">Live</StatusPill>
            <DemoButton>
              <PauseIcon />
              Pause bot
            </DemoButton>
          </>
        }
      />
      <Control
        title="Why it said this"
        body="Every reply shows the knowledge it used and how sure it was. Unsure? It stays quiet and asks you."
        demo={
          <span className="flex flex-wrap items-center gap-3">
            <SourceChip>FAQ · Valorant settings</SourceChip>
            <Confidence value={94} suffix="sure" />
          </span>
        }
      />
    </AutoGrid>
  )
}
