import { InboxIcon, SearchIcon, CircleCheckIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@kibo/ui/components/button"
import { Callout } from "@kibo/ui/components/callout"
import { ChipButton } from "@kibo/ui/components/chip"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@kibo/ui/components/empty"
import { FieldMessage } from "@kibo/ui/components/field"
import { Panel } from "@kibo/ui/components/panel"
import { Skeleton } from "@kibo/ui/components/skeleton"
import { SoonLabel } from "@kibo/ui/components/soon-label"
import { Spinner } from "@kibo/ui/components/spinner"

import { StatusPill, type StatusTone } from "@/components/atoms/status-pill"
import { BotStatus, PauseBotButton } from "@/components/molecules/bot-controls"
import { SocialSignIn } from "@/components/molecules/social-sign-in"
import { SystemBanner } from "@/components/organisms/app-shell/system-banner"

import { Board, Example, Group } from "../_components/showcase"

export const metadata = { title: "Patterns · Component library" }

export default function PatternsPage() {
  const live: { tone: StatusTone; note: string }[] = [
    { tone: "live", note: "Answering on 2 platforms" },
    { tone: "paused", note: "Paused at 9:58 PM" },
    { tone: "offline", note: "Next stream Tue 7 PM" },
    { tone: "error", note: "YouTube rejected replies" },
  ]

  return (
    <>
      <h1 className="text-display">Patterns</h1>
      <Board id="soon" layer="Patterns" title="Not available yet" description="One look on every host: aria-disabled (still focusable), text-disabled, a Soon label and one sentence saying why. Activating it does nothing. Locked by plan is a different pattern." importLine="Button soon · DropdownMenuItem soon · NavItem soonReason · ChipButton soon · SocialSignIn">
        <Group title="Hosts">
          <Example code="<Button soon>">
            <Button variant="secondary" soon aria-describedby="p-reason">
              Resume setup
            </Button>
          </Example>
          <Example code="<ChipButton soon>">
            <ChipButton soon>Kick</ChipButton>
          </Example>
          <Example code="nav item">
            <span aria-disabled="true" className="flex min-h-9 w-56 items-center gap-2.5 rounded-md px-2.5 text-body-sm font-medium text-disabled">
              <InboxIcon className="size-4" /> <span className="flex-1">Moderation</span> <SoonLabel />
            </span>
          </Example>
          <Example code="Pause bot">
            <BotStatus />
            <PauseBotButton soonReason="Pausing is coming soon." />
          </Example>
          <p id="p-reason" className="w-full text-caption text-muted-foreground">
            Setup opens soon. Your account is saved.
          </p>
        </Group>
        <Group title="Sign-in" className="w-96">
          <SocialSignIn />
        </Group>
      </Board>
      <Board id="loading" layer="Patterns" title="Loading" description="First load shows skeletons after 300ms; refreshes keep data and show an inline spinner; saving says “Saving…” then “Changes saved”. Live data never shows skeletons after first load." importLine="Skeleton · Spinner · Button loading · toast.promise">
        <Group title="Three cases" className="grid w-full grid-cols-3 gap-6 max-lg:grid-cols-1">
          <Panel aria-busy="true">
            <Skeleton variant="avatar-line" />
            <Skeleton variant="text" />
          </Panel>
          <Panel>
            <p className="flex items-center gap-2 text-caption text-muted-foreground">
              <Spinner /> Refreshing viewers…
            </p>
            <p>1,204 viewers</p>
          </Panel>
          <Panel>
            <Button loading>Saving…</Button>
            <p className="flex items-center gap-1.5 text-caption text-success-text">
              <CircleCheckIcon className="size-3.5" /> Changes saved
            </p>
          </Panel>
        </Group>
      </Board>
      <Board id="empty" layer="Patterns" title="Empty" description="First use teaches and offers the action; no results echoes the query; filtered to nothing lists the filters; cleared celebrates quietly. Never “Oops”, never “No data”." importLine="Empty · Button · FilterBar">
        <Group title="Four kinds" className="grid w-full grid-cols-4 gap-4 max-lg:grid-cols-2">
          <Panel>
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyMedia variant="icon"><InboxIcon /></EmptyMedia>
                <EmptyTitle>No knowledge yet</EmptyTitle>
                <EmptyDescription>Add the answers your chat asks every stream.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent><Button size="sm">Add an answer</Button></EmptyContent>
            </Empty>
          </Panel>
          <Panel>
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyMedia variant="neutral"><SearchIcon /></EmptyMedia>
                <EmptyTitle>No viewers match “raid”</EmptyTitle>
              </EmptyHeader>
              <EmptyContent><Button variant="ghost" size="sm">Clear search</Button></EmptyContent>
            </Empty>
          </Panel>
          <Panel>
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyTitle>Nothing matches these filters</EmptyTitle>
                <EmptyDescription>Platform: Twitch · Role: New</EmptyDescription>
              </EmptyHeader>
              <EmptyContent><Button variant="ghost" size="sm">Clear filters</Button></EmptyContent>
            </Empty>
          </Panel>
          <Panel>
            <Empty className="p-0">
              <EmptyHeader>
                <EmptyMedia variant="success"><CircleCheckIcon /></EmptyMedia>
                <EmptyTitle>Queue cleared</EmptyTitle>
                <EmptyDescription>Nothing is waiting for review.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          </Panel>
        </Group>
      </Board>
      <Board id="errors" layer="Patterns" title="Errors" description="What happened, what still works, the next step. Danger for blocked actions, warning for degraded. Every app error says whether the bot is affected." importLine="FieldMessage · Callout · Empty · ErrorTemplate · SystemBanner">
        <Group title="Scope ladder" className="w-full flex-col items-stretch">
          <FieldMessage error>Enter an email address like name@example.com.</FieldMessage>
          <Callout tone="danger" title="Fix 2 things to continue">Enter your name. Use at least 10 characters.</Callout>
          <Panel>
            <p className="flex items-center gap-3 text-body-sm">
              Unable to load recent streams. Your bot keeps running.
              <Button variant="secondary" size="xs"><RefreshCwIcon /> Try again</Button>
            </p>
          </Panel>
          <SystemBanner kind="maintenance" tone="warning">You’re offline. Changes save when you reconnect; Pip keeps running.</SystemBanner>
        </Group>
      </Board>
      <Board id="live" layer="Patterns" title="Live status everywhere" description="One status, the same word and tone in the top bar, sidebar, cards, tables and on phone. No pulse; all surfaces update together." importLine="StatusPill · BotStatus · AppTopbar · BotCard">
        <Group title="Default 28 in headers · sm 22 elsewhere">
          {live.map((item) => (
            <Example key={item.tone} code={item.note}>
              <StatusPill tone={item.tone} />
              <StatusPill tone={item.tone} size="sm" />
            </Example>
          ))}
        </Group>
      </Board>
    </>
  )
}
