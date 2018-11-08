import { OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { GameJoinAction, GameLeaveAction } from '@dto/game/game-actions';

import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class GamesGateway implements OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private gamesService: GamesService
  ) { }

  handleDisconnect(client: Socket) {
    const userId = this.authService.getUserIdBySocketId(client.id);
    this.gamesService.leaveAllGames(userId);
  }

  @SubscribeAction(GameJoinAction)
  onJoinGame(client: Socket, action: GameJoinAction): void {
    const userId = this.authService.getUserIdBySocketId(client.id);
    const isSuccess = this.gamesService.joinGame(userId, action.payload);

    if (isSuccess) {
      client.join(action.payload);
    }
  }

  @SubscribeAction(GameLeaveAction)
  onLeaveGame(client: Socket, action: GameLeaveAction): void {
    const userId = this.authService.getUserIdBySocketId(client.id);
    this.gamesService.leaveGame(userId, action.payload);

    client.leave(action.payload);
  }
}
