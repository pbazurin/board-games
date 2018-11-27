import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';
import { GameDto } from '@dto/game/game.dto';

@Injectable()
export class GamesService {
  private apiBaseUrl = 'api/games';

  constructor(private httpClient: HttpClient) {}

  getAllRunningGames(): Observable<GameDto[]> {
    return this.httpClient.get<GameDto[]>(`${this.apiBaseUrl}`);
  }

  startNewTestGame(createTestGameDto: CreateTestGameDto): Observable<string> {
    return this.httpClient.post(`${this.apiBaseUrl}/test`, createTestGameDto, {
      responseType: 'text'
    });
  }

  startNewMunchkinGame(
    createMunchkinGameDto: CreateMunchkinGameDto
  ): Observable<string> {
    return this.httpClient.post(
      `${this.apiBaseUrl}/munchkin`,
      createMunchkinGameDto,
      {
        responseType: 'text'
      }
    );
  }
}
