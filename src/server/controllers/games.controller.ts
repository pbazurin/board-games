import { Controller, Get } from '@nestjs/common';

import { Observable } from 'rxjs';

import { GamesService } from '../services/games.service';
import { Game } from '../../shared/models/game/game';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Get()
  getRunningGames(): Observable<Game[]> {
    return this.gamesService.getRunningGames();
  }
}
