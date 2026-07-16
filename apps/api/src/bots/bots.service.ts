import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { BotInputDto } from './dto/bot.dto';

@Injectable()
export class BotsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    const [user, bots] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { activeBotId: true },
      }),
      this.prisma.bot.findMany({
        where: { userId },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          name: true,
          status: true,
          avatarUrl: true,
          createdAt: true,
          _count: {
            select: {
              knowledgeItems: true,
              integrations: true,
            },
          },
        },
      }),
    ]);

    return {
      activeBotId: user?.activeBotId ?? null,
      bots: bots.map((bot) => ({
        id: bot.id,
        name: bot.name,
        status: bot.status,
        avatarUrl: bot.avatarUrl,
        createdAt: bot.createdAt,
        knowledgeCount: bot._count.knowledgeItems,
        integrationCount: bot._count.integrations,
        isActive: user?.activeBotId === bot.id,
      })),
    };
  }

  async getOne(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      select: {
        id: true,
        name: true,
        status: true,
        avatarUrl: true,
        personality: true,
        welcomeMessage: true,
        createdAt: true,
        _count: {
          select: {
            knowledgeItems: true,
            integrations: true,
          },
        },
      },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found.');
    }

    return {
      id: bot.id,
      name: bot.name,
      status: bot.status,
      avatarUrl: bot.avatarUrl,
      personality: bot.personality,
      welcomeMessage: bot.welcomeMessage,
      createdAt: bot.createdAt,
      knowledgeCount: bot._count.knowledgeItems,
      integrationCount: bot._count.integrations,
    };
  }

  async create(userId: string, input: BotInputDto) {
    const botCount = await this.prisma.bot.count({
      where: { userId },
    });

    const bot = await this.prisma.bot.create({
      data: {
        userId,
        name: input.name,
        avatarUrl: input.avatarUrl ?? null,
        personality: input.personality ?? null,
        welcomeMessage: input.welcomeMessage ?? null,
        status: 'DRAFT',
        meta: {
          source: 'api',
          botIndex: botCount + 1,
        },
      },
    });

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        activeBotId: bot.id,
      },
    });

    return this.getOne(userId, bot.id);
  }

  async update(userId: string, botId: string, input: BotInputDto) {
    const result = await this.prisma.bot.updateMany({
      where: { id: botId, userId },
      data: {
        name: input.name,
        avatarUrl: input.avatarUrl ?? null,
        personality: input.personality ?? null,
        welcomeMessage: input.welcomeMessage ?? null,
      },
    });

    if (!result.count) {
      throw new NotFoundException('Bot not found.');
    }

    return this.getOne(userId, botId);
  }

  async delete(userId: string, botId: string) {
    const targetBot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      select: { id: true },
    });

    if (!targetBot) {
      return { deleted: false };
    }

    const [remainingBots, activeUser] = await this.prisma.$transaction([
      this.prisma.bot.findMany({
        where: { userId, id: { not: botId } },
        orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
        select: { id: true },
        take: 1,
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { activeBotId: true },
      }),
    ]);

    await this.prisma.bot.delete({
      where: { id: botId },
    });

    if (activeUser?.activeBotId === botId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          activeBotId: remainingBots[0]?.id ?? null,
        },
      });
    }

    return { deleted: true };
  }

  async setActive(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      select: { id: true },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        activeBotId: bot.id,
      },
    });

    return { activeBotId: bot.id };
  }
}
