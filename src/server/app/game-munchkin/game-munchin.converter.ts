import { GameMunchkinDto } from '@dto/game-munchkin/game-munchkin.dto';
import { MunchkinPlayerDto } from '@dto/game-munchkin/munchkin-player.dto';

import { GameMunchkin } from './game-munchkin';
import { MunchkinPlayer } from './munchkin-player';

export class GameMunchkinConverter {
  static toGameDto(game: GameMunchkin): GameMunchkinDto {
    const gameDto = <GameMunchkinDto>{
      id: game.id,
      authorUserId: game.authorUserId,
      createdDate: game.createdDate,
      name: game.name,
      maxPlayersNumber: game.maxPlayersNumber,
      players: game.players.map(p => this.toPlayerDto(p))
    };

    return gameDto;
  }

  static toPlayerDto(player: MunchkinPlayer): MunchkinPlayerDto {
    const playerDto = <MunchkinPlayerDto>{
      id: player.id,
      name: player.name,
      language: player.language,
      level: player.level,
      cardIdsInHands: [...player.cardIdsInHands], // TODO: show only my cards
      cardIdsOnTable: [...player.cardIdsInHands]
    };

    return playerDto;
  }
}
