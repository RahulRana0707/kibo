import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getPageData(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        activeBotId: true,
        activeBot: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            welcomeMessage: true,
            status: true,
            integrations: {
              orderBy: { updatedAt: 'desc' },
              select: {
                id: true,
                provider: true,
                status: true,
              },
            },
            knowledgeItems: {
              where: { isActive: true },
              orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
              select: {
                id: true,
                type: true,
                title: true,
                question: true,
                content: true,
                sourceUrl: true,
              },
              take: 5,
            },
            _count: {
              select: {
                knowledgeItems: true,
                integrations: true,
                conversations: true,
              },
            },
          },
        },
      },
    });

    const activeBotKnowledgeTypes = user?.activeBotId
      ? await this.prisma.knowledgeItem.groupBy({
          by: ['type'],
          where: {
            userId,
            botId: user.activeBotId,
            isActive: true,
          },
          _count: {
            _all: true,
          },
        })
      : [];

    const [
      botCount,
      knowledgeCount,
      connectedIntegrationCount,
      integrationCount,
      botReplyCount,
      openConversationCount,
      recentEvents,
    ] = await Promise.all([
      this.prisma.bot.count({
        where: { userId },
      }),
      this.prisma.knowledgeItem.count({
        where: {
          userId,
          isActive: true,
        },
      }),
      this.prisma.integration.count({
        where: {
          userId,
          status: 'CONNECTED',
        },
      }),
      this.prisma.integration.count({
        where: { userId },
      }),
      this.prisma.message.count({
        where: {
          userId,
          senderType: 'BOT',
        },
      }),
      this.prisma.conversation.count({
        where: {
          userId,
          status: 'OPEN',
        },
      }),
      this.prisma.event.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          type: true,
          severity: true,
          createdAt: true,
        },
        take: 5,
      }),
    ]);

    return {
      activeBot: user?.activeBot ?? null,
      activeBotKnowledgeTypes: activeBotKnowledgeTypes.map((item) => ({
        type: item.type,
        count: item._count._all,
      })),
      botCount,
      knowledgeCount,
      connectedIntegrationCount,
      integrationCount,
      botReplyCount,
      openConversationCount,
      recentEvents,
    };
  }
}
