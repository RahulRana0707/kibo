import type { MDXComponents } from "mdx/types"

import { MessageTag } from "@/components/atoms/message-tag"
import { Placeholder } from "@/components/atoms/placeholder"
import { Callout } from "@kibo/ui/components/callout"
import { ChangeItem, ChangeList } from "@/components/molecules/change-item"
import { ChatFeed, ChatMessage } from "@/components/molecules/chat-message"

const components: MDXComponents = {
  Callout,
  ChangeItem,
  ChangeList,
  ChatFeed,
  ChatMessage,
  MessageTag,
  Placeholder,
}

export function useMDXComponents(): MDXComponents {
  return components
}
