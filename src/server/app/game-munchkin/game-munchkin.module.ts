import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GamesModule } from '../games/games.module';
import { SocketModule } from '../socket/socket.module';
import { GameMunchkinController } from './game-munchkin.controller';
import { GameMunchkinGateway } from './game-munchkin.gateway';
import { GameMunchkinService } from './game-munchkin.service';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    GamesModule
  ],
  controllers: [
    GameMunchkinController
  ],
  providers: [
    GameMunchkinGateway,
    GameMunchkinService
  ],
  exports: [
    GameMunchkinService
  ]
})
export class GameMunchkinModule { }
