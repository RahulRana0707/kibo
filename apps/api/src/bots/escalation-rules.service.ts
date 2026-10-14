import { HttpStatus, Injectable } from '@nestjs/common';
import type { EscalationRuleDto, EscalationRulesInput } from '@kibo/contracts';
import type { EscalationAction, Severity } from '@prisma/client';

import { ApiException } from '../common/api-exception';
import { PrismaService } from '../prisma/prisma.service';
import type { WorkspaceContext } from '../workspaces/workspace-context';
import { toPrisma, toRuleDto } from './bots.mapper';
import { BotsService } from './bots.service';

@Injectable()
export class EscalationRulesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bots: BotsService,
  ) {}

  /**
   * Replaces a bot's rules with the list as the form shows it, so order,
   * edits, additions and removals save in one step.
   */
  async replace(
    workspace: WorkspaceContext,
    botId: string,
    input: EscalationRulesInput,
  ): Promise<EscalationRuleDto[]> {
    const bot = await this.bots.findOrThrow(this.prisma, workspace.id, botId);
    if (bot.archivedAt) {
      throw new ApiException(
        'BOT_ARCHIVED',
        `${bot.name} is archived. Restore it first.`,
        HttpStatus.CONFLICT,
      );
    }

    const rules = await this.prisma.$transaction(async (tx) => {
      await tx.escalationRule.deleteMany({ where: { botId: bot.id } });
      await tx.escalationRule.createMany({
        data: input.rules.map((rule, position) => ({
          botId: bot.id,
          trigger: rule.trigger,
          severity: toPrisma<Severity>(rule.severity),
          action: toPrisma<EscalationAction>(rule.action),
          position,
        })),
      });
      return tx.escalationRule.findMany({
        where: { botId: bot.id },
        orderBy: { position: 'asc' },
      });
    });

    return rules.map(toRuleDto);
  }
}
