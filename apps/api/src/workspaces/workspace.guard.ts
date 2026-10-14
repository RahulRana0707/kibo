import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Request } from 'express';

import { WorkspacesService } from './workspaces.service';

/**
 * Resolves the caller’s workspace and puts it on the request. Runs after
 * `SessionGuard`: `@UseGuards(SessionGuard, WorkspaceGuard)`.
 *
 * Today every user acts in their personal workspace. When team workspaces
 * arrive, this is where a workspace header or route segment gets checked.
 */
@Injectable()
export class WorkspaceGuard implements CanActivate {
  constructor(private readonly workspaces: WorkspacesService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.sessionUser) {
      throw new InternalServerErrorException(
        'WorkspaceGuard requires SessionGuard first.',
      );
    }

    request.workspace = await this.workspaces.resolve(request.sessionUser.id);
    return true;
  }
}
