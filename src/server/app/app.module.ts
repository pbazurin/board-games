import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module';
import { GameMunchkinModule } from './game-munchkin/game-munchkin.module';
import { GameTestModule } from './game-test/game-test.module';
import { GamesModule } from './games/games.module';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    LoggerModule,
    ChatModule,
    GamesModule,
    GameTestModule,
    GameMunchkinModule
  ]
})
export class AppModule {}
