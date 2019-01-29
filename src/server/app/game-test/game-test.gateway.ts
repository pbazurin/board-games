import { UseFilters, UseGuards } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { GameRemovedAction, GameUserLeftAction, LeaveGameAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';

import { config } from '../../config';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { Game } from '../games/game';
import { GamesService } from '../games/games.service';
import { SocketService } from '../socket/socket.service';
import { SubscribeAction } from '../subscribe-action.decorator';
import { UsersService } from '../users/users.service';
import { ValidUserSocketGuard } from '../users/valid-user-socket.guard';
import { GameTestService } from './game-test.service';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserSocketGuard)
export class GameTestGateway implements OnGatewayInit {
  constructor(
    private usersService: UsersService,
    private socketService: SocketService,
    private gamesService: GamesService,
    private gameTestService: GameTestService
  ) {}

  afterInit() {
    this.usersService.userDisconnected$.subscribe(user => {
      this.gamesService.getRunningGames(GameType.Test).forEach(game => {
        this.leaveGame(user.id, game);
      });
    });
  }

  @SubscribeAction(LeaveGameAction)
  onLeaveGame(socket: Socket, action: LeaveGameAction): void {
    const userId = this.usersService.getUserBySocketId(socket.id).id;
    const gameId = action.payload;

    if (!this.gamesService.isGameExists(gameId, GameType.Test)) {
      return;
    }

    const targetGame = this.gamesService.getGame(gameId);

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
      this.socketService.sendToOthersInRoom(
        config.generalRoomName,
        socket,
        userLeftAction
      );
    } else {
      this.socketService.sendToAllInRoom(game.id, userLeftAction);
      this.socketService.sendToAllInRoom(
        config.generalRoomName,
        userLeftAction
      );
    }

    const targetGame = this.gamesService
      .getRunningGames(GameType.Test)
      .find(g => g.id === game.id);

    if (targetGame.players.length) {
      return;
    }

    this.gamesService.removeGame(game.id);
    const gameRemovedAction = new GameRemovedAction(game.id);

    if (socket) {
      this.socketService.sendToOthersInRoom(
        config.generalRoomName,
        socket,
        gameRemovedAction
      );
    } else {
      this.socketService.sendToAllInRoom(
        config.generalRoomName,
        gameRemovedAction
      );
    }
  }
}
