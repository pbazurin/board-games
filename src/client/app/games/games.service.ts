import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GameType } from '@dto/game/game-type.enum';
import { GameDto } from '@dto/game/game.dto';

import { GameMunchkinService } from './game-munchkin/game-munchkin.service';
import { GameTestService } from './game-test/game-test.service';

@Injectable()
export class GamesService {
  constructor(
    private httpClient: HttpClient,
    private gameTestService: GameTestService,
    private gameMunchkinService: GameMunchkinService
  ) { }

  getAllRunningGames(): Observable<GameDto[]> {
    return this.httpClient.get<GameDto[]>('api/games');
  }

  startNewGame(gameType: GameType): Observable<string> {
    switch (gameType) {
      case GameType.Test:
        return this.gameTestService.startNewGame();
      case GameType.Munchkin:
        return this.gameMunchkinService.startNewGame();
      default:
        throw Error('Unknown game');
    }
  }
}
