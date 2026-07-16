import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { requireSessionUser } from '../auth/require-session';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  createKnowledgeItemSchema,
  type CreateKnowledgeItemDto,
  importFaqCsvSchema,
  type ImportFaqCsvDto,
  type UpdateKnowledgeItemDto,
  updateKnowledgeItemSchema,
} from './dto/knowledge-item.dto';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(
    private readonly authService: AuthService,
    private readonly knowledgeBaseService: KnowledgeBaseService,
  ) {}

  @Get()
  async getPageData(@Req() request: Request, @Query('botId') botId?: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.knowledgeBaseService.getPageData(user.id, botId);
  }

  @Post()
  async create(
    @Req() request: Request,
    @Body(new ZodValidationPipe(createKnowledgeItemSchema))
    body: CreateKnowledgeItemDto,
  ) {
    const user = await requireSessionUser(this.authService, request);
    return this.knowledgeBaseService.create(user.id, body);
  }

  @Post('faq/import')
  async importFaqCsv(
    @Req() request: Request,
    @Body(new ZodValidationPipe(importFaqCsvSchema))
    body: ImportFaqCsvDto,
  ) {
    const user = await requireSessionUser(this.authService, request);
    return this.knowledgeBaseService.importFaqCsv(user.id, body);
  }

  @Patch(':itemId')
  async update(
    @Req() request: Request,
    @Param('itemId') itemId: string,
    @Body(new ZodValidationPipe(updateKnowledgeItemSchema))
    body: UpdateKnowledgeItemDto,
  ) {
    const user = await requireSessionUser(this.authService, request);
    return this.knowledgeBaseService.update(user.id, itemId, body);
  }

  @Delete(':itemId')
  async delete(@Req() request: Request, @Param('itemId') itemId: string) {
    const user = await requireSessionUser(this.authService, request);
    return this.knowledgeBaseService.delete(user.id, itemId);
  }
}
