import { Module } from '@nestjs/common';

import { GameTestController } from './game-test.controller';
import { GameTestGateway } from './game-test.gateway';

@Module({
  imports: [],
  controllers: [
    GameTestController
  ],
  providers: [
    GameTestGateway
  ],
})
export class GameTestModule { }
