import { UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { ChatSendMessageAction } from '@dto/chat/chat-actions';

import { AuthSocketGuard } from '../auth/auth-socket.guard';
import { AuthService } from '../auth/auth.service';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { GamesService } from '../games/games.service';
import { SubscribeAction } from '../helpers/subscribe-action.decorator';
import { SocketService } from '../socket/socket.service';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthSocketGuard)
export class ChatGateway {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private gamesService: GamesService
  ) {}

  @SubscribeAction(ChatSendMessageAction)
  onMessage(socket: Socket, action: ChatSendMessageAction): void {
    const userId = this.authService.getUserIdBySocketId(socket.id);
    const gameId = action.payload.gameId;
    const targetGame = this.gamesService.getGame(gameId);

    if (targetGame.userIds.indexOf(userId) === -1) {
      throw new Error('Not valid game');
    }

    this.socketService.sendToOthersInRoom(gameId, socket, action);
  }
}
