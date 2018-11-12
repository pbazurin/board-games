import { Module } from '@nestjs/common';

import { GameMunchkinController } from './game-munchkin.controller';
import { GameMunchkinGateway } from './game-munchkin.gateway';

@Module({
  imports: [],
  controllers: [
    GameMunchkinController
  ],
  providers: [
    GameMunchkinGateway
  ],
})
export class GameMunchkinModule { }
