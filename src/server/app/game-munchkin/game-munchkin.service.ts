import { Injectable } from '@nestjs/common';

import { v4 } from 'uuid';

import { CreateMunchkinGameDto } from '@dto/game-munchkin/create-munchkin-game.dto';
import { GameType } from '@dto/game/game-type.enum';

import { User } from '../users/user';
import { GameMunchkin } from './game-munchkin';
import { gameMunchkinConfig } from './game-munchkin.config';
import { MunchkinPlayer } from './munchkin-player';

@Injectable()
export class GameMunchkinService {
  createNewGame(
    authorUserId: string,
    createMunchkinGameDto: CreateMunchkinGameDto
  ): GameMunchkin {
    const newGameId = v4();
    const newGame = <GameMunchkin>{
      id: newGameId,
      name: createMunchkinGameDto.name,
      authorUserId: authorUserId,
      createdDate: new Date(),
      players: [],
      type: GameType.Munchkin,
      maxPlayersNumber: gameMunchkinConfig.maxPlayersNumber
    };

    return newGame;
  }

  addUserToGame(user: User, game: GameMunchkin): void {
    if (game.players.find(p => p.id === user.id)) {
      throw new Error(`User already in game`);
    }

    if (game.players.length >= gameMunchkinConfig.maxPlayersNumber) {
      throw new Error(`No free player slot`);
    }

    const newPlayer = <MunchkinPlayer>{
      ...user,
      level: 1,
      cardIdsInHands: [],
      cardIdsOnTable: []
    };

    game.players.push(newPlayer);
  }

  removeUserFromGame(userId: string, game: GameMunchkin): boolean {
    if (!game.players.find(p => p.id === userId)) {
      return false;
    }

    game.players = game.players.filter(p => p.id !== userId);

    return true;
  }
}
