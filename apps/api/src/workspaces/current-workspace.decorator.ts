import {
  createParamDecorator,
  type ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Request } from 'express';

import type { WorkspaceContext } from './workspace-context';

export const CurrentWorkspace = createParamDecorator(
  (_data: unknown, context: ExecutionContext): WorkspaceContext => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.workspace) {
      throw new InternalServerErrorException(
        'CurrentWorkspace requires WorkspaceGuard on the route.',
      );
    }

    return request.workspace;
  },
);
