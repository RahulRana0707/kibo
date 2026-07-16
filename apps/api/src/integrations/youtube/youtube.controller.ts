import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthService } from '../../auth/auth.service';
import { env } from '../../config/env';
import { PrismaService } from '../../prisma/prisma.service';
import {
  YOUTUBE_OAUTH_STATE_COOKIE,
  YoutubeOAuthService,
} from './youtube-oauth.service';

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.cookie;

  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map((cookie) => cookie.trim());
  const cookie = cookies.find((item) => item.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

function getWebUrl(path: string, params?: Record<string, string>) {
  const url = new URL(path, env.WEB_URL);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  return url.toString();
}

function getQueryValue(value: Request['query'][string]) {
  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0];
  }

  return '';
}

@Controller('integrations/youtube')
export class YoutubeController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly youtubeOAuth: YoutubeOAuthService,
  ) {}

  @Get('callback')
  async callback(@Req() request: Request, @Res() response: Response) {
    const error = getQueryValue(request.query.error);
    const code = getQueryValue(request.query.code);
    const stateValue = getQueryValue(request.query.state);

    response.clearCookie(YOUTUBE_OAUTH_STATE_COOKIE, {
      path: '/',
    });

    if (error) {
      return response.redirect(
        getWebUrl('/integrations', {
          youtube: 'denied',
        }),
      );
    }

    const state = this.youtubeOAuth.parseState(stateValue);
    const expectedNonce = getCookie(request, YOUTUBE_OAUTH_STATE_COOKIE);

    if (!code || !state || !expectedNonce || state.nonce !== expectedNonce) {
      return response.redirect(
        getWebUrl('/integrations', {
          youtube: 'invalid_state',
        }),
      );
    }

    const session = await this.authService.getSession(request.headers);

    if (!session?.user.id) {
      return response.redirect(getWebUrl('/login'));
    }

    const bot = await this.prisma.bot.findFirst({
      where: {
        id: state.botId,
        userId: session.user.id,
      },
      select: { id: true },
    });

    if (!bot) {
      return response.redirect(
        getWebUrl('/integrations', {
          youtube: 'bot_not_found',
        }),
      );
    }

    try {
      const token = await this.youtubeOAuth.exchangeAuthorizationCode(code);
      const [channel, activeBroadcast, existingIntegration] = await Promise.all(
        [
          this.youtubeOAuth.getAuthenticatedChannel(token.access_token),
          this.youtubeOAuth.getActiveBroadcast(token.access_token),
          this.prisma.integration.findUnique({
            where: {
              botId_provider: {
                botId: bot.id,
                provider: 'YOUTUBE',
              },
            },
            select: {
              refreshToken: true,
            },
          }),
        ],
      );

      const tokenExpiresAt = token.expires_in
        ? new Date(Date.now() + token.expires_in * 1000)
        : null;

      await this.prisma.integration.upsert({
        where: {
          botId_provider: {
            botId: bot.id,
            provider: 'YOUTUBE',
          },
        },
        create: {
          userId: session.user.id,
          botId: bot.id,
          provider: 'YOUTUBE',
          status: 'CONNECTED',
          externalAccountId: channel.id,
          externalChannelId: channel.id,
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          tokenExpiresAt,
          config: {
            scope: token.scope,
            tokenType: token.token_type,
            activeBroadcast,
          },
          meta: {
            channelTitle: channel.title,
            channelThumbnailUrl: channel.thumbnailUrl,
            connectedAt: new Date().toISOString(),
          },
        },
        update: {
          status: 'CONNECTED',
          externalAccountId: channel.id,
          externalChannelId: channel.id,
          accessToken: token.access_token,
          refreshToken:
            token.refresh_token ?? existingIntegration?.refreshToken,
          tokenExpiresAt,
          config: {
            scope: token.scope,
            tokenType: token.token_type,
            activeBroadcast,
          },
          meta: {
            channelTitle: channel.title,
            channelThumbnailUrl: channel.thumbnailUrl,
            connectedAt: new Date().toISOString(),
          },
        },
      });

      return response.redirect(
        getWebUrl('/integrations', {
          botId: bot.id,
          youtube: 'connected',
        }),
      );
    } catch (callbackError) {
      console.error('YouTube OAuth callback failed', callbackError);

      await this.prisma.integration.upsert({
        where: {
          botId_provider: {
            botId: bot.id,
            provider: 'YOUTUBE',
          },
        },
        create: {
          userId: session.user.id,
          botId: bot.id,
          provider: 'YOUTUBE',
          status: 'ERROR',
          meta: {
            error: 'youtube_oauth_callback_failed',
          },
        },
        update: {
          status: 'ERROR',
          meta: {
            error: 'youtube_oauth_callback_failed',
          },
        },
      });

      return response.redirect(
        getWebUrl('/integrations', {
          botId: bot.id,
          youtube: 'error',
        }),
      );
    }
  }
}
