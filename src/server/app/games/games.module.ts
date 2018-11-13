import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { SocketModule } from '../socket/socket.module';
import { GamesController } from './games.controller';
import { GamesGateway } from './games.gateway';
import { GamesService } from './games.service';

@Module({
  imports: [
    AuthModule,
    SocketModule
  ],
  controllers: [
    GamesController
  ],
  providers: [
    GamesService,
    GamesGateway
  ],
  exports: [
    GamesService
  ]
})
export class GamesModule { }
