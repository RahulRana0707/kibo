import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { IntegrationProvider } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';
import { YoutubeOAuthService } from './youtube/youtube-oauth.service';

type StartIntegrationResult = {
  provider: IntegrationProvider;
  status: 'PENDING' | 'CONNECTED' | 'ERROR';
  authorizationUrl?: string;
  oauthStateNonce?: string;
};

const supportedProviders = new Set<IntegrationProvider>(['YOUTUBE', 'TWITCH']);

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly youtubeOAuth: YoutubeOAuthService,
  ) {}

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
          avatarUrl: true,
          status: true,
          integrations: {
            orderBy: { updatedAt: 'desc' },
            select: {
              id: true,
              provider: true,
              status: true,
              externalChannelId: true,
              updatedAt: true,
            },
          },
          _count: {
            select: {
              knowledgeItems: true,
              integrations: true,
            },
          },
        },
      }),
    ]);

    const selectedBotId =
      bots.find((bot) => bot.id === botId)?.id ??
      bots.find((bot) => bot.id === user?.activeBotId)?.id ??
      bots[0]?.id;

    const selectedBot = bots.find((bot) => bot.id === selectedBotId) ?? null;

    return {
      selectedBot,
      bots: bots.map((bot) => ({
        id: bot.id,
        name: bot.name,
        avatarUrl: bot.avatarUrl,
        status: bot.status,
        isActive: bot.id === user?.activeBotId,
        isSelected: bot.id === selectedBotId,
        knowledgeCount: bot._count.knowledgeItems,
        integrationCount: bot._count.integrations,
      })),
      integrations: selectedBot?.integrations ?? [],
    };
  }

  async start(
    userId: string,
    botId: string,
    provider: IntegrationProvider,
  ): Promise<StartIntegrationResult> {
    if (!supportedProviders.has(provider)) {
      throw new BadRequestException('Unsupported integration provider.');
    }

    const bot = await this.prisma.bot.findFirst({
      where: { id: botId, userId },
      select: { id: true },
    });

    if (!bot) {
      throw new NotFoundException('Bot not found.');
    }

    const currentIntegration = await this.prisma.integration.findUnique({
      where: {
        botId_provider: {
          botId: bot.id,
          provider,
        },
      },
      select: {
        status: true,
      },
    });

    if (currentIntegration?.status === 'CONNECTED') {
      return {
        provider,
        status: 'CONNECTED',
      };
    }

    await this.prisma.integration.upsert({
      where: {
        botId_provider: {
          botId: bot.id,
          provider,
        },
      },
      create: {
        userId,
        botId: bot.id,
        provider,
        status: 'PENDING',
        meta: {
          source: currentIntegration ? 'api_restart' : 'api_start',
        },
      },
      update: {
        status: 'PENDING',
        meta: {
          source: currentIntegration ? 'api_restart' : 'api_start',
        },
      },
    });

    if (provider !== 'YOUTUBE') {
      return {
        provider,
        status: 'PENDING',
      };
    }

    const oauthStateNonce = randomUUID();
    const authorizationUrl = this.youtubeOAuth.createAuthorizationUrl({
      botId: bot.id,
      nonce: oauthStateNonce,
    });

    if (!authorizationUrl) {
      await this.prisma.integration.update({
        where: {
          botId_provider: {
            botId: bot.id,
            provider,
          },
        },
        data: {
          status: 'ERROR',
          meta: {
            error: 'missing_google_oauth_env',
            source: 'api_oauth_start',
          },
        },
      });

      return {
        provider,
        status: 'ERROR',
      };
    }

    return {
      provider,
      status: 'PENDING',
      authorizationUrl: authorizationUrl.toString(),
      oauthStateNonce,
    };
  }
}
