import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';

import { AddGameDto } from '../../shared/dto/game/add-game.dto';
import { GameDto } from '../../shared/dto/game/game.dto';
import { AddGameRequest } from '../models/game/add-game-request';
import { GamesService } from '../services/games.service';
import { v4 } from 'uuid';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  getRunningGames(): Promise<GameDto[]> {
    return this.gamesService.getRunningGames();
  }

  @Post()
  @HttpCode(204)
  startNewGame(@Body() addGameDto: AddGameDto): Promise<boolean> {
    const request = <AddGameRequest>{
      authorPlayerId: v4(),
      gameType: addGameDto.gameType
    };

    return this.gamesService.addNewGame(request);
  }

  @Delete(':gameIdToStop')
  stopGame(@Param() gameIdToStop: string): Promise<boolean> {
    return this.gamesService.stopGame(gameIdToStop);
  }
}
