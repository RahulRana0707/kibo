import { Badge } from "@kibo/ui/components/badge"
import { Panel } from "@kibo/ui/components/panel"
import { Heading } from "@kibo/ui/components/typography"

import { MessageTag } from "@/components/atoms/message-tag"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { CheckList } from "@/components/molecules/check-list"

/** A labelled product example: never real account data on a public page. */
function ExamplePanel({ children }: { children: React.ReactNode }) {
  return (
    <Panel className="gap-2 p-3 max-sm:p-3">
      <Badge variant="outline" className="ms-1 mt-1">
        Example
      </Badge>
      <ChatFeed>{children}</ChatFeed>
    </Panel>
  )
}

/** The brand side of sign up: headline, an example and three benefits. */
export function SignupBrandPanel() {
  return (
    <>
      <Heading as="h2">Focus on creating. Kibo handles the chat.</Heading>
      <ExamplePanel>
        <ChatMessage
          author="GG_Rohan"
          platform="twitch"
          tag={<MessageTag kind="question" />}
        >
          discord link?
        </ChatMessage>
        <ChatMessage author="Your bot" bot source="Link · Discord">
          @GG_Rohan here you go: discord.gg/miraplays
        </ChatMessage>
      </ExamplePanel>
      <CheckList
        items={[
          "14-day free trial on every plan",
          "Approval mode until you trust it",
          "Works with YouTube Live and Twitch",
        ]}
      />
    </>
  )
}

/** The brand side of log in: nothing personal, the person isn't signed in. */
export function LoginBrandPanel() {
  return (
    <>
      <Heading as="h2">Welcome back.</Heading>
      <ExamplePanel>
        <ChatMessage
          author="a viewer"
          platform="youtube"
          tag={<MessageTag kind="question" />}
        >
          when’s the next stream?
        </ChatMessage>
        <ChatMessage
          author="Your bot"
          bot
          source="Schedule · Google Calendar"
        >
          Tonight at 7 PM. See you there!
        </ChatMessage>
      </ExamplePanel>
      <CheckList
        items={[
          "A summary after every stream",
          "Approval mode until you trust it",
          "Pause the bot any time, from any screen",
        ]}
      />
    </>
  )
}
