import type {
  Approvers,
  BotStatus,
  EscalationAction,
  Personality,
  ReplyMode,
  Severity,
  UnsureAction,
  ViewerCooldown,
} from "./enums.js"
import type { ReplyLanguage } from "./languages.js"
import type { BotMetadata } from "./schemas.js"
import type { BotTemplateKey } from "./templates.js"

export type EscalationRuleDto = {
  id: string
  trigger: string
  severity: Severity
  action: EscalationAction
  position: number
}

/** One bot, with every setting. Dates are ISO strings. */
export type BotDto = {
  id: string
  workspaceId: string
  name: string
  purpose: string | null
  status: BotStatus
  archivedAt: string | null
  pausedAt: string | null
  isDefault: boolean
  templateKey: BotTemplateKey | null
  metadata: BotMetadata
  // Personality & voice
  personality: Personality
  voiceNotes: string | null
  languages: ReplyLanguage[]
  replyInViewerLanguage: boolean
  welcomeEnabled: boolean
  welcomeMessage: string | null
  // Replying
  replyMode: ReplyMode
  confidenceThreshold: number
  unsureAction: UnsureAction
  approvers: Approvers
  maxRepliesPerMinute: number
  viewerCooldownSeconds: ViewerCooldown
  answerRepeatedOnce: boolean
  quietMode: boolean
  // Safety
  blockedTopics: string[]
  blockedTopicReply: string
  ignoreChatInstructions: boolean
  escalationRules: EscalationRuleDto[]
  createdAt: string
  updatedAt: string
}

/** A row in the bots list. */
export type BotListItemDto = Pick<
  BotDto,
  | "id"
  | "name"
  | "purpose"
  | "status"
  | "archivedAt"
  | "isDefault"
  | "personality"
  | "replyMode"
  | "confidenceThreshold"
  | "languages"
  | "createdAt"
  | "updatedAt"
>

export type BotCounts = {
  all: number
  active: number
  paused: number
  draft: number
  archived: number
}

export type BotListResult = {
  items: BotListItemDto[]
  /** Counts ignore the search, so the filter chips stay stable while typing. */
  counts: BotCounts
  /** Non-archived bots against the workspace’s limit. */
  limit: { used: number; max: number }
}
