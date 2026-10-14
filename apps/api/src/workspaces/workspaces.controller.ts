import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import {
  updateWorkspaceSchema,
  type UpdateWorkspaceInput,
} from '@kibo/contracts';

import { SessionGuard } from '../auth/session.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CurrentWorkspace } from './current-workspace.decorator';
import type { WorkspaceContext } from './workspace-context';
import { WorkspaceGuard } from './workspace.guard';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
@UseGuards(SessionGuard, WorkspaceGuard)
export class WorkspacesController {
  constructor(private readonly workspaces: WorkspacesService) {}

  @Get('current')
  getCurrent(@CurrentWorkspace() workspace: WorkspaceContext) {
    return this.workspaces.getCurrent(workspace);
  }

  @Patch('current')
  update(
    @CurrentWorkspace() workspace: WorkspaceContext,
    @Body(new ZodValidationPipe(updateWorkspaceSchema))
    body: UpdateWorkspaceInput,
  ) {
    return this.workspaces.update(workspace, body);
  }
}
