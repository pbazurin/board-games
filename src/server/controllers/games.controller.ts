import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';

import { v4 } from 'uuid';

import { AddGameDto } from '@dto/game/add-game.dto';
import { GameDto } from '@dto/game/game.dto';

import { AuthHttpGuard } from '../guards/auth-http.guard';
import { AddGameRequest } from '../models/game/add-game-request';
import { GamesService } from '../services/games.service';
import { ConnectionId } from '../utils/connection-id.decorator';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  @UseGuards(AuthHttpGuard)
  getRunningGames(@ConnectionId() connectionId: string): Promise<GameDto[]> {
    console.log(connectionId);

    return this.gamesService.getRunningGames();
  }

  @Post()
  @HttpCode(204)
  @UseGuards(AuthHttpGuard)
  startNewGame(@Body() addGameDto: AddGameDto): Promise<boolean> {
    const request = <AddGameRequest>{
      authorPlayerId: v4(),
      gameType: addGameDto.gameType
    };

    return this.gamesService.addNewGame(request);
  }

  @Delete(':gameIdToStop')
  @UseGuards(AuthHttpGuard)
  stopGame(@Param() gameIdToStop: string): Promise<boolean> {
    return this.gamesService.stopGame(gameIdToStop);
  }
}
