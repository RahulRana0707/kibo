import { BotIcon } from "lucide-react"
import { botTemplates } from "@kibo/contracts"

import { Button } from "@kibo/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { Panel } from "@kibo/ui/components/panel"
import { SoonLabel } from "@kibo/ui/components/soon-label"

import { AutoGrid } from "@/components/atoms/auto-grid"

/** Shown before the first bot: what a bot is, and where to start. */
export function BotsEmpty() {
  return (
    <>
      <Panel className="py-12">
        <Empty className="p-0">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BotIcon />
            </EmptyMedia>
            <EmptyTitle>Create your first bot</EmptyTitle>
            <EmptyDescription className="max-w-[40ch]">
              A bot is the voice that answers and moderates your chat. Start
              from a template for your kind of stream, or from scratch.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary" soon aria-describedby="bots-empty-soon">
                Browse templates
              </Button>
              <Button soon aria-describedby="bots-empty-soon">
                Create bot
              </Button>
            </div>
            <span id="bots-empty-soon" className="text-caption text-muted-foreground">
              Coming soon
            </span>
          </EmptyContent>
        </Empty>
      </Panel>
      <AutoGrid min="160px" gap="tight">
        {botTemplates.slice(0, 3).map((template) => (
          <Panel key={template.key} className="gap-1.5 p-4">
            <span className="flex items-center justify-between gap-2 font-semibold">
              {template.title}
              <SoonLabel />
            </span>
            <span className="text-caption text-muted-foreground">
              {template.summary}
            </span>
          </Panel>
        ))}
      </AutoGrid>
    </>
  )
}
