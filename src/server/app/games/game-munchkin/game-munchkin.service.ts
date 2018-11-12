import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { GameType } from '@dto/game/game-type.enum';

import { Game } from '../game';
import { GameBaseService } from '../game-base.service';
import { GameMunchkin } from './game-munchkin';

@Injectable()
export class GameMunchkinService implements GameBaseService {
  createNewGame(authorUserId: string): Game {
    const newGameId = v4();
    const newGame = <GameMunchkin>{
      id: newGameId,
      authorUserId: authorUserId,
      createdOn: new Date(),
      userIds: [],
      type: GameType.Test,
      munchkin: 'Munchkin'
    };

    return newGame;
  }

  canUserJoinGame(userId: string, game: Game): boolean {
    return true;
  }

  addUserToGame(userId: string, game: Game): boolean {
    if (game.userIds.indexOf(userId) === -1) {
      game.userIds.push(userId);
    }

    return true;
  }

  removeUserFromGame(userId: string, game: Game): boolean {
    game.userIds = game.userIds.filter(u => u !== userId);

    return true;
  }
}
