import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type {
  CreateKnowledgeItemDto,
  ImportFaqCsvDto,
  UpdateKnowledgeItemDto,
} from './dto/knowledge-item.dto';

@Injectable()
export class KnowledgeBaseService {
  constructor(private readonly prisma: PrismaService) {}

  async getPageData(userId: string, botId?: string) {
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
          _count: {
            select: {
              knowledgeItems: true,
            },
          },
        },
      }),
    ]);

    const selectedBotId =
      bots.find((bot) => bot.id === botId)?.id ??
      bots.find((bot) => bot.id === user?.activeBotId)?.id ??
      bots[0]?.id;

    const selectedBot = selectedBotId
      ? await this.prisma.bot.findFirst({
          where: {
            id: selectedBotId,
            userId,
          },
          select: {
            id: true,
            name: true,
            knowledgeItems: {
              orderBy: [{ updatedAt: 'desc' }, { createdAt: 'desc' }],
              select: {
                id: true,
                type: true,
                title: true,
                question: true,
                answer: true,
                content: true,
                sourceUrl: true,
                isActive: true,
                createdAt: true,
              },
            },
          },
        })
      : null;

    return {
      selectedBot,
      bots: bots.map((bot) => ({
        id: bot.id,
        name: bot.name,
        isActive: bot.id === user?.activeBotId,
        knowledgeCount: bot._count.knowledgeItems,
      })),
    };
  }

  async create(userId: string, input: CreateKnowledgeItemDto) {
    const bot = await this.getUserBot(userId, input.botId);

    if (input.type === 'FAQ') {
      return this.prisma.knowledgeItem.create({
        data: {
          userId,
          botId: bot.id,
          type: 'FAQ',
          question: input.question,
          answer: input.answer,
          title: input.question,
          content: input.answer,
        },
      });
    }

    return this.prisma.knowledgeItem.create({
      data: {
        userId,
        botId: bot.id,
        type: input.type,
        title: input.title,
        content: input.content,
        sourceUrl: input.type === 'LINK' ? (input.sourceUrl ?? null) : null,
        meta: {
          source: 'api',
        },
      },
    });
  }

  async update(userId: string, itemId: string, input: UpdateKnowledgeItemDto) {
    const item = await this.prisma.knowledgeItem.findFirst({
      where: {
        id: itemId,
        userId,
      },
      select: {
        id: true,
        type: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Knowledge item not found.');
    }

    if (item.type !== input.type) {
      throw new BadRequestException('Knowledge type cannot be changed.');
    }

    if (item.type === 'FAQ') {
      if (input.type !== 'FAQ') {
        throw new BadRequestException('Invalid FAQ payload.');
      }

      return this.prisma.knowledgeItem.update({
        where: { id: item.id },
        data: {
          question: input.question,
          answer: input.answer,
          title: input.question,
          content: input.answer,
          sourceUrl: null,
        },
      });
    }

    if (input.type === 'FAQ') {
      throw new BadRequestException('Invalid knowledge payload.');
    }

    if (input.type === 'LINK') {
      return this.prisma.knowledgeItem.update({
        where: { id: item.id },
        data: {
          title: input.title,
          content: input.content,
          sourceUrl: input.sourceUrl ?? null,
          question: null,
          answer: null,
        },
      });
    }

    return this.prisma.knowledgeItem.update({
      where: { id: item.id },
      data: {
        title: input.title,
        content: input.content,
        sourceUrl: null,
        question: null,
        answer: null,
      },
    });
  }

  async importFaqCsv(userId: string, input: ImportFaqCsvDto) {
    const bot = await this.getUserBot(userId, input.botId);

    await this.prisma.knowledgeItem.createMany({
      data: input.rows.map((row, index) => ({
        userId,
        botId: bot.id,
        type: 'FAQ',
        question: row.question,
        answer: row.answer,
        title: row.question,
        content: row.answer,
        sortOrder: index,
        meta: {
          source: 'csv',
          filename: input.filename,
        },
      })),
    });

    return {
      importedCount: input.rows.length,
    };
  }

  async delete(userId: string, itemId: string) {
    const result = await this.prisma.knowledgeItem.deleteMany({
      where: {
        id: itemId,
        userId,
      },
    });

    return {
      deleted: result.count > 0,
    };
  }

  private async getUserBot(userId: string, botId: string) {
    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      select: { id: true },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found.');
    }

    return bot;
  }
}
