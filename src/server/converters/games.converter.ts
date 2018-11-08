import { GameDto } from '@dto/game/game.dto';

import { Game } from '../models/game/game';

export class GamesConverter {
  static toDto(game: Game): GameDto {
    return <GameDto>{
      id: game.id,
      type: game.type,
      authorUserId: game.authorUserId,
      createdOn: game.createdOn,
      userIds: [...game.userIds]
    };
  }
}
