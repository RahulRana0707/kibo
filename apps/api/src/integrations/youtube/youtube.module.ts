import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';
import { YoutubeController } from './youtube.controller';
import { YoutubeOAuthService } from './youtube-oauth.service';

@Module({
  imports: [AuthModule],
  controllers: [YoutubeController],
  providers: [YoutubeOAuthService],
  exports: [YoutubeOAuthService],
})
export class YoutubeModule {}
