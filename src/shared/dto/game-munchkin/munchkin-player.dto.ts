import { UserDto } from '@dto/user/user.dto';

export interface MunchkinPlayerDto extends UserDto {
  level: number;
  cardIdsInHands: string[];
  cardIdsOnTable: string[];
}
