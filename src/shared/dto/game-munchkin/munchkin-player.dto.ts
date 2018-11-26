import { UserDto } from '@dto/user/user.dto';

export interface MunchkinPlayerDto extends UserDto {
  level: number;
  cardIdsOnTable: string[];
}
