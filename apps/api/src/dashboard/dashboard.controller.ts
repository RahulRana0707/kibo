import { Controller, Get, Req } from '@nestjs/common';
import type { Request } from 'express';

import { AuthService } from '../auth/auth.service';
import { requireSessionUser } from '../auth/require-session';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly authService: AuthService,
    private readonly dashboardService: DashboardService,
  ) {}

  @Get()
  async getPageData(@Req() request: Request) {
    const user = await requireSessionUser(this.authService, request);
    return this.dashboardService.getPageData(user.id);
  }
}
