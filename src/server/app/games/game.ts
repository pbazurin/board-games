import { GameType } from '@dto/game/game-type.enum';

export class Game {
  id: string;
  type: GameType;
  userIds: string[];
  authorUserId: string;
  createdOn: Date;
}
