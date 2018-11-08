import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from '../models/game/game';

@Injectable()
export class GamesService {
  private games: Game[] = [];

  getRunningGames(): Game[] {
    return this.games;
  }

  addNewGame(authorUserId: string, gameType: GameType): string {
    const newGameId = v4();
    this.games.push({
      id: newGameId,
      authorUserId: authorUserId,
      createdOn: new Date(),
      userIds: [],
      type: gameType
    });

    return newGameId;
  }

  joinGame(userId: string, gameId: string): boolean {
    const targetGame = this.games.find(g => g.id === gameId);

    if (!targetGame) {
      console.log('No game');
      return false;
    }

    if (targetGame.userIds.indexOf(userId) === -1) {
      targetGame.userIds.push(userId);
    }

    return true;
  }

  leaveGame(userId: string, gameId: string): void {
    const targetGame = this.games.find(g => g.id === gameId);

    if (!targetGame) {
      return;
    }

    targetGame.userIds = targetGame.userIds.filter(u => u !== userId);
  }

  leaveAllGames(userId: string): void {
    this.games.forEach(g => this.leaveGame(userId, g.id));
  }

  removeGame(gameId: string) {
    this.games = this.games.filter(g => g.id !== gameId);
  }
}
