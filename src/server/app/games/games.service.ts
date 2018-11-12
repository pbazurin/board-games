import { Injectable } from '@nestjs/common';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from './game';
import { GameMunchkinService } from './game-munchkin/game-munchkin.service';
import { GameTestService } from './game-test/game-test.service';

@Injectable()
export class GamesService {
  constructor(
    private gameTestService: GameTestService,
    private gameMunchkinService: GameMunchkinService
  ) { }

  private games: Game[] = [];

  getRunningGames(): Game[] {
    return this.games;
  }

  addNewGame(authorUserId: string, gameType: GameType): string {
    let newGame: Game;

    switch (gameType) {
      case GameType.Test:
        newGame = this.gameTestService.createNewGame(authorUserId);
        break;
      case GameType.Munchkin:
        newGame = this.gameMunchkinService.createNewGame(authorUserId);
        break;
    }

    this.games.push(newGame);

    return newGame.id;
  }

  canUserJoinGame(userId: string, gameId: string): boolean {
    const targetGame = this.games.find(g => g.id === gameId);

    if (!targetGame) {
      return false;
    }

    switch (targetGame.type) {
      case GameType.Test:
        return this.gameTestService.canUserJoinGame(userId, targetGame);
      case GameType.Munchkin:
        return this.gameMunchkinService.canUserJoinGame(userId, targetGame);
    }
  }

  joinGame(userId: string, gameId: string): boolean {
    const targetGame = this.games.find(g => g.id === gameId);

    if (!targetGame) {
      return false;
    }

    switch (targetGame.type) {
      case GameType.Test:
        return this.gameTestService.addUserToGame(userId, targetGame);
      case GameType.Munchkin:
        return this.gameMunchkinService.addUserToGame(userId, targetGame);
    }
  }

  leaveGame(userId: string, gameId: string): boolean {
    const targetGame = this.games.find(g => g.id === gameId);

    if (!targetGame) {
      return false;
    }

    switch (targetGame.type) {
      case GameType.Test:
        return this.gameTestService.removeUserFromGame(userId, targetGame);
      case GameType.Munchkin:
        return this.gameMunchkinService.removeUserFromGame(userId, targetGame);
    }
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
