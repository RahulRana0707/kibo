import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { requireSessionUser } from '../auth/require-session';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { botInputSchema, type BotInputDto } from './dto/bot.dto';
import { BotsService } from './bots.service';

@Controller('bots')
export class BotsController {
  constructor(
    private readonly authService: AuthService,
    private readonly botsService: BotsService,
  ) {}

  @Get()
  async list(@Req() request: Request) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.list(user.id);
  }

  @Get(':botId')
  async getOne(@Req() request: Request, @Param('botId') botId: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.getOne(user.id, botId);
  }

  @Post()
  async create(
    @Req() request: Request,
    @Body(new ZodValidationPipe(botInputSchema)) body: BotInputDto,
  ) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.create(user.id, body);
  }

  @Patch(':botId')
  async update(
    @Req() request: Request,
    @Param('botId') botId: string,
    @Body(new ZodValidationPipe(botInputSchema)) body: BotInputDto,
  ) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.update(user.id, botId, body);
  }

  @Delete(':botId')
  async delete(@Req() request: Request, @Param('botId') botId: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.delete(user.id, botId);
  }

  @Post(':botId/active')
  async setActive(@Req() request: Request, @Param('botId') botId: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.botsService.setActive(user.id, botId);
  }
}
