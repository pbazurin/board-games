import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { GameType } from '@dto/game/game-type.enum';

import { Game } from '../games/game';
import { GameMunchkin } from './game-munchkin';
import { gameMunchkinConfig } from './game-munchkin.config';

@Injectable()
export class GameMunchkinService {
  createNewGame(
    authorUserId: string,
    createMunchkinGameDto: CreateMunchkinGameDto
  ): Game {
    const newGameId = v4();
    const newGame = <GameMunchkin>{
      id: newGameId,
      name: createMunchkinGameDto.name,
      authorUserId: authorUserId,
      createdDate: new Date(),
      userIds: [],
      type: GameType.Munchkin,
      maxPlayersNumber: gameMunchkinConfig.maxPlayersNumber
    };

    return newGame;
  }

  addUserToGame(userId: string, game: Game): void {
    if (game.userIds.indexOf(userId) !== -1) {
      throw new Error(`User already in game`);
    }

    if (game.userIds.length >= gameMunchkinConfig.maxPlayersNumber) {
      throw new Error(`No free player slot`);
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
