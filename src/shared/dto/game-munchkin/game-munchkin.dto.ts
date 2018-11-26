import { MunchkinPlayerDto } from './munchkin-player.dto';

export interface GameMunchkinDto {
  id: string;
  name: string;
  authorUserId: string;
  createdDate: Date;
  maxPlayersNumber?: number;
  players: MunchkinPlayerDto[];
}
