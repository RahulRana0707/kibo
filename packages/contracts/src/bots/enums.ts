/**
 * Values the API sends and accepts, with the words the UI shows for them.
 * The API stores upper-case enums; these lower-case values are the contract.
 */

export const botStatuses = ["draft", "active", "paused"] as const
export type BotStatus = (typeof botStatuses)[number]

/** Status as people read it, and the StatusPill tone that carries it. */
export const botStatusDisplay: Record<
  BotStatus,
  { label: string; tone: "draft" | "offline" | "paused" }
> = {
  draft: { label: "Draft", tone: "draft" },
  active: { label: "Ready", tone: "offline" },
  paused: { label: "Paused", tone: "paused" },
}

export const personalities = [
  { value: "friendly", label: "Friendly", description: "Warm and helpful" },
  { value: "hype", label: "Hype", description: "High energy, loves a W" },
  { value: "chill", label: "Chill", description: "Laid back, low-key" },
  { value: "sarcastic", label: "Sarcastic", description: "Dry wit, never mean" },
  { value: "professional", label: "Professional", description: "Clear and polite" },
] as const
export type Personality = (typeof personalities)[number]["value"]
export const personalityValues = personalities.map((item) => item.value) as [
  Personality,
  ...Personality[],
]

export const replyModes = [
  {
    value: "auto",
    label: "Auto",
    description: "Posts answers it’s confident about right away. Unsure questions go to your inbox.",
  },
  {
    value: "approval",
    label: "Approval",
    description: "Drafts every reply. You or a mod approves it with one click.",
  },
  {
    value: "silent",
    label: "Silent",
    description: "Never posts. Watches, logs what it would have said and learns your chat.",
  },
] as const
export type ReplyMode = (typeof replyModes)[number]["value"]
export const replyModeValues = replyModes.map((item) => item.value) as [
  ReplyMode,
  ...ReplyMode[],
]

export const unsureActions = [
  { value: "draft_for_approval", label: "Draft it for approval" },
  { value: "send_to_inbox", label: "Stay silent and send to Unanswered inbox" },
  { value: "reply_not_sure", label: "Reply “I’m not sure — a mod will check”" },
] as const
export type UnsureAction = (typeof unsureActions)[number]["value"]
export const unsureActionValues = unsureActions.map((item) => item.value) as [
  UnsureAction,
  ...UnsureAction[],
]

export const approverOptions = [
  { value: "owner", label: "Me" },
  { value: "moderators", label: "My moderators" },
] as const
export type Approvers = (typeof approverOptions)[number]["value"]
export const approverValues = approverOptions.map((item) => item.value) as [
  Approvers,
  ...Approvers[],
]

export const viewerCooldowns = [
  { value: 15, label: "15 seconds" },
  { value: 30, label: "30 seconds" },
  { value: 60, label: "1 minute" },
] as const
export type ViewerCooldown = (typeof viewerCooldowns)[number]["value"]

export const severities = [
  { value: "highest", label: "Highest", tone: "destructive" },
  { value: "high", label: "High", tone: "warning" },
  { value: "normal", label: "Normal", tone: "default" },
] as const
export type Severity = (typeof severities)[number]["value"]
export const severityValues = severities.map((item) => item.value) as [
  Severity,
  ...Severity[],
]

export const escalationActions = [
  {
    value: "alert_mods",
    label: "Don’t reply. Alert all mods on console and phone.",
  },
  { value: "hide_and_review", label: "Hide the message, send to Review queue." },
  {
    value: "draft_for_approval",
    label: "Draft for approval instead of auto-reply.",
  },
] as const
export type EscalationAction = (typeof escalationActions)[number]["value"]
export const escalationActionValues = escalationActions.map(
  (item) => item.value
) as [EscalationAction, ...EscalationAction[]]

export const botListStatuses = [
  "all",
  "active",
  "paused",
  "draft",
  "archived",
] as const
export type BotListStatus = (typeof botListStatuses)[number]
