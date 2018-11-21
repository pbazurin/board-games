import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { GameDto } from '@dto/game/game.dto';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClient) {}

  getAllRunningGames(): Observable<GameDto[]> {
    return this.httpClient.get<GameDto[]>('api/games');
  }
}
