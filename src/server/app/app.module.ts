import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { GameMunchkinModule } from './game-munchkin/game-munchkin.module';
import { GameTestModule } from './game-test/game-test.module';
import { GamesModule } from './games/games.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    AuthModule,
    LoggerModule,
    ChatModule,
    GamesModule,
    GameTestModule,
    GameMunchkinModule
  ]
})
export class AppModule {}
