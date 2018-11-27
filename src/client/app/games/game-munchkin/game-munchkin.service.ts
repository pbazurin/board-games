import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GameMunchkinDto } from '@dto/game-munchkin/game-munchkin.dto';

@Injectable()
export class GameMunchkinService {
  private apiBaseUrl = 'api/games/munchkin';

  constructor(private httpClient: HttpClient) {}

  joinGame(gameId: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.apiBaseUrl}/${gameId}/users`,
      null
    );
  }

  getGameById(gameId: string): Observable<GameMunchkinDto> {
    return this.httpClient.get<GameMunchkinDto>(`${this.apiBaseUrl}/${gameId}`);
  }
}
