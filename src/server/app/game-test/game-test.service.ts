import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { CreateTestGameDto } from '@dto/game-test/create-test-game.dto';
import { GameType } from '@dto/game/game-type.enum';

import { User } from '../users/user';
import { GameTest } from './game-test';

@Injectable()
export class GameTestService {
  createNewGame(
    authorUserId: string,
    createTestGameDto: CreateTestGameDto
  ): GameTest {
    const newGameId = v4();
    const newGame = <GameTest>{
      id: newGameId,
      name: createTestGameDto.name,
      authorUserId: authorUserId,
      createdDate: new Date(),
      players: [],
      type: GameType.Test,
      test: 'Test'
    };

    return newGame;
  }

  addUserToGame(user: User, game: GameTest): void {
    if (game.players.find(p => p.id === user.id)) {
      throw new Error(`User already in game`);
    }

    game.players.push({ ...user });
  }

  removeUserFromGame(userId: string, game: GameTest): boolean {
    if (!game.players.find(p => p.id === userId)) {
      return false;
    }

    game.players = game.players.filter(p => p.id !== userId);

    return true;
  }
}
