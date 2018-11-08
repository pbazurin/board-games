import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { JoinGameAction, LeaveGameAction } from '@dto/game/game-actions';

import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class GamesGateway implements OnGatewayInit {
  constructor(
    private authService: AuthService,
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
    this.gamesService.leaveGame(userId, action.payload);

    client.leave(action.payload);
  }
}
