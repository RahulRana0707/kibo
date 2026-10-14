import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';
import { BotsController } from './bots.controller';
import { BotsService } from './bots.service';
import { EscalationRulesService } from './escalation-rules.service';

@Module({
  imports: [AuthModule, WorkspacesModule],
  controllers: [BotsController],
  providers: [BotsService, EscalationRulesService],
})
export class BotsModule {}
