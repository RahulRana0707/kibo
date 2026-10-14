import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { BotsModule } from './bots/bots.module';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    AuthModule,
    WorkspacesModule,
    BotsModule,
  ],
})
export class AppModule {}
