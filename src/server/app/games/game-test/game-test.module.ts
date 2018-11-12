import { Module } from '@nestjs/common';

import { AuthModule } from '../../auth/auth.module';
import { SocketModule } from '../../socket/socket.module';
import { GameTestController } from './game-test.controller';
import { GameTestGateway } from './game-test.gateway';
import { GameTestService } from './game-test.service';

@Module({
  imports: [
    AuthModule,
    SocketModule
  ],
  controllers: [
    GameTestController
  ],
  providers: [
    GameTestGateway,
    GameTestService
  ],
  exports: [
    GameTestService
  ]
})
export class GameTestModule { }
