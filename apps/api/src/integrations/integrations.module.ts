import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { IntegrationsController } from './integrations.controller';
import { IntegrationsService } from './integrations.service';
import { YoutubeModule } from './youtube/youtube.module';

@Module({
  imports: [AuthModule, YoutubeModule],
  controllers: [IntegrationsController],
  providers: [IntegrationsService],
})
export class IntegrationsModule {}
