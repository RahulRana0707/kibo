import { Badge } from "@kibo/ui/components/badge"

import { MessageTag } from "@/components/atoms/message-tag"
import { PlatformIcon } from "@/components/atoms/platform-icon"
import { StatusPill } from "@/components/atoms/status-pill"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"

/** The live-chat window in the landing hero: welcome, answer and spam catch. */
export function HeroChatDemo() {
  return (
    <figure
      aria-label="Kibo answering live chat"
      className="flex min-w-0 flex-[1_1_460px] flex-col overflow-hidden rounded-xl border border-transparent bg-raised shadow-raised"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-separator px-[18px] py-3.5">
        <span className="flex flex-wrap items-center gap-2">
          <StatusPill tone="live">Live</StatusPill>
          <span className="text-body-sm font-medium">
            Ranked grind to Immortal — day 14
          </span>
        </span>
        <span className="flex gap-1">
          <PlatformIcon platform="youtube" label="YouTube" />
          <PlatformIcon platform="twitch" label="Twitch" />
        </span>
      </div>
      <ChatFeed className="p-3">
        <ChatMessage
          author="nyx.wav"
          platform="twitch"
          tag={<Badge className="h-5">First message</Badge>}
        >
          first time here, hi!!
        </ChatMessage>
        <ChatMessage
          author="Pip"
          bot
          tag={
            <span className="text-caption text-muted-foreground">Welcome</span>
          }
        >
          Welcome in @nyx.wav! Grab a seat — !discord if you want to queue for
          customs later.
        </ChatMessage>
        <ChatMessage
          author="GG_Rohan"
          platform="youtube"
          tag={<MessageTag tone="question">Question</MessageTag>}
        >
          what sens do you play on?
        </ChatMessage>
        <ChatMessage
          author="Pip"
          bot
          tag={
            <span className="text-caption text-muted-foreground">Answer</span>
          }
          source="FAQ · Valorant settings"
          confidence={94}
        >
          @GG_Rohan 0.32 at 800 DPI, scoped 1.0. Full settings in !setup
        </ChatMessage>
        <ChatMessage
          author="cheap_followers_99"
          platform="youtube"
          tag={<MessageTag tone="toxic">Spam</MessageTag>}
          tone="flagged"
          quiet
        >
          Message deleted and user timed out for 10 minutes
        </ChatMessage>
      </ChatFeed>
    </figure>
  )
}
