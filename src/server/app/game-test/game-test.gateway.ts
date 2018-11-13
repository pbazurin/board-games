import { UseGuards } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { GameRemovedAction, GameUserLeftAction, LeaveGameAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';

import { config } from '../../config';
import { AuthSocketGuard } from '../auth/auth-socket.guard';
import { AuthService } from '../auth/auth.service';
import { Game } from '../games/game';
import { GamesService } from '../games/games.service';
import { SubscribeAction } from '../helpers/subscribe-action.decorator';
import { SocketService } from '../socket/socket.service';
import { GameTestService } from './game-test.service';

@WebSocketGateway()
export class GameTestGateway implements OnGatewayInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private gamesService: GamesService,
    private gameTestService: GameTestService
  ) { }

  afterInit() {
    this.authService.userDisconnected$.subscribe(connection => {
      this.gamesService.getRunningGames()
        .filter(g => g.type === GameType.Test)
        .forEach(game => {
          this.leaveGame(connection.userId, game);
        });
    });
  }

  @SubscribeAction(LeaveGameAction)
  @UseGuards(AuthSocketGuard)
  onLeaveGame(socket: Socket, action: LeaveGameAction): void {
    const userId = this.authService.getUserIdBySocketId(socket.id);
    const gameId = action.payload;
    const targetGame = this.gamesService.getGameById(gameId);

    if (targetGame.type !== GameType.Test) {
      return;
    }

    this.leaveGame(userId, targetGame, socket);
  }

  private leaveGame(userId: string, game: Game, socket?: Socket) {
    const isValidGame = this.gameTestService.removeUserFromGame(userId, game);

    if (!isValidGame) {
      return;
    }

    const userLeftAction = new GameUserLeftAction(<UserGameRelationPayload>{
      gameId: game.id,
      userId: userId
    });

    if (socket) {
      socket.leave(game.id);
      this.socketService.sendToOthersInRoom(game.id, socket, userLeftAction);

      socket.join(config.generalRoomName);
      this.socketService.sendToOthersInRoom(config.generalRoomName, socket, userLeftAction);
    } else {
      this.socketService.sendToAllInRoom(game.id, userLeftAction);
      this.socketService.sendToAllInRoom(config.generalRoomName, userLeftAction);
    }

    const targetGame = this.gamesService.getRunningGames().find(g => g.id === game.id);

    if (targetGame.userIds.length) {
      return;
    }

    this.gamesService.removeGame(game.id);
    const gameRemovedAction = new GameRemovedAction(game.id);

    if (socket) {
      this.socketService.sendToOthersInRoom(config.generalRoomName, socket, gameRemovedAction);
    } else {
      this.socketService.sendToAllInRoom(config.generalRoomName, gameRemovedAction);
    }
  }
}