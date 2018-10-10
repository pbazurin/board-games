import { GameType } from './game-type.enum';

export interface Game {
  id: string;
  type: GameType;
  playerIds: string[];
  authorPlayerId: string;
  createdOn: Date;
}
