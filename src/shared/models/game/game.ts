import { Player } from '../player/player';
import { GameType } from './game-type.enum';

export interface Game {
  id: string;
  type: GameType;
  players: Player[];
  createdOn: Date;
}
