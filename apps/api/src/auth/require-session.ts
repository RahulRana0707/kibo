import { UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';

export async function requireSessionUser(
  authService: AuthService,
  request: Request,
) {
  const session = await authService.getSession(request.headers);

  if (!session?.user.id) {
    throw new UnauthorizedException('Authentication is required.');
  }

  return {
    id: session.user.id,
  };
}
