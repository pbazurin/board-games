import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AddGameDto } from '@dto/game/add-game.dto';
import { GameDto } from '@dto/game/game.dto';

import { GamesConverter } from '../converters/games.converter';
import { AuthHttpGuard } from '../guards/auth-http.guard';
import { AuthService } from '../services/auth.service';
import { GamesService } from '../services/games.service';
import { ConnectionId } from '../utils/connection-id.decorator';

@Controller('api/games')
export class GamesController {
  constructor(
    private gamesService: GamesService,
    private authService: AuthService
  ) { }

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

    return newGameId;
  }
}
