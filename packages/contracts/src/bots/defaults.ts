import type {
  Approvers,
  EscalationAction,
  Personality,
  ReplyMode,
  Severity,
  UnsureAction,
  ViewerCooldown,
} from "./enums.js"
import type { ReplyLanguage } from "./languages.js"

/** What a new bot starts with when nothing else is chosen. */
export const botDefaults = {
  personality: "friendly" as Personality,
  languages: ["en"] as ReplyLanguage[],
  replyInViewerLanguage: true,
  welcomeEnabled: true,
  welcomeMessage: "Welcome in {viewer}! Glad you’re here.",
  // New bots never post until a platform and a reply mode are chosen
  replyMode: "silent" as ReplyMode,
  confidenceThreshold: 85,
  unsureAction: "send_to_inbox" as UnsureAction,
  approvers: "owner" as Approvers,
  maxRepliesPerMinute: 8,
  viewerCooldownSeconds: 30 as ViewerCooldown,
  answerRepeatedOnce: true,
  quietMode: false,
  blockedTopics: [] as string[],
  blockedTopicReply: "That’s not something I can chat about — back to the stream!",
  ignoreChatInstructions: true,
}

/** The three rules every new bot starts with (Behavior & safety). */
export const defaultEscalationRules: {
  trigger: string
  severity: Severity
  action: EscalationAction
}[] = [
  { trigger: "Mentions of self-harm", severity: "highest", action: "alert_mods" },
  {
    trigger: "Harassment of a viewer or the creator",
    severity: "high",
    action: "hide_and_review",
  },
  {
    trigger: "Questions about money, refunds or sponsors’ terms",
    severity: "normal",
    action: "draft_for_approval",
  },
]

export const limits = {
  name: 40,
  purpose: 60,
  voiceNotes: 1000,
  welcomeMessage: 300,
  blockedTopics: 20,
  blockedTopic: 60,
  blockedTopicReply: 200,
  escalationRules: 20,
  escalationTrigger: 120,
  confidenceThreshold: { min: 50, max: 99 },
  maxRepliesPerMinute: { min: 1, max: 30 },
} as const
