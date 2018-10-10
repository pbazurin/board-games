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
        playerIds: [v4(), v4()],
        authorPlayerId: v4(),
        type: GameType.TestGame,
        createdOn: new Date()
      },
      {
        id: v4(),
        playerIds: [v4(), v4(), v4()],
        authorPlayerId: v4(),
        type: GameType.Munchkin,
        createdOn: new Date()
      },
    ];

    return of(games);
  }
}
