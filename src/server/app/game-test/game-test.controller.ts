import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { GameCreatedAction, GameUserJoinedAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';

import { config } from '../../config';
import { AuthHttpGuard } from '../auth/auth-http.guard';
import { AuthService } from '../auth/auth.service';
import { GamesService } from '../games/games.service';
import { BaseController } from '../helpers/base.controller';
import { ConnectionId } from '../helpers/connection-id.decorator';
import { SocketService } from '../socket/socket.service';
import { GameTestService } from './game-test.service';

@Controller('api/games/test')
export class GameTestController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService,
    private gamesService: GamesService,
    private gameTestService: GameTestService
  ) {
    super(authService, socketService);
  }

  @Post()
  @UseGuards(AuthHttpGuard)
  startNewGame(@ConnectionId() connectionId: string): string {
    const userId = this.authService.getUserIdByConnectionId(connectionId);
    const newGame = this.gameTestService.createNewGame(userId);

    this.gamesService.addNewGame(newGame);

    const socket = this.getSocketByConnectionId(connectionId);
    this.socketService.sendToOthersInRoom(config.generalRoomName, socket, new GameCreatedAction(newGame.id));

    return newGame.id;
  }

  @Post(':gameId/users')
  @UseGuards(AuthHttpGuard)
  joinGame(@Param('gameId') gameId, @ConnectionId() connectionId: string): void {
    const userId = this.authService.getUserIdByConnectionId(connectionId);
    const targetGame = this.gamesService.getGame(gameId, GameType.Test);

    this.gameTestService.addUserToGame(userId, targetGame);

    const socket = this.getSocketByConnectionId(connectionId);
    socket.leave(config.generalRoomName);
    socket.join(targetGame.id);

    const userJoinedAction = new GameUserJoinedAction(<UserGameRelationPayload>{
      gameId: gameId,
      userId: userId
    });
    this.socketService.sendToOthersInRoom(config.generalRoomName, socket, userJoinedAction);
    this.socketService.sendToOthersInRoom(targetGame.id, socket, userJoinedAction);
  }
}
