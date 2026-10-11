import { PauseIcon } from "lucide-react"

import { AutoGrid } from "@/components/atoms/auto-grid"
import { DemoButton } from "@/components/atoms/demo-button"
import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@kibo/ui/components/panel"
import { Stat } from "@/components/atoms/stat"
import { StatusPill } from "@/components/atoms/status-pill"
import { Eyebrow } from "@kibo/ui/components/typography"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"

/** Live numbers and quick actions, for the product overview. */
export function ConsoleSnippet() {
  return (
    <Panel>
      <AutoGrid min="120px" gap="tight">
        <Stat label="Messages / min" value="86" />
        <Stat label="Answered" value="142" />
        <Stat label="Pending" value="3" />
        <Stat
          label="Chat mood"
          value="Hyped"
          size="sm"
          valueClassName="text-success-text"
        />
      </AutoGrid>
      <div className="flex flex-wrap gap-2">
        <DemoButton>Slow mode</DemoButton>
        <DemoButton>Followers-only</DemoButton>
        <DemoButton>Send announcement</DemoButton>
      </div>
    </Panel>
  )
}

/** A dark mock of the live console: feed, approvals and live numbers. */
export function ConsoleMock() {
  return (
    <div className="dark grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4 rounded-xl border border-transparent bg-background p-4 text-foreground shadow-raised">
      <Panel className="p-3 max-sm:p-3 md:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex flex-wrap items-center gap-2">
            <StatusPill tone="live">Live</StatusPill>
            <span className="font-medium">
              Ranked grind to Immortal — day 14
            </span>
          </span>
          <span className="text-caption text-muted-foreground tabular">
            2:14:08
          </span>
        </div>
        <ChatFeed>
          <ChatMessage
            author="GG_Rohan"
            platform="twitch"
            tag={<MessageTag tone="question">Question</MessageTag>}
          >
            crosshair code pls
          </ChatMessage>
          <ChatMessage
            author="Pip"
            bot
            source="FAQ · Crosshair"
            confidence={99}
          >
            @GG_Rohan here you go: 0;P;c;5;o;1;d;1;z;3;0b;0;1b;0 — also in
            !crosshair
          </ChatMessage>
          <ChatMessage
            author="aurora_fps"
            platform="youtube"
            tag={<MessageTag>Chatter</MessageTag>}
          >
            that clutch was insane
          </ChatMessage>
        </ChatFeed>
      </Panel>
      <div className="flex flex-col gap-4">
        <Panel className="p-4 max-sm:p-4">
          <Eyebrow>Needs approval · 2</Eyebrow>
          <Panel variant="well">
            <p className="text-caption">
              @momo_draws Next giveaway is Saturday, keep an eye on !giveaway
            </p>
            <div className="flex flex-wrap gap-2">
              <DemoButton variant="ghost">Edit</DemoButton>
              <DemoButton variant="ghost">Reject</DemoButton>
              <DemoButton variant="primary">Approve</DemoButton>
            </div>
          </Panel>
        </Panel>
        <Panel className="p-4 max-sm:p-4">
          <AutoGrid min="100px" gap="tight">
            <Stat label="Msgs/min" value="86" />
            <Stat label="Answered" value="142" />
          </AutoGrid>
        </Panel>
      </div>
    </div>
  )
}

/** The console as a moderator sees it in a phone browser. */
export function PhoneConsole() {
  return (
    <Panel className="mx-auto w-full max-w-[340px] p-3 max-sm:p-3">
      <div className="flex items-center justify-between px-1 pt-1 pb-2">
        <span className="font-semibold">Kibo</span>
        <StatusPill tone="live">Live</StatusPill>
      </div>
      <Panel variant="well">
        <p className="text-caption font-medium">Review · held message</p>
        <p className="text-caption">saltyspud: “[hidden for review]”</p>
        <div className="flex flex-wrap gap-2">
          <DemoButton>Allow</DemoButton>
          <DemoButton>Timeout</DemoButton>
          <DemoButton variant="destructive">Ban user</DemoButton>
        </div>
      </Panel>
      <DemoButton size="lg" className="w-full">
        <PauseIcon />
        Pause bot
      </DemoButton>
    </Panel>
  )
}
