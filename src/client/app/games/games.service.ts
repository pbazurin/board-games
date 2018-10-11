import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AddGameDto } from '../../../shared/dto/game/add-game.dto';
import { GameType } from '../../../shared/dto/game/game-type.enum';
import { GameDto } from '../../../shared/dto/game/game.dto';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClient) { }

  getAllRunningGames(): Observable<GameDto[]> {
    return this.httpClient.get<GameDto[]>('api/games');
  }

  startNewGame(gameType: GameType): Observable<boolean> {
    return this.httpClient.post<boolean>('api/games', <AddGameDto>{ gameType });
  }

  stopGame(gameIdToStop: string): Observable<boolean> {
    return this.httpClient.delete<boolean>(`api/games/${gameIdToStop}`);
  }
}
