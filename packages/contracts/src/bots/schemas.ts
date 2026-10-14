import { z } from "zod"

import { hexColorSchema, metadataSchema } from "../metadata.js"
import { limits } from "./defaults.js"
import {
  approverValues,
  botListStatuses,
  escalationActionValues,
  personalityValues,
  replyModeValues,
  severityValues,
  unsureActionValues,
} from "./enums.js"
import { replyLanguageCodes } from "./languages.js"
import { botTemplateKeys } from "./templates.js"

/** Empty text becomes `null`, so “cleared” and “never set” look the same. */
function optionalText(max: number, message: string) {
  return z
    .string()
    .trim()
    .max(max, message)
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .optional()
}

const nameSchema = z
  .string()
  .trim()
  .min(1, "Enter a bot name.")
  .max(limits.name, `Use ${limits.name} characters or fewer.`)

const languagesSchema = z
  .array(z.enum(replyLanguageCodes, "Pick English or Hinglish."))
  .min(1, "Pick at least one language.")
  .max(replyLanguageCodes.length)
  .refine((codes) => new Set(codes).size === codes.length, {
    message: "Each language only once.",
  })

const blockedTopicsSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1, "A topic can’t be empty.")
      .max(limits.blockedTopic, `Keep each topic to ${limits.blockedTopic} characters.`)
  )
  .max(limits.blockedTopics, `Up to ${limits.blockedTopics} topics.`)
  .refine(
    (topics) =>
      new Set(topics.map((topic) => topic.toLowerCase())).size === topics.length,
    { message: "Each topic only once." }
  )

/** Display-only bot details: never queried, under 8 KB. */
export const botMetadataSchema = metadataSchema({
  avatarUrl: z.url().optional(),
  accentColor: hexColorSchema.optional(),
  notes: z.string().trim().max(500).optional(),
})

export type BotMetadata = z.infer<typeof botMetadataSchema>

export const createBotSchema = z.object({
  name: nameSchema,
  purpose: optionalText(limits.purpose, `Use ${limits.purpose} characters or fewer.`),
  personality: z.enum(personalityValues).optional(),
  languages: languagesSchema.optional(),
  replyInViewerLanguage: z.boolean().optional(),
  templateKey: z.enum(botTemplateKeys).optional(),
  /** Copies settings and escalation rules from another bot in the workspace. */
  copyFrom: z.object({ botId: z.string().min(1) }).optional(),
})

export type CreateBotInput = z.infer<typeof createBotSchema>

/** Any editable setting; the forms send one section at a time. */
export const updateBotSchema = z
  .object({
    // Identity
    name: nameSchema,
    purpose: optionalText(limits.purpose, `Use ${limits.purpose} characters or fewer.`),
    metadata: botMetadataSchema,
    // Personality & voice
    personality: z.enum(personalityValues),
    voiceNotes: optionalText(
      limits.voiceNotes,
      `Keep voice notes to ${limits.voiceNotes.toLocaleString("en")} characters.`
    ),
    languages: languagesSchema,
    replyInViewerLanguage: z.boolean(),
    welcomeEnabled: z.boolean(),
    welcomeMessage: optionalText(
      limits.welcomeMessage,
      `Keep the welcome message to ${limits.welcomeMessage} characters.`
    ),
    // Replying
    replyMode: z.enum(replyModeValues),
    confidenceThreshold: z
      .number()
      .int()
      .min(
        limits.confidenceThreshold.min,
        `Use a threshold from ${limits.confidenceThreshold.min}% to ${limits.confidenceThreshold.max}%.`
      )
      .max(
        limits.confidenceThreshold.max,
        `Use a threshold from ${limits.confidenceThreshold.min}% to ${limits.confidenceThreshold.max}%.`
      ),
    unsureAction: z.enum(unsureActionValues),
    approvers: z.enum(approverValues),
    maxRepliesPerMinute: z
      .number()
      .int()
      .min(limits.maxRepliesPerMinute.min, "Allow at least 1 reply a minute.")
      .max(
        limits.maxRepliesPerMinute.max,
        `Allow at most ${limits.maxRepliesPerMinute.max} replies a minute.`
      ),
    viewerCooldownSeconds: z.union(
      [z.literal(15), z.literal(30), z.literal(60)],
      "Pick 15 seconds, 30 seconds or 1 minute."
    ),
    answerRepeatedOnce: z.boolean(),
    quietMode: z.boolean(),
    // Safety
    blockedTopics: blockedTopicsSchema,
    blockedTopicReply: z
      .string()
      .trim()
      .min(1, "Write what the bot says instead.")
      .max(limits.blockedTopicReply, `Keep it to ${limits.blockedTopicReply} characters.`),
    ignoreChatInstructions: z.boolean(),
  })
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: "Change at least one setting.",
  })

export type UpdateBotInput = z.infer<typeof updateBotSchema>

export const escalationRuleSchema = z.object({
  trigger: z
    .string()
    .trim()
    .min(1, "Describe when this rule applies.")
    .max(limits.escalationTrigger, `Keep it to ${limits.escalationTrigger} characters.`),
  severity: z.enum(severityValues),
  action: z.enum(escalationActionValues),
})

export const escalationRulesSchema = z.object({
  rules: z
    .array(escalationRuleSchema)
    .max(limits.escalationRules, `Up to ${limits.escalationRules} rules.`),
})

export type EscalationRulesInput = z.infer<typeof escalationRulesSchema>

export const deleteBotSchema = z.object({
  confirmName: z.string().trim().min(1, "Type the bot’s name to confirm."),
})

export type DeleteBotInput = z.infer<typeof deleteBotSchema>

export const botListQuerySchema = z.object({
  status: z.enum(botListStatuses).default("all"),
  q: z
    .string()
    .trim()
    .max(60)
    .optional()
    .transform((value) => value || undefined),
})

export type BotListQuery = z.infer<typeof botListQuerySchema>
