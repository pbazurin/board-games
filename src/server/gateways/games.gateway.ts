import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import {
  GameRemovedAction,
  GameUserLeftAction,
  JoinGameAction,
  LeaveGameAction,
  UserGameRelationPayload,
} from '@dto/game/game-actions';

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
    this.authService.userDisconnected$.subscribe(c => this.gamesService.leaveAllGames(c.userId));
  }

  @SubscribeAction(JoinGameAction)
  onJoinGame(client: Socket, action: JoinGameAction): void {
    const userId = this.authService.getUserIdBySocketId(client.id);
    const isSuccess = this.gamesService.joinGame(userId, action.payload);

    if (isSuccess) {
      client.join(action.payload);
    }
  }

  @SubscribeAction(LeaveGameAction)
  onLeaveGame(client: Socket, action: LeaveGameAction): void {
    const userId = this.authService.getUserIdBySocketId(client.id);
    const targetGameId = action.payload;
    this.gamesService.leaveGame(userId, action.payload);

    const userLeftAction = new GameUserLeftAction(<UserGameRelationPayload>{
      gameId: targetGameId,
      userId: userId
    });
    this.socketService.broadcastToOther(client, userLeftAction);

    client.leave(targetGameId);

    const targetGame = this.gamesService.getRunningGames().find(g => g.id === targetGameId);
    if (!targetGame.userIds.length) {
      this.gamesService.removeGame(targetGameId);

      this.socketService.broadcastToOther(client, new GameRemovedAction(targetGameId));
    }
  }
}
