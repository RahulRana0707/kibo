import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import type { SessionUser } from '../auth/session-user';
import { SessionGuard } from '../auth/session.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { botInputSchema, type BotInputDto } from './dto/bot.dto';
import { BotsService } from './bots.service';

@Controller('bots')
@UseGuards(SessionGuard)
export class BotsController {
  constructor(private readonly botsService: BotsService) {}

  @Get()
  async list(@CurrentUser() user: SessionUser) {
    return this.botsService.list(user.id);
  }

  @Get(':botId')
  async getOne(
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
  ) {
    return this.botsService.getOne(user.id, botId);
  }

  @Post()
  async create(
    @CurrentUser() user: SessionUser,
    @Body(new ZodValidationPipe(botInputSchema)) body: BotInputDto,
  ) {
    return this.botsService.create(user.id, body);
  }

  @Patch(':botId')
  async update(
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
    @Body(new ZodValidationPipe(botInputSchema)) body: BotInputDto,
  ) {
    return this.botsService.update(user.id, botId, body);
  }

  @Delete(':botId')
  async delete(
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
  ) {
    return this.botsService.delete(user.id, botId);
  }

  @Post(':botId/active')
  async setActive(
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
  ) {
    return this.botsService.setActive(user.id, botId);
  }
}
