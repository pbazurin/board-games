import { Injectable, NotFoundException } from '@nestjs/common';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from './game';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  getRunningGames(): Game[] {
    return this.games;
  }

  getGame(id: string, type?: GameType): Game {
    const game = this.games.find(g => g.id === id);

    if (!game || (type && game.type !== type)) {
      throw new Error(`Game with id '${id}' wasn't found`);
    }

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
