import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  botListQuerySchema,
  createBotSchema,
  deleteBotSchema,
  escalationRulesSchema,
  updateBotSchema,
  type BotListQuery,
  type CreateBotInput,
  type DeleteBotInput,
  type EscalationRulesInput,
  type UpdateBotInput,
} from '@kibo/contracts';

import { CurrentUser } from '../auth/current-user.decorator';
import type { SessionUser } from '../auth/session-user';
import { SessionGuard } from '../auth/session.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CurrentWorkspace } from '../workspaces/current-workspace.decorator';
import type { WorkspaceContext } from '../workspaces/workspace-context';
import { WorkspaceGuard } from '../workspaces/workspace.guard';
import { BotsService } from './bots.service';
import { EscalationRulesService } from './escalation-rules.service';

/**
 * Bots in the caller's workspace. Every response is wrapped in the
 * `{ status, result, error }` envelope by the global interceptor and filter.
 */
@Controller('bots')
@UseGuards(SessionGuard, WorkspaceGuard)
export class BotsController {
  constructor(
    private readonly bots: BotsService,
    private readonly rules: EscalationRulesService,
  ) {}

  @Get()
  list(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Query(new ZodValidationPipe(botListQuerySchema)) query: BotListQuery,
  ) {
    return this.bots.list(workspace, query);
  }

  @Post()
  create(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @CurrentUser() user: SessionUser,
    @Body(new ZodValidationPipe(createBotSchema)) body: CreateBotInput,
  ) {
    return this.bots.create(workspace, user.id, body);
  }

  @Get(':botId')
  get(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
  ) {
    return this.bots.get(workspace, botId);
  }

  @Patch(':botId')
  update(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
    @Body(new ZodValidationPipe(updateBotSchema)) body: UpdateBotInput,
  ) {
    return this.bots.update(workspace, botId, body);
  }

  @Put(':botId/escalation-rules')
  replaceEscalationRules(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
    @Body(new ZodValidationPipe(escalationRulesSchema))
    body: EscalationRulesInput,
  ) {
    return this.rules.replace(workspace, botId, body);
  }

  @Post(':botId/pause')
  @HttpCode(HttpStatus.OK)
  pause(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
  ) {
    return this.bots.pause(workspace, user.id, botId);
  }

  @Post(':botId/resume')
  @HttpCode(HttpStatus.OK)
  resume(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
  ) {
    return this.bots.resume(workspace, botId);
  }

  @Post(':botId/archive')
  @HttpCode(HttpStatus.OK)
  archive(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
  ) {
    return this.bots.archive(workspace, botId);
  }

  @Post(':botId/restore')
  @HttpCode(HttpStatus.OK)
  restore(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
  ) {
    return this.bots.restore(workspace, botId);
  }

  @Post(':botId/duplicate')
  duplicate(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @CurrentUser() user: SessionUser,
    @Param('botId') botId: string,
  ) {
    return this.bots.duplicate(workspace, user.id, botId);
  }

  @Post(':botId/make-default')
  @HttpCode(HttpStatus.OK)
  makeDefault(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
  ) {
    return this.bots.makeDefault(workspace, botId);
  }

  @Delete(':botId')
  remove(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Param('botId') botId: string,
    @Body(new ZodValidationPipe(deleteBotSchema)) body: DeleteBotInput,
  ) {
    return this.bots.remove(workspace, botId, body.confirmName);
  }
}
