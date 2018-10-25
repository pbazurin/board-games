import { Module } from '@nestjs/common';

import { GamesController } from './controllers/games.controller';
import { AuthGateway } from './gateways/auth.gateway';
import { HomeGateway } from './gateways/home.gateway';
import { GamesService } from './services/games.service';

@Module({
  imports: [],
  controllers: [
    GamesController
  ],
  providers: [
    GamesService,
    HomeGateway,
    AuthGateway
  ],
})
export class AppModule { }
