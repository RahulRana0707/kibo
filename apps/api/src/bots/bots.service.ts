import { HttpStatus, Injectable } from '@nestjs/common';
import {
  botDefaults,
  defaultEscalationRules,
  getBotTemplate,
  limits,
  type BotDto,
  type BotListQuery,
  type BotListResult,
  type CreateBotInput,
  type UpdateBotInput,
  type WorkspaceDto,
} from '@kibo/contracts';
import {
  Prisma,
  type Bot,
  type BotStatus,
  type EscalationAction,
  type PrismaClient,
  type Severity,
} from '@prisma/client';

import { ApiException } from '../common/api-exception';
import { PrismaService } from '../prisma/prisma.service';
import type { WorkspaceContext } from '../workspaces/workspace-context';
import { WorkspacesService } from '../workspaces/workspaces.service';
import {
  toBotDto,
  toListItemDto,
  toPrisma,
  withRules,
  type BotWithRules,
} from './bots.mapper';

type Tx = Prisma.TransactionClient;

/** Settings a bot carries over when duplicated or copied from. */
const copiedSettings = [
  'templateKey',
  'personality',
  'voiceNotes',
  'languages',
  'replyInViewerLanguage',
  'welcomeEnabled',
  'welcomeMessage',
  'replyMode',
  'confidenceThreshold',
  'unsureAction',
  'approvers',
  'maxRepliesPerMinute',
  'viewerCooldownSeconds',
  'answerRepeatedOnce',
  'quietMode',
  'blockedTopics',
  'blockedTopicReply',
  'ignoreChatInstructions',
] as const satisfies readonly (keyof Bot)[];

function nameKeyOf(name: string) {
  return name.trim().toLowerCase();
}

function isUniqueViolation(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  );
}

