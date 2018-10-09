import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Game } from '../../../shared/models/game/game';

@Injectable()
export class GamesService {
  constructor(private httpClient: HttpClient) { }

  getAllRunningGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>('api/games');
  }
}
