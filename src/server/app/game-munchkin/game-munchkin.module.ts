import { Module } from '@nestjs/common';

import { ErrorModule } from '../error/error.module';
import { GamesModule } from '../games/games.module';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { GameMunchkinController } from './game-munchkin.controller';
import { GameMunchkinGateway } from './game-munchkin.gateway';
import { GameMunchkinService } from './game-munchkin.service';

@Module({
  imports: [ErrorModule, UsersModule, SocketModule, GamesModule],
  controllers: [GameMunchkinController],
  providers: [GameMunchkinGateway, GameMunchkinService],
  exports: [GameMunchkinService]
})
export class GameMunchkinModule {}
