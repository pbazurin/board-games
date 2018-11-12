import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { SocketModule } from '../socket/socket.module';
import { GameMunchkinModule } from './game-munchkin/game-munchkin.module';
import { GameTestModule } from './game-test/game-test.module';
import { GamesController } from './games.controller';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';

@Module({
  imports: [
    AuthModule,
    SocketModule,
    GameTestModule,
    GameMunchkinModule
  ],
  controllers: [
    GamesController
  ],
  providers: [
    GamesService,
    GamesGateway
  ],
})
export class GamesModule { }
