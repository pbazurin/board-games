import { Module } from '@nestjs/common';

import { GamesController } from './controllers/games.controller';
import { AuthGateway } from './gateways/auth.gateway';
import { GamesGateway } from './gateways/games.gateway';
import { AuthService } from './services/auth.service';
import { GamesService } from './services/games.service';
import { LoggerService } from './services/logger.service';
import { SocketService } from './services/socket.service';

@Module({
  imports: [],
  controllers: [
    GamesController
  ],
  providers: [
    SocketService,
    LoggerService,
    AuthService,
    GamesService,
    AuthGateway,
    GamesGateway
  ],
})
export class AppModule { }
