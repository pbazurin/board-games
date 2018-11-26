import { Body, Controller, Get, Param, Post, UseFilters, UseGuards } from '@nestjs/common';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { GameMunchkinDto } from '@dto/game-munchkin/game-munchkin.dto';
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
import { GameMunchkinConverter } from './game-munchin.converter';
import { GameMunchkin } from './game-munchkin';
import { GameMunchkinService } from './game-munchkin.service';

@Controller('api/games/munchkin')
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserHttpGuard)
export class GameMunchkinController extends BaseController {
  constructor(
    usersService: UsersService,
    socketService: SocketService,
    private gamesService: GamesService,
    private gameMunchkinService: GameMunchkinService
  ) {
    super(usersService, socketService);
  }

  @Post()
  startNewGame(
    @ConnectionId() connectionId: string,
    @Body() createMunchkinGameDto: CreateMunchkinGameDto
  ): string {
    const userId = this.usersService.getUserByConnectionId(connectionId).id;
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

  @Get(':gameId')
  getGameById(@Param('gameId') gameId): GameMunchkinDto {
    const targetGame = <GameMunchkin>(
      this.gamesService.getGame(gameId, GameType.Munchkin)
    );

    return GameMunchkinConverter.toGameDto(targetGame);
  }

  @Post(':gameId/users')
  joinGame(
    @Param('gameId') gameId,
    @ConnectionId() connectionId: string
  ): void {
    const user = this.usersService.getUserByConnectionId(connectionId);
    const targetGame = <GameMunchkin>(
      this.gamesService.getGame(gameId, GameType.Munchkin)
    );

    this.gameMunchkinService.addUserToGame(user, targetGame);

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
