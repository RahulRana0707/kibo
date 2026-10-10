import type { Metadata } from "next"
import Link from "next/link"

import { MessageTag } from "@/components/atoms/message-tag"
import { Panel } from "@kibo/ui/components/panel"
import { Heading } from "@kibo/ui/components/typography"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"
import { CheckList } from "@/components/molecules/check-list"
import { SignupForm } from "@/components/organisms/signup-form"
import { AuthTemplate } from "@/components/templates/auth-template"

export const metadata: Metadata = { title: "Sign up" }

export default function SignupPage() {
  return (
    <AuthTemplate
      switchLink={
        <>
          Already have an account? <Link href="/login">Log in</Link>
        </>
      }
      aside={
        <>
          <Heading as="h2">Focus on creating. Kibo handles the chat.</Heading>
          <Panel className="p-3 max-sm:p-3">
            <ChatFeed>
              <ChatMessage
                author="GG_Rohan"
                platform="twitch"
                tag={<MessageTag tone="question">Question</MessageTag>}
              >
                discord link?
              </ChatMessage>
              <ChatMessage author="Pip" bot source="Link · Discord">
                @GG_Rohan here you go: discord.gg/miraplays
              </ChatMessage>
            </ChatFeed>
          </Panel>
          <CheckList
            items={[
              "14-day free trial on every plan",
              "Approval mode until you trust it",
              "Pause the bot any time, from any screen",
            ]}
          />
        </>
      }
    >
      <SignupForm />
    </AuthTemplate>
  )
}
