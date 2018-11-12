import { GameType } from '@dto/game/game-type.enum';

export interface Game {
  id: string;
  type: GameType;
  userIds: string[];
  authorUserId: string;
  createdOn: Date;
}
