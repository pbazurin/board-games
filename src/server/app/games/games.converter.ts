import { GameDto } from '@dto/game/game.dto';

import { Game } from './game';

export class GamesConverter {
  static toDto(game: Game): GameDto {
    return <GameDto>{
      id: game.id,
      type: game.type,
      name: game.name,
      authorUserId: game.authorUserId,
      createdDate: game.createdDate,
      userIds: [...game.userIds],
      maxPlayersNumber: game.maxPlayersNumber
    };
  }
}
