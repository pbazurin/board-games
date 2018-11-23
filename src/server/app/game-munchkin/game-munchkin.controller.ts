import { Body, Controller, Param, Post, UseFilters, UseGuards } from '@nestjs/common';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { GameCreatedAction, GameUserJoinedAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';

import { config } from '../../config';
import { AuthHttpGuard } from '../auth/auth-http.guard';
import { AuthService } from '../auth/auth.service';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { GamesService } from '../games/games.service';
import { BaseController } from '../helpers/base.controller';
import { ConnectionId } from '../helpers/connection-id.decorator';
import { SocketService } from '../socket/socket.service';
import { GameMunchkinService } from './game-munchkin.service';

@Controller('api/games/munchkin')
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthHttpGuard)
export class GameMunchkinController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService,
    private gamesService: GamesService,
    private gameMunchkinService: GameMunchkinService
  ) {
    super(authService, socketService);
  }

  @Post()
  startNewGame(
    @ConnectionId() connectionId: string,
    @Body() createMunchkinGameDto: CreateMunchkinGameDto
  ): string {
    const userId = this.authService.getUserIdByConnectionId(connectionId);
    const newGame = this.gameMunchkinService.createNewGame(
      userId,
      createMunchkinGameDto
    );

    this.gamesService.addNewGame(newGame);

    const socket = this.getSocketByConnectionId(connectionId);
    this.socketService.sendToOthersInRoom(
      config.generalRoomName,
      socket,
      new GameCreatedAction(newGame.id)
    );

    return newGame.id;
  }

  @Post(':gameId/users')
  joinGame(
    @Param('gameId') gameId,
    @ConnectionId() connectionId: string
  ): void {
    const userId = this.authService.getUserIdByConnectionId(connectionId);
    const targetGame = this.gamesService.getGame(gameId, GameType.Munchkin);

    this.gameMunchkinService.addUserToGame(userId, targetGame);

    const socket = this.getSocketByConnectionId(connectionId);
    socket.leave(config.generalRoomName);
    socket.join(targetGame.id);

    const userJoinedAction = new GameUserJoinedAction(<UserGameRelationPayload>{
      gameId: gameId,
      userId: userId
    });
    this.socketService.sendToOthersInRoom(
      config.generalRoomName,
      socket,
      userJoinedAction
    );
    this.socketService.sendToOthersInRoom(
      targetGame.id,
      socket,
      userJoinedAction
    );
  }
}
