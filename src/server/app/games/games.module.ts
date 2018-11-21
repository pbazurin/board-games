import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { ErrorModule } from '../error/error.module';
import { SocketModule } from '../socket/socket.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [ErrorModule, AuthModule, SocketModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService]
})
export class GamesModule {}
