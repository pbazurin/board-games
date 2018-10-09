import { Injectable } from '@nestjs/common';

import { Observable, of } from 'rxjs';

import { Game } from '../../shared/models/game/game';
import { GameType } from '../../shared/models/game/game-type.enum';
import { v4 } from 'uuid';

@Injectable()
export class GamesService {
  getRunningGames(): Observable<Game[]> {
    const games = <Game[]>[
      {
        id: v4(),
        players: [
          {
            id: v4(),
            name: 'Test player 1'
          }
        ],
        type: GameType.TestGame,
        createdOn: new Date()
      },
      {
        id: v4(),
        players: [
          {
            id: v4(),
            name: 'Test player 2'
          },
          {
            id: v4(),
            name: 'Test player 3'
          }
        ],
        type: GameType.TestGame,
        createdOn: new Date()
      },
    ];

    return of(games);
  }
}
