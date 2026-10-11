import { Badge } from "@kibo/ui/components/badge"
import { Panel } from "@kibo/ui/components/panel"

import { MessageTag } from "@/components/atoms/message-tag"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { FeatureItem } from "@/components/molecules/feature"

/**
 * A sample stretch of chat beside the three things Kibo did in it, for the
 * dark “See it in chat” band.
 */
export function ChatShowcase() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Panel className="min-w-0 flex-[999_1_560px] p-3 max-sm:p-3">
        <ChatFeed>
          <ChatMessage
            author="lowkeyLiam"
            platform="twitch"
            tag={<MessageTag tone="question">Question</MessageTag>}
            time="9:02 PM"
          >
            when do you stream next week
          </ChatMessage>
          <ChatMessage
            author="Pip"
            bot
            time="9:02 PM"
            source="Schedule · Weekly"
            confidence={98}
          >
            @lowkeyLiam Tue, Thu and Sat at 7 PM IST. Sunday is cozy-games day.
            Full schedule: !schedule
          </ChatMessage>
          <ChatMessage
            author="saltyspud"
            platform="youtube"
            tag={<MessageTag tone="toxic">Toxic</MessageTag>}
            time="9:03 PM"
            quiet
          >
            Message hidden · held for review
          </ChatMessage>
          <ChatMessage
            author="momo_draws"
            platform="twitch"
            tag={<Badge className="h-5">First message</Badge>}
            time="9:03 PM"
          >
            omg the ace
          </ChatMessage>
          <ChatMessage author="Pip" bot time="9:03 PM">
            Welcome @momo_draws! You picked a good minute to show up.
          </ChatMessage>
        </ChatFeed>
      </Panel>
      <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-6">
        <FeatureItem title="Answers from your knowledge">
          Every reply links to the FAQ, link or note it came from.
        </FeatureItem>
        <FeatureItem title="Moderates in the background">
          Spam, links and toxicity handled by your rules, with one-click undo.
        </FeatureItem>
        <FeatureItem title="Makes newcomers feel seen">
          First-time chatters get a welcome, so nobody talks into the void.
        </FeatureItem>
      </div>
    </div>
  )
}
