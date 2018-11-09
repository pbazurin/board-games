import { UseGuards } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import {
  GameRemovedAction,
  GameUserJoinedAction,
  GameUserLeftAction,
  JoinGameAction,
  LeaveGameAction,
  UserGameRelationPayload,
} from '@dto/game/game-actions';

import { AuthSocketGuard } from '../guards/auth-socket.guard';
import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';
import { SocketService } from '../services/socket.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class GamesGateway implements OnGatewayInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private gamesService: GamesService
  ) { }

  afterInit() {
    this.authService.userDisconnected$.subscribe(connection => {
      this.gamesService.getRunningGames().forEach(game => {
        this.leaveGame(connection.userId, game.id);
      });
    });
  }

  @SubscribeAction(JoinGameAction)
  @UseGuards(AuthSocketGuard)
  onJoinGame(socket: Socket, action: JoinGameAction): void {
    const userId = this.authService.getUserIdBySocket(socket.id);
    const gameId = action.payload;
    const isSuccess = this.gamesService.joinGame(userId, gameId);

    if (isSuccess) {
      socket.join(action.payload);

      const userJoinedAction = new GameUserJoinedAction(<UserGameRelationPayload>{
        gameId: gameId,
        userId: userId
      });
      this.socketService.sendToOthers(socket, userJoinedAction);
    }
  }

  @SubscribeAction(LeaveGameAction)
  @UseGuards(AuthSocketGuard)
  onLeaveGame(socket: Socket, action: LeaveGameAction): void {
    const userId = this.authService.getUserIdBySocket(socket.id);
    const gameId = action.payload;

    this.leaveGame(userId, gameId, socket);
  }

  private leaveGame(userId: string, gameId: string, socket?: Socket) {
    const isValidGame = this.gamesService.leaveGame(userId, gameId);

    if (!isValidGame) {
      return;
    }

    const userLeftAction = new GameUserLeftAction(<UserGameRelationPayload>{
      gameId: gameId,
      userId: userId
    });

    if (socket) {
      this.socketService.sendToOthers(socket, userLeftAction);

      socket.leave(gameId);
    } else {
      this.socketService.sendToAll(userLeftAction);
    }

    const targetGame = this.gamesService.getRunningGames().find(g => g.id === gameId);

    if (targetGame.userIds.length) {
      return;
    }

    this.gamesService.removeGame(gameId);
    const gameRemovedAction = new GameRemovedAction(gameId);

    if (socket) {
      this.socketService.sendToOthers(socket, gameRemovedAction);
    } else {
      this.socketService.sendToAll(gameRemovedAction);
    }
  }
}
