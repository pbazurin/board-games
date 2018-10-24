import { Module } from '@nestjs/common';

import { GamesController } from './controllers/games.controller';
import { HomeGateway } from './gateways/home.gateway';
import { GamesService } from './services/games.service';

@Module({
  imports: [],
  controllers: [
    GamesController
  ],
  providers: [
    GamesService,
    HomeGateway
  ],
})
export class AppModule { }
