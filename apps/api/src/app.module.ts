import { Module } from '@nestjs/common';

import { BotsModule } from './bots/bots.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { KnowledgeBaseModule } from './knowledge-base/knowledge-base.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    HealthModule,
    BotsModule,
    DashboardModule,
    KnowledgeBaseModule,
    IntegrationsModule,
  ],
})
export class AppModule {}