@Injectable()
export class BotsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly workspaces: WorkspacesService,
  ) {}

  // ---------------------------------------------------------------- reads

  async list(
    workspace: WorkspaceContext,
    query: BotListQuery,
  ): Promise<BotListResult> {
    const live = { workspaceId: workspace.id, archivedAt: null };
    const where: Prisma.BotWhereInput = {
      workspaceId: workspace.id,
      ...(query.status === 'archived'
        ? { archivedAt: { not: null } }
        : { archivedAt: null }),
      ...(query.status !== 'all' && query.status !== 'archived'
        ? { status: toPrisma<BotStatus>(query.status) }
        : {}),
      ...(query.q
        ? {
            OR: [
              { name: { contains: query.q, mode: 'insensitive' } },
              { purpose: { contains: query.q, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [bots, byStatus, archived, defaultBotId] = await Promise.all([
      this.prisma.bot.findMany({ where, orderBy: { createdAt: 'asc' } }),
      this.prisma.bot.groupBy({
        by: ['status'],
        where: live,
        _count: { _all: true },
      }),
      this.prisma.bot.count({
        where: { workspaceId: workspace.id, archivedAt: { not: null } },
      }),
      this.defaultBotIdOf(this.prisma, workspace.id),
    ]);

    const count = (status: BotStatus) =>
      byStatus.find((group) => group.status === status)?._count._all ?? 0;
    const used = count('DRAFT') + count('ACTIVE') + count('PAUSED');

    return {
      items: bots.map((bot) => toListItemDto(bot, defaultBotId)),
      counts: {
        all: used,
        active: count('ACTIVE'),
        paused: count('PAUSED'),
        draft: count('DRAFT'),
        archived,
      },
      limit: { used, max: workspace.botLimit },
    };
  }

  async get(workspace: WorkspaceContext, botId: string): Promise<BotDto> {
    const bot = await this.findOrThrow(this.prisma, workspace.id, botId);
    return toBotDto(bot, await this.defaultBotIdOf(this.prisma, workspace.id));
  }

  // -------------------------------------------------------------- create

  async create(
    workspace: WorkspaceContext,
    userId: string,
    input: CreateBotInput,
  ): Promise<BotDto> {
    return this.withUniqueName(input.name, () =>
      this.prisma.$transaction(async (tx) => {
        await this.lockWorkspace(tx, workspace.id);
        await this.assertRoomForOneMore(tx, workspace);

        const template = input.templateKey
          ? getBotTemplate(input.templateKey)
          : undefined;
        const source = input.copyFrom
          ? await this.findOrThrow(tx, workspace.id, input.copyFrom.botId)
          : undefined;

        // Later layers win: defaults < template < copied bot < what was typed
        const bot = await tx.bot.create({
          data: {
            workspaceId: workspace.id,
            createdById: userId,
            ...this.defaultsData(),
            ...(template
              ? {
                  templateKey: template.key,
                  personality: toPrisma<Bot['personality']>(
                    template.personality,
                  ),
                  replyMode: toPrisma<Bot['replyMode']>(template.replyMode),
                  voiceNotes: template.voiceNotes,
                  welcomeMessage: template.welcomeMessage,
                  blockedTopics: [...template.blockedTopics],
                }
              : {}),
            ...(source ? this.copiedData(source) : {}),
            name: input.name,
            nameKey: nameKeyOf(input.name),
            purpose: input.purpose ?? null,
            ...(input.personality
              ? { personality: toPrisma<Bot['personality']>(input.personality) }
              : {}),
            ...(input.languages ? { languages: input.languages } : {}),
            ...(input.replyInViewerLanguage !== undefined
              ? { replyInViewerLanguage: input.replyInViewerLanguage }
              : {}),
            escalationRules: {
              create: this.startingRules(source).map((rule, position) => ({
                ...rule,
                position,
              })),
            },
          },
          include: withRules,
        });

        const defaultBotId = await this.ensureDefault(tx, workspace.id, bot.id);
        return toBotDto(bot, defaultBotId);
      }),
    );
  }

  async duplicate(
    workspace: WorkspaceContext,
    userId: string,
    botId: string,
  ): Promise<BotDto> {
    return this.prisma.$transaction(async (tx) => {
      await this.lockWorkspace(tx, workspace.id);
      const source = await this.findOrThrow(tx, workspace.id, botId);
      await this.assertRoomForOneMore(tx, workspace);

      const name = await this.copyName(tx, workspace.id, source.name);
      const bot = await tx.bot.create({
        data: {
          workspaceId: workspace.id,
          createdById: userId,
          ...this.copiedData(source),
          name,
          nameKey: nameKeyOf(name),
          purpose: source.purpose,
          // A copy never inherits a running state: it starts as a draft
          status: 'DRAFT',
          escalationRules: {
            create: source.escalationRules.map((rule) => ({
              trigger: rule.trigger,
              severity: rule.severity,
              action: rule.action,
              position: rule.position,
            })),
          },
        },
        include: withRules,
      });

      const defaultBotId = await this.ensureDefault(tx, workspace.id, bot.id);
      return toBotDto(bot, defaultBotId);
    });
  }

  // -------------------------------------------------------------- update

  async update(
    workspace: WorkspaceContext,
    botId: string,
    input: UpdateBotInput,
  ): Promise<BotDto> {
    const current = await this.findOrThrow(this.prisma, workspace.id, botId);
    this.assertNotArchived(current);

    const data: Prisma.BotUpdateInput = {
      ...(input.name !== undefined
        ? { name: input.name, nameKey: nameKeyOf(input.name) }
        : {}),
      ...(input.purpose !== undefined ? { purpose: input.purpose } : {}),
      ...(input.metadata !== undefined ? { metadata: input.metadata } : {}),
      ...(input.personality
        ? { personality: toPrisma<Bot['personality']>(input.personality) }
        : {}),
      ...(input.voiceNotes !== undefined
        ? { voiceNotes: input.voiceNotes }
        : {}),
      ...(input.languages ? { languages: input.languages } : {}),
      ...(input.replyInViewerLanguage !== undefined
        ? { replyInViewerLanguage: input.replyInViewerLanguage }
        : {}),
      ...(input.welcomeEnabled !== undefined
        ? { welcomeEnabled: input.welcomeEnabled }
        : {}),
      ...(input.welcomeMessage !== undefined
        ? { welcomeMessage: input.welcomeMessage }
        : {}),
      ...(input.replyMode
        ? { replyMode: toPrisma<Bot['replyMode']>(input.replyMode) }
        : {}),
      ...(input.confidenceThreshold !== undefined
        ? { confidenceThreshold: input.confidenceThreshold }
        : {}),
      ...(input.unsureAction
        ? { unsureAction: toPrisma<Bot['unsureAction']>(input.unsureAction) }
        : {}),
      ...(input.approvers
        ? { approvers: toPrisma<Bot['approvers']>(input.approvers) }
        : {}),
      ...(input.maxRepliesPerMinute !== undefined
        ? { maxRepliesPerMinute: input.maxRepliesPerMinute }
        : {}),
      ...(input.viewerCooldownSeconds !== undefined
        ? { viewerCooldownSeconds: input.viewerCooldownSeconds }
        : {}),
      ...(input.answerRepeatedOnce !== undefined
        ? { answerRepeatedOnce: input.answerRepeatedOnce }
        : {}),
      ...(input.quietMode !== undefined ? { quietMode: input.quietMode } : {}),
      ...(input.blockedTopics ? { blockedTopics: input.blockedTopics } : {}),
      ...(input.blockedTopicReply !== undefined
        ? { blockedTopicReply: input.blockedTopicReply }
        : {}),
      ...(input.ignoreChatInstructions !== undefined
        ? { ignoreChatInstructions: input.ignoreChatInstructions }
        : {}),
    };

    const bot = await this.withUniqueName(input.name ?? current.name, () =>
      this.prisma.bot.update({
        where: { id: current.id },
        data,
        include: withRules,
      }),
    );
    return toBotDto(bot, await this.defaultBotIdOf(this.prisma, workspace.id));
  }

  async pause(
    workspace: WorkspaceContext,
    userId: string,
    botId: string,
  ): Promise<BotDto> {
    const current = await this.findOrThrow(this.prisma, workspace.id, botId);
    this.assertNotArchived(current);
    this.assertNotDraft(current);
    if (current.status === 'PAUSED') return this.get(workspace, botId);

    const bot = await this.prisma.bot.update({
      where: { id: current.id },
      data: { status: 'PAUSED', pausedAt: new Date(), pausedById: userId },
      include: withRules,
    });
    return toBotDto(bot, await this.defaultBotIdOf(this.prisma, workspace.id));
  }

  async resume(workspace: WorkspaceContext, botId: string): Promise<BotDto> {
    const current = await this.findOrThrow(this.prisma, workspace.id, botId);
    this.assertNotArchived(current);
    this.assertNotDraft(current);
    if (current.status === 'ACTIVE') return this.get(workspace, botId);

    const bot = await this.prisma.bot.update({
      where: { id: current.id },
      data: { status: 'ACTIVE', pausedAt: null, pausedById: null },
      include: withRules,
    });
    return toBotDto(bot, await this.defaultBotIdOf(this.prisma, workspace.id));
  }

  // ----------------------------------------------------- archive, restore

  async archive(workspace: WorkspaceContext, botId: string): Promise<BotDto> {
    return this.prisma.$transaction(async (tx) => {
      await this.lockWorkspace(tx, workspace.id);
      const current = await this.findOrThrow(tx, workspace.id, botId);
      if (current.archivedAt) {
        return toBotDto(current, await this.defaultBotIdOf(tx, workspace.id));
      }

      const bot = await tx.bot.update({
        where: { id: current.id },
        data: { archivedAt: new Date() },
        include: withRules,
      });
      const defaultBotId = await this.moveDefaultAwayFrom(
        tx,
        workspace.id,
        bot.id,
      );
      return toBotDto(bot, defaultBotId);
    });
  }

  async restore(workspace: WorkspaceContext, botId: string): Promise<BotDto> {
    return this.prisma.$transaction(async (tx) => {
      await this.lockWorkspace(tx, workspace.id);
      const current = await this.findOrThrow(tx, workspace.id, botId);
      if (!current.archivedAt) {
        return toBotDto(current, await this.defaultBotIdOf(tx, workspace.id));
      }
      await this.assertRoomForOneMore(tx, workspace);

      const bot = await tx.bot.update({
        where: { id: current.id },
        data: { archivedAt: null },
        include: withRules,
      });
      const defaultBotId = await this.ensureDefault(tx, workspace.id, bot.id);
      return toBotDto(bot, defaultBotId);
    });
  }

  async makeDefault(
    workspace: WorkspaceContext,
    botId: string,
  ): Promise<WorkspaceDto> {
    const bot = await this.findOrThrow(this.prisma, workspace.id, botId);
    this.assertNotArchived(bot);

    const updated = await this.prisma.workspace.update({
      where: { id: workspace.id },
      data: { defaultBotId: bot.id },
    });
    return this.workspaces.toDto(updated, workspace);
  }

  // -------------------------------------------------------------- delete

  async remove(
    workspace: WorkspaceContext,
    botId: string,
    confirmName: string,
  ): Promise<null> {
    return this.prisma.$transaction(async (tx) => {
      await this.lockWorkspace(tx, workspace.id);
      const bot = await this.findOrThrow(tx, workspace.id, botId);

      if (confirmName.trim() !== bot.name) {
        throw new ApiException(
          'CONFIRM_NAME_MISMATCH',
          `Type ${bot.name} exactly to delete it.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.moveDefaultAwayFrom(tx, workspace.id, bot.id);
      await tx.bot.delete({ where: { id: bot.id } });
      return null;
    });
  }

  // ------------------------------------------------------------- helpers

  /** Bots are scoped to the workspace: another workspace's bot is a 404. */
  async findOrThrow(
    db: Tx | PrismaClient,
    workspaceId: string,
    botId: string,
  ): Promise<BotWithRules> {
    const bot = await db.bot.findFirst({
      where: { id: botId, workspaceId },
      include: withRules,
    });
    if (!bot) throw ApiException.notFound('BOT_NOT_FOUND');
    return bot;
  }

  /** Serialises changes that count bots, so two requests can't both pass the limit. */
  private async lockWorkspace(tx: Tx, workspaceId: string) {
    await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${`workspace-bots:${workspaceId}`}))`;
  }

  private async assertRoomForOneMore(tx: Tx, workspace: WorkspaceContext) {
    const live = await tx.bot.findMany({
      where: { workspaceId: workspace.id, archivedAt: null },
      select: { name: true },
      orderBy: { createdAt: 'asc' },
    });
    if (live.length < workspace.botLimit) return;

    const [only] = live;
    throw ApiException.conflict(
      'BOT_LIMIT_REACHED',
      workspace.botLimit === 1 && only
        ? `Your plan includes 1 bot. Archive ${only.name} to make room for another.`
        : `You’ve used all ${workspace.botLimit} bots on your plan. Archive one to make room.`,
    );
  }

  private assertNotArchived(bot: Bot) {
    if (bot.archivedAt) {
      throw ApiException.conflict(
        'BOT_ARCHIVED',
        `${bot.name} is archived. Restore it first.`,
      );
    }
  }

  private assertNotDraft(bot: Bot) {
    if (bot.status === 'DRAFT') {
      throw ApiException.conflict(
        'BOT_IS_DRAFT',
        `${bot.name} is still a draft. Connect a platform to take it live first.`,
      );
    }
  }

  private async withUniqueName<T>(name: string, run: () => Promise<T>) {
    try {
      return await run();
    } catch (error) {
      if (isUniqueViolation(error)) {
        throw ApiException.conflict(
          'BOT_NAME_TAKEN',
          `Another bot is already called ${name.trim()}.`,
        );
      }
      throw error;
    }
  }

  private async defaultBotIdOf(db: Tx | PrismaClient, workspaceId: string) {
    const workspace = await db.workspace.findUniqueOrThrow({
      where: { id: workspaceId },
      select: { defaultBotId: true },
    });
    return workspace.defaultBotId;
  }

  /** The first bot in a workspace becomes its default. */
  private async ensureDefault(tx: Tx, workspaceId: string, botId: string) {
    const current = await this.defaultBotIdOf(tx, workspaceId);
    if (current) return current;
    await tx.workspace.update({
      where: { id: workspaceId },
      data: { defaultBotId: botId },
    });
    return botId;
  }

  /** When the default bot goes away, the oldest remaining bot takes over. */
  private async moveDefaultAwayFrom(
    tx: Tx,
    workspaceId: string,
    botId: string,
  ) {
    const current = await this.defaultBotIdOf(tx, workspaceId);
    if (current !== botId) return current;

    const next = await tx.bot.findFirst({
      where: { workspaceId, archivedAt: null, id: { not: botId } },
      orderBy: { createdAt: 'asc' },
      select: { id: true },
    });
    await tx.workspace.update({
      where: { id: workspaceId },
      data: { defaultBotId: next?.id ?? null },
    });
    return next?.id ?? null;
  }

  /** “Pip copy”, then “Pip copy 2”, “Pip copy 3”… within the name limit. */
  private async copyName(tx: Tx, workspaceId: string, name: string) {
    const taken = new Set(
      (
        await tx.bot.findMany({
          where: { workspaceId },
          select: { nameKey: true },
        })
      ).map((bot) => bot.nameKey),
    );
    for (let n = 1; ; n++) {
      const suffix = n === 1 ? ' copy' : ` copy ${n}`;
      const candidate = `${name.slice(0, limits.name - suffix.length)}${suffix}`;
      if (!taken.has(nameKeyOf(candidate))) return candidate;
    }
  }

  private defaultsData() {
    return {
      personality: toPrisma<Bot['personality']>(botDefaults.personality),
      languages: botDefaults.languages,
      replyInViewerLanguage: botDefaults.replyInViewerLanguage,
      welcomeEnabled: botDefaults.welcomeEnabled,
      welcomeMessage: botDefaults.welcomeMessage,
      replyMode: toPrisma<Bot['replyMode']>(botDefaults.replyMode),
      confidenceThreshold: botDefaults.confidenceThreshold,
      unsureAction: toPrisma<Bot['unsureAction']>(botDefaults.unsureAction),
      approvers: toPrisma<Bot['approvers']>(botDefaults.approvers),
      maxRepliesPerMinute: botDefaults.maxRepliesPerMinute,
      viewerCooldownSeconds: botDefaults.viewerCooldownSeconds,
      answerRepeatedOnce: botDefaults.answerRepeatedOnce,
      quietMode: botDefaults.quietMode,
      blockedTopics: botDefaults.blockedTopics,
      blockedTopicReply: botDefaults.blockedTopicReply,
      ignoreChatInstructions: botDefaults.ignoreChatInstructions,
    };
  }

  /** A copied bot's rules, or the three defaults every new bot starts with. */
  private startingRules(source?: BotWithRules) {
    return source
      ? source.escalationRules.map(({ trigger, severity, action }) => ({
          trigger,
          severity,
          action,
        }))
      : defaultEscalationRules.map((rule) => ({
          trigger: rule.trigger,
          severity: toPrisma<Severity>(rule.severity),
          action: toPrisma<EscalationAction>(rule.action),
        }));
  }

  private copiedData(source: Bot) {
    return Object.fromEntries(
      copiedSettings.map((key) => [key, source[key]]),
    ) as Pick<Bot, (typeof copiedSettings)[number]>;
  }
}
