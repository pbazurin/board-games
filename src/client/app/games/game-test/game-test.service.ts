import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';

@Injectable()
export class GameTestService {
  private apiBaseUrl = 'api/games/test';

  constructor(private httpClient: HttpClient) {}

  startNewGame(createTestGameDto: CreateTestGameDto): Observable<string> {
    return this.httpClient.post(`${this.apiBaseUrl}`, createTestGameDto, {
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
