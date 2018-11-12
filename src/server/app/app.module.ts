import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    GamesModule,
  ],
  controllers: [
  ],
  providers: [
  ],
})
export class AppModule { }
