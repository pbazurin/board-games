import { Module } from '@nestjs/common';

import { GamesController } from './controllers/games.controller';
import { AuthGateway } from './gateways/auth.gateway';
import { GamesGateway } from './gateways/games.gateway';
import { AuthHttpGuard } from './guards/auth-http.guard';
import { AuthSocketGuard } from './guards/auth-socket.guard';
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
    AuthHttpGuard,
    AuthSocketGuard,
    SocketService,
    LoggerService,
    AuthService,
    GamesService,
    AuthGateway,
    GamesGateway
  ],
})
export class AppModule { }
