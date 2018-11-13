import { Injectable } from '@nestjs/common';

import { Game } from './game';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  getRunningGames(): Game[] {
    return this.games;
  }

  getGameById(gameId: string): Game {
    return this.games.find(g => g.id === gameId);
  }

  addNewGame(newGame: Game): void {
    this.games.push(newGame);
  }

  removeGame(gameId: string): boolean {
    const isGameExists = this.games.some(g => g.id === gameId);

    if (!isGameExists) {
      return false;
    }

    this.games = this.games.filter(g => g.id !== gameId);
    return true;
  }
}
