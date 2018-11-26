import { User } from '../users/user';

export interface MunchkinPlayer extends User {
  level: number;
  cardIdsInHands: string[];
  cardIdsOnTable: string[];
}
