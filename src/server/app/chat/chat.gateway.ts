import { UseFilters, UseGuards } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { ChatSendMessageAction } from '@dto/chat/chat-actions';

import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { GamesService } from '../games/games.service';
import { SocketService } from '../socket/socket.service';
import { SubscribeAction } from '../subscribe-action.decorator';
import { UsersService } from '../users/users.service';
import { ValidUserSocketGuard } from '../users/valid-user-socket.guard';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserSocketGuard)
export class ChatGateway {
  constructor(
    private usersService: UsersService,
    private socketService: SocketService,
    private gamesService: GamesService
  ) {}

  @SubscribeAction(ChatSendMessageAction)
  onMessage(socket: Socket, action: ChatSendMessageAction): void {
    const userId = this.usersService.getUserBySocketId(socket.id).id;
    const gameId = action.payload.gameId;
    const targetGame = this.gamesService.getGame(gameId);

    if (targetGame.userIds.indexOf(userId) === -1) {
      throw new Error('Not valid game');
    }

    this.socketService.sendToOthersInRoom(gameId, socket, action);
  }
}
