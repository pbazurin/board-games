import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from '../games/game';
import { GameMunchkin } from './game-munchkin';

@Injectable()
export class GameMunchkinService {
  createNewGame(authorUserId: string): Game {
    const newGameId = v4();
    const newGame = <GameMunchkin>{
      id: newGameId,
      authorUserId: authorUserId,
      createdOn: new Date(),
      userIds: [],
      type: GameType.Munchkin,
      munchkin: 'munchkin'
    };

    return newGame;
  }

  addUserToGame(userId: string, game: Game): void {
    if (game.userIds.indexOf(userId) !== -1) {
      throw new Error(`User '${userId}' already in game`);
    }

    if (game.userIds.length >= 1) {
      throw new Error(`1 player is maximum here`);
    }

    game.userIds.push(userId);
  }

  removeUserFromGame(userId: string, game: Game): boolean {
    if (game.userIds.indexOf(userId) === -1) {
      return false;
    }

    game.userIds = game.userIds.filter(u => u !== userId);

    return true;
  }
}
