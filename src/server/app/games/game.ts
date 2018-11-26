import { GameType } from '@dto/game/game-type.enum';

import { User } from '../users/user';

export interface Game {
  id: string;
  type: GameType;
  name: string;
  authorUserId: string;
  createdDate: Date;
  maxPlayersNumber?: number;
  players: User[];
}
