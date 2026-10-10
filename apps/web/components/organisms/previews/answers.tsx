import { Badge } from "@kibo/ui/components/badge"

import { Chip } from "@/components/atoms/chip"
import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@/components/atoms/panel"
import { Eyebrow } from "@/components/atoms/typography"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { ListRow } from "@/components/molecules/list-row"

/** A question and Kibo's sourced answer. */
export function AnswerSnippet() {
  return (
    <Panel>
      <ChatFeed>
        <ChatMessage
          author="aurora_fps"
          platform="youtube"
          tag={<MessageTag tone="question">Question</MessageTag>}
        >
          what mic is that
        </ChatMessage>
        <ChatMessage
          author="Pip"
          bot
          source="Gear · Microphone"
          confidence={97}
        >
          @aurora_fps Glyph Audio SM-1 on a boom arm. All gear: !gear
        </ChatMessage>
      </ChatFeed>
    </Panel>
  )
}

/** Viewer asks → Kibo looks up → Kibo replies, in three columns. */
export function AnswerFlow() {
  return (
    <Panel className="gap-0 overflow-hidden p-0 max-sm:p-0">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] [&>*]:border-separator [&>*:not(:last-child)]:border-e">
        <div className="flex flex-col gap-3 p-6">
          <Eyebrow>Viewer asks</Eyebrow>
          <ChatMessage
            author="pixelpatch"
            platform="twitch"
            tag={<MessageTag tone="question">Question</MessageTag>}
            className="p-0"
          >
            is the giveaway still on? how do i enter
          </ChatMessage>
        </div>
        <div className="flex flex-col gap-3 p-6">
          <Eyebrow>Kibo looks up</Eyebrow>
          <Panel variant="well">
            <span className="flex items-center gap-2">
              <Badge>Sponsor</Badge>
              <span className="font-medium">Glyph Audio giveaway</span>
            </span>
            <span className="text-caption text-muted-foreground">
              Ends Oct 12 · type !enter · 18+ · India only
            </span>
          </Panel>
          <span className="text-caption text-muted-foreground">
            Live context: stream title mentions “GIVEAWAY”
          </span>
        </div>
        <div className="flex flex-col gap-3 p-6">
          <Eyebrow>Kibo replies</Eyebrow>
          <ChatMessage
            author="Pip"
            bot
            source="Sponsor · Glyph Audio"
            confidence={95}
          >
            @pixelpatch Yep! Type !enter before Oct 12. Open to 18+ viewers in
            India. Good luck!
          </ChatMessage>
        </div>
      </div>
    </Panel>
  )
}

const voices = [
  {
    name: "Friendly",
    reply: "Tue, Thu and Sat at 7 PM IST — hope to see you there!",
  },
  {
    name: "Hype",
    reply:
      "TUE / THU / SAT, 7 PM IST. Lock it in, we’re hitting Immortal this week.",
    accent: true,
  },
  {
    name: "Chill",
    reply: "Tue, Thu, Sat around 7 PM IST. No rush, pull up whenever.",
  },
]

export const personalities = [
  "Friendly",
  "Hype",
  "Chill",
  "Sarcastic",
  "Professional",
]

export function PersonalityChips() {
  return (
    <div className="flex flex-wrap gap-2">
      {personalities.map((name) => (
        <Chip key={name} selected={name === "Hype"}>
          {name}
        </Chip>
      ))}
    </div>
  )
}

/** One question answered in three personalities. */
export function VoiceComparison() {
  return (
    <Panel>
      <p className="text-caption text-muted-foreground">
        “When do you stream?” in three voices
      </p>
      <div>
        {voices.map((voice) => (
          <ListRow
            key={voice.name}
            align="start"
            leading={
              <Badge
                variant={voice.accent ? "accent" : "default"}
                className="w-24"
              >
                {voice.name}
              </Badge>
            }
          >
            {voice.reply}
          </ListRow>
        ))}
      </div>
    </Panel>
  )
}

const modes = [
  { name: "Auto", detail: "Posts answers it’s sure about straight away." },
  {
    name: "Approval",
    detail: "Drafts each reply; you or a mod approves.",
    recommended: true,
  },
  { name: "Silent", detail: "Never posts. Logs what it would have said." },
]

/** The three reply modes, with Approval selected. */
export function ReplyModes() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      {modes.map((mode) => (
        <div
          key={mode.name}
          className={
            mode.recommended
              ? "flex items-start gap-3 rounded-lg bg-primary-subtle p-4 shadow-[inset_0_0_0_1px_var(--vi-accent-border)]"
              : "flex items-start gap-3 rounded-lg border border-transparent bg-raised p-4 shadow-border"
          }
        >
          <span
            className={
              mode.recommended
                ? "mt-0.5 size-[18px] shrink-0 rounded-full border-[5px] border-primary bg-raised"
                : "mt-0.5 size-[18px] shrink-0 rounded-full border border-border-strong bg-raised"
            }
          />
          <span className="flex flex-col gap-1">
            <span className="flex flex-wrap items-center gap-1.5 font-medium">
              {mode.name}
              {mode.recommended ? (
                <Badge variant="accent">Recommended to start</Badge>
              ) : null}
            </span>
            <span className="text-caption text-muted-foreground">
              {mode.detail}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
