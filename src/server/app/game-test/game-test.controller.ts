import { Body, Controller, Param, Post, UseFilters, UseGuards } from '@nestjs/common';

import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';
import { GameCreatedAction, GameUserJoinedAction, UserGameRelationPayload } from '@dto/game/game-actions';
import { GameType } from '@dto/game/game-type.enum';

import { config } from '../../config';
import { BaseController } from '../base.controller';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { GamesService } from '../games/games.service';
import { SocketService } from '../socket/socket.service';
import { ConnectionId } from '../users/connection-id.decorator';
import { UsersService } from '../users/users.service';
import { ValidUserHttpGuard } from '../users/valid-user-http.guard';
import { GameTestService } from './game-test.service';

@Controller('api/games/test')
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserHttpGuard)
export class GameTestController extends BaseController {
  constructor(
    usersService: UsersService,
    socketService: SocketService,
    private gamesService: GamesService,
    private gameTestService: GameTestService
  ) {
    super(usersService, socketService);
  }

  @Post()
  startNewGame(
    @ConnectionId() connectionId: string,
    @Body() createTestGameDto: CreateTestGameDto
  ): string {
    const userId = this.usersService.getUserByConnectionId(connectionId).id;
    const newGame = this.gameTestService.createNewGame(
      userId,
      createTestGameDto
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
    const user = this.usersService.getUserByConnectionId(connectionId);
    const targetGame = this.gamesService.getGame(gameId, GameType.Test);

    this.gameTestService.addUserToGame(user, targetGame);

    const socket = this.getSocketByConnectionId(connectionId);
    socket.leave(config.generalRoomName);
    socket.join(targetGame.id);

    const userJoinedAction = new GameUserJoinedAction(<UserGameRelationPayload>{
      gameId: gameId,
      userId: user.id
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
