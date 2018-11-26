import { UserDto } from '@dto/user/user.dto';

import { GameType } from './game-type.enum';

export interface GameDto {
  id: string;
  type: GameType;
  name: string;
  authorUserId: string;
  createdDate: Date;
  maxPlayersNumber?: number;
  players: UserDto[];
}
