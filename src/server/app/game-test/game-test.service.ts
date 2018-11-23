import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';
import { GameType } from '@dto/game/game-type.enum';

import { Game } from '../games/game';
import { GameTest } from './game-test';

@Injectable()
export class GameTestService {
  createNewGame(
    authorUserId: string,
    createTestGameDto: CreateTestGameDto
  ): Game {
    const newGameId = v4();
    const newGame = <GameTest>{
      id: newGameId,
      name: createTestGameDto.name,
      authorUserId: authorUserId,
      createdDate: new Date(),
      userIds: [],
      type: GameType.Test,
      test: 'Test'
    };

    return newGame;
  }

  addUserToGame(userId: string, game: Game): void {
    if (game.userIds.indexOf(userId) !== -1) {
      throw new Error(`User '${userId}' already in game`);
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
