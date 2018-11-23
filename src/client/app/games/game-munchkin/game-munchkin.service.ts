import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';

@Injectable()
export class GameMunchkinService {
  private apiBaseUrl = 'api/games/munchkin';

  constructor(private httpClient: HttpClient) {}

  startNewGame(
    createMunchkinGameDto: CreateMunchkinGameDto
  ): Observable<string> {
    return this.httpClient.post(`${this.apiBaseUrl}`, createMunchkinGameDto, {
      responseType: 'text'
    });
  }

  joinGame(gameId: string): Observable<void> {
    return this.httpClient.post<void>(
      `${this.apiBaseUrl}/${gameId}/users`,
      null
    );
  }
}
