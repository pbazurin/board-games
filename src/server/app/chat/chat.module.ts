import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { ErrorModule } from '../error/error.module';
import { GamesModule } from '../games/games.module';
import { SocketModule } from '../socket/socket.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [ErrorModule, AuthModule, SocketModule, GamesModule],
  providers: [ChatGateway, AllExceptionsFilter]
})
export class ChatModule {}
