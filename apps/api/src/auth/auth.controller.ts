import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('session')
  async getSession(@Req() request: Request) {
    return this.authService.getSession(request.headers);
  }
}
