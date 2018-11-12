import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AddGameDto } from '@dto/game/add-game.dto';
import { GameCreatedAction } from '@dto/game/game-actions';
import { GameDto } from '@dto/game/game.dto';

import { AuthHttpGuard } from '../auth/auth-http.guard';
import { AuthService } from '../auth/auth.service';
import { SocketService } from '../socket/socket.service';
import { ConnectionId } from '../utils/connection-id.decorator';
import { BaseController } from './base.controller';
import { GamesConverter } from './games.converter';
import { GamesService } from './games.service';

@Controller('api/games')
export class GamesController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService,
    private gamesService: GamesService
  ) {
    super(authService, socketService);
  }

  @Get()
  @UseGuards(AuthHttpGuard)
  getRunningGames(): GameDto[] {
    return this.gamesService.getRunningGames().map(game => GamesConverter.toDto(game));
  }

  @Post()
  @UseGuards(AuthHttpGuard)
  startNewGame(@Body() addGameDto: AddGameDto, @ConnectionId() connectionId: string): string {
    const userId = this.authService.getUserIdByConnectionId(connectionId);
    const newGameId = this.gamesService.addNewGame(userId, addGameDto.gameType);

    this.socketService.sendToOthers(this.getSocketByConnectionId(connectionId), new GameCreatedAction(newGameId));

    return newGameId;
  }
}
