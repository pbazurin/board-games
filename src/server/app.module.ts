import { Module } from '@nestjs/common';

import { GamesController } from './controllers/games.controller';
import { AuthGateway } from './gateways/auth.gateway';
import { AuthService } from './services/auth.service';
import { GamesService } from './services/games.service';

@Module({
  imports: [],
  controllers: [
    GamesController
  ],
  providers: [
    AuthService,
    GamesService,
    AuthGateway
  ],
})
export class AppModule { }
