import { GameType } from '@dto/game/game-type.enum';

export interface Game {
  id: string;
  type: GameType;
  name: string;
  userIds: string[];
  authorUserId: string;
  createdDate: Date;
  maxPlayersNumber?: number;
}
