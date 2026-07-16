import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { AuthService } from '../auth/auth.service';
import { requireSessionUser } from '../auth/require-session';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { env } from '../config/env';
import {
  startIntegrationSchema,
  type StartIntegrationDto,
} from './dto/start-integration.dto';
import { IntegrationsService } from './integrations.service';
import { YOUTUBE_OAUTH_STATE_COOKIE } from './youtube/youtube-oauth.service';

@Controller('integrations')
export class IntegrationsController {
  constructor(
    private readonly authService: AuthService,
    private readonly integrationsService: IntegrationsService,
  ) {}

  @Get()
  async getPageData(@Req() request: Request, @Query('botId') botId?: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.integrationsService.getPageData(user.id, botId);
  }

  @Post('start')
  async start(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body(new ZodValidationPipe(startIntegrationSchema))
    body: StartIntegrationDto,
  ) {
    const user = await requireSessionUser(this.authService, request);

    const result = await this.integrationsService.start(
      user.id,
      body.botId,
      body.provider,
    );

    if (result.oauthStateNonce) {
      response.cookie(YOUTUBE_OAUTH_STATE_COOKIE, result.oauthStateNonce, {
        httpOnly: true,
        maxAge: 60 * 10 * 1000,
        path: '/',
        sameSite: 'lax',
        secure: env.NODE_ENV === 'production',
      });
    }

    return {
      provider: result.provider,
      status: result.status,
      authorizationUrl: result.authorizationUrl,
    };
  }
}
