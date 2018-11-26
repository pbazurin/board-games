import { Module } from '@nestjs/common';

import { ErrorModule } from '../error/error.module';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [ErrorModule, UsersModule, SocketModule],
  controllers: [GamesController],
  providers: [GamesService],
  exports: [GamesService]
})
export class GamesModule {}
