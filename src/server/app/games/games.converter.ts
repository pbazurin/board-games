import { GameDto } from '@dto/game/game.dto';

import { UsersConverter } from '../users/users.converter';
import { Game } from './game';

export class GamesConverter {
  static toDto(game: Game): GameDto {
    const gameDto = <GameDto>{
      id: game.id,
      type: game.type,
      name: game.name,
      authorUserId: game.authorUserId,
      createdDate: game.createdDate,
      players: game.players.map(p => UsersConverter.toDto(p)),
      maxPlayersNumber: game.maxPlayersNumber
    };

    return gameDto;
  }
}
