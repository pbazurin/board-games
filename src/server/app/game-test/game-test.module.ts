import { Module } from '@nestjs/common';

import { ErrorModule } from '../error/error.module';
import { GamesModule } from '../games/games.module';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { GameTestController } from './game-test.controller';
import { GameTestGateway } from './game-test.gateway';
import { GameTestService } from './game-test.service';

@Module({
  imports: [ErrorModule, UsersModule, SocketModule, GamesModule],
  controllers: [GameTestController],
  providers: [GameTestGateway, GameTestService],
  exports: [GameTestService]
})
export class GameTestModule {}
