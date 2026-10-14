import {
  botMetadataSchema,
  type BotDto,
  type BotListItemDto,
  type BotTemplateKey,
  type EscalationRuleDto,
  type ReplyLanguage,
  type ViewerCooldown,
} from '@kibo/contracts';
import type { Bot, EscalationRule, Prisma } from '@prisma/client';

/** Prisma enums are UPPER_SNAKE; the contract uses lower_snake. */
export function toContract<T extends string>(value: string) {
  return value.toLowerCase() as T;
}

export function toPrisma<T extends string>(value: string) {
  return value.toUpperCase() as T;
}

export type BotWithRules = Bot & { escalationRules: EscalationRule[] };

export const withRules = {
  escalationRules: { orderBy: { position: 'asc' } },
} satisfies Prisma.BotInclude;

export function toRuleDto(rule: EscalationRule): EscalationRuleDto {
  return {
    id: rule.id,
    trigger: rule.trigger,
    severity: toContract(rule.severity),
    action: toContract(rule.action),
    position: rule.position,
  };
}

export function toListItemDto(
  bot: Bot,
  defaultBotId: string | null,
): BotListItemDto {
  return {
    id: bot.id,
    name: bot.name,
    purpose: bot.purpose,
    status: toContract(bot.status),
    archivedAt: bot.archivedAt?.toISOString() ?? null,
    isDefault: bot.id === defaultBotId,
    personality: toContract(bot.personality),
    replyMode: toContract(bot.replyMode),
    confidenceThreshold: bot.confidenceThreshold,
    languages: bot.languages as ReplyLanguage[],
    createdAt: bot.createdAt.toISOString(),
    updatedAt: bot.updatedAt.toISOString(),
  };
}

export function toBotDto(
  bot: BotWithRules,
  defaultBotId: string | null,
): BotDto {
  // Stored metadata was validated on write; parsing again drops anything stale
  const metadata = botMetadataSchema.safeParse(bot.metadata);

  return {
    ...toListItemDto(bot, defaultBotId),
    workspaceId: bot.workspaceId,
    pausedAt: bot.pausedAt?.toISOString() ?? null,
    templateKey: bot.templateKey as BotTemplateKey | null,
    metadata: metadata.success ? metadata.data : {},
    voiceNotes: bot.voiceNotes,
    replyInViewerLanguage: bot.replyInViewerLanguage,
    welcomeEnabled: bot.welcomeEnabled,
    welcomeMessage: bot.welcomeMessage,
    unsureAction: toContract(bot.unsureAction),
    approvers: toContract(bot.approvers),
    maxRepliesPerMinute: bot.maxRepliesPerMinute,
    viewerCooldownSeconds: bot.viewerCooldownSeconds as ViewerCooldown,
    answerRepeatedOnce: bot.answerRepeatedOnce,
    quietMode: bot.quietMode,
    blockedTopics: bot.blockedTopics,
    blockedTopicReply: bot.blockedTopicReply,
    ignoreChatInstructions: bot.ignoreChatInstructions,
    escalationRules: bot.escalationRules.map(toRuleDto),
  };
}
