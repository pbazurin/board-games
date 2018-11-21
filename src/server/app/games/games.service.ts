import { Injectable } from '@nestjs/common';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from './game';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  getRunningGames(): Game[] {
    return this.games;
  }

  isGameExists(id: string, type?: GameType) {
    const game = this.games.find(g => g.id === id);

    return game && (!type || game.type === type);
  }

  getGame(id: string, type?: GameType): Game {
    if (!this.isGameExists(id, type)) {
      throw new Error(`Game with id '${id}' doesn't exists`);
    }

    const game = this.games.find(g => g.id === id);

    return game;
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
