import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { GameDto } from '@dto/game/game.dto';

import { AddGameRequest } from '../models/game/add-game-request';

@Injectable()
export class GamesService {
  private games: GameDto[] = [];

  getRunningGames(): Promise<GameDto[]> {
    return new Promise(resolve => resolve(this.games));
  }

  addNewGame(request: AddGameRequest): Promise<boolean> {
    return new Promise(resolve => {
      this.games.push({
        id: v4(),
        authorPlayerId: request.authorPlayerId,
        createdOn: new Date(),
        playerIds: [],
        type: request.gameType
      });

      resolve(true);
    });
  }

  stopGame(gameIdToStop: string): Promise<boolean> {
    return new Promise(resolve => {
      this.games = this.games.filter(g => g.id !== gameIdToStop);

      resolve(true);
    });
  }
}
