import { Module } from '@nestjs/common';

import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { ErrorModule } from '../error/error.module';
import { GamesModule } from '../games/games.module';
import { SocketModule } from '../socket/socket.module';
import { UsersModule } from '../users/users.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ErrorModule, UsersModule, SocketModule, GamesModule],
  providers: [ChatGateway, AllExceptionsFilter]
})
export class ChatModule {}
