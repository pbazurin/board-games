import { GameType } from './game-type.enum';

export interface GameDto {
  id: string;
  type: GameType;
  name: string;
  userIds: string[];
  authorUserId: string;
  createdDate: Date;
  maxPlayersNumber?: number;
}
