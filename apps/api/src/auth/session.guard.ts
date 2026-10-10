import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const session = await this.authService.getSession(request.headers);

    if (!session?.user.id) {
      throw new UnauthorizedException('Authentication is required.');
    }

    request.sessionUser = { id: session.user.id };

    return true;
  }
}
