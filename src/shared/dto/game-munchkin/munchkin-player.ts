import { User } from '../users/user';

export interface MunchkinPlayer extends User {
  isAlive: boolean;
  level: number;
  cardIdsInUse: string[];
  cardIdsInHands: string[];
  cardIdsOnTable: string[];
}
