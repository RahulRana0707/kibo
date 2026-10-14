import { Injectable } from '@nestjs/common';
import {
  workspaceMetadataSchema,
  type UpdateWorkspaceInput,
  type WorkspaceDto,
} from '@kibo/contracts';
import type { Workspace } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { ensurePersonalWorkspace } from './personal-workspace';
import type { WorkspaceContext } from './workspace-context';

@Injectable()
export class WorkspacesService {
  constructor(private readonly prisma: PrismaService) {}

  /** The workspace a user acts in: their personal one, created if missing. */
  async resolve(userId: string): Promise<WorkspaceContext> {
    const workspace = await ensurePersonalWorkspace(this.prisma, {
      id: userId,
    });

    return {
      id: workspace.id,
      role: 'owner',
      botLimit: workspace.botLimit,
      defaultBotId: workspace.defaultBotId,
    };
  }

  async getCurrent(context: WorkspaceContext): Promise<WorkspaceDto> {
    const workspace = await this.prisma.workspace.findUniqueOrThrow({
      where: { id: context.id },
    });
    return this.toDto(workspace, context);
  }

  async update(
    context: WorkspaceContext,
    input: UpdateWorkspaceInput,
  ): Promise<WorkspaceDto> {
    const workspace = await this.prisma.workspace.update({
      where: { id: context.id },
      data: {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.metadata !== undefined ? { metadata: input.metadata } : {}),
      },
    });
    return this.toDto(workspace, context);
  }

  async toDto(
    workspace: Workspace,
    context: Pick<WorkspaceContext, 'role'>,
  ): Promise<WorkspaceDto> {
    const used = await this.prisma.bot.count({
      where: { workspaceId: workspace.id, archivedAt: null },
    });
    // Stored metadata was validated on write; parsing again drops anything stale
    const metadata = workspaceMetadataSchema.safeParse(workspace.metadata);

    return {
      id: workspace.id,
      name: workspace.name,
      personal: workspace.personal,
      role: context.role,
      defaultBotId: workspace.defaultBotId,
      metadata: metadata.success ? metadata.data : {},
      limits: { bots: { used, max: workspace.botLimit } },
    };
  }
}
