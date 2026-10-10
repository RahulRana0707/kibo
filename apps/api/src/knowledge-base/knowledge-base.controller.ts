import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/current-user.decorator';
import type { SessionUser } from '../auth/session-user';
import { SessionGuard } from '../auth/session.guard';
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
@UseGuards(SessionGuard)
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  @Get()
  async getPageData(
    @CurrentUser() user: SessionUser,
    @Query('botId') botId?: string,
  ) {
    return this.knowledgeBaseService.getPageData(user.id, botId);
  }

  @Post()
  async create(
    @CurrentUser() user: SessionUser,
    @Body(new ZodValidationPipe(createKnowledgeItemSchema))
    body: CreateKnowledgeItemDto,
  ) {
    return this.knowledgeBaseService.create(user.id, body);
  }

  @Post('faq/import')
  async importFaqCsv(
    @CurrentUser() user: SessionUser,
    @Body(new ZodValidationPipe(importFaqCsvSchema))
    body: ImportFaqCsvDto,
  ) {
    return this.knowledgeBaseService.importFaqCsv(user.id, body);
  }

  @Patch(':itemId')
  async update(
    @CurrentUser() user: SessionUser,
    @Param('itemId') itemId: string,
    @Body(new ZodValidationPipe(updateKnowledgeItemSchema))
    body: UpdateKnowledgeItemDto,
  ) {
    return this.knowledgeBaseService.update(user.id, itemId, body);
  }

  @Delete(':itemId')
  async delete(
    @CurrentUser() user: SessionUser,
    @Param('itemId') itemId: string,
  ) {
    return this.knowledgeBaseService.delete(user.id, itemId);
  }
}
