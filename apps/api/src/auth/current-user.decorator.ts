import {
  createParamDecorator,
  type ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import type { Request } from 'express';

import type { SessionUser } from './session-user';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): SessionUser => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.sessionUser) {
      throw new InternalServerErrorException(
        'CurrentUser requires SessionGuard on the route.',
      );
    }

    return request.sessionUser;
  },
);
