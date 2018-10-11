import { GameType } from './game-type.enum';

export interface GameDto {
  id: string;
  type: GameType;
  playerIds: string[];
  authorPlayerId: string;
  createdOn: Date;
}
