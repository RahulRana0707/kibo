import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

import { CurrentUser } from '../auth/current-user.decorator';
import type { SessionUser } from '../auth/session-user';
import { SessionGuard } from '../auth/session.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { env } from '../config/env';
import {
  startIntegrationSchema,
  type StartIntegrationDto,
} from './dto/start-integration.dto';
import { IntegrationsService } from './integrations.service';
import { YOUTUBE_OAUTH_STATE_COOKIE } from './youtube/youtube-oauth.service';

@Controller('integrations')
@UseGuards(SessionGuard)
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  async getPageData(
    @CurrentUser() user: SessionUser,
    @Query('botId') botId?: string,
  ) {
    return this.integrationsService.getPageData(user.id, botId);
  }

  @Post('start')
  async start(
    @CurrentUser() user: SessionUser,
    @Res({ passthrough: true }) response: Response,
    @Body(new ZodValidationPipe(startIntegrationSchema))
    body: StartIntegrationDto,
  ) {
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
