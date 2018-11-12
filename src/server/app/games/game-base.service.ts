import { Game } from './game';

export interface GameBaseService {
  createNewGame: (authorUserId: string) => Game;
  canUserJoinGame: (userId: string, game: Game) => boolean;
  addUserToGame: (userId: string, game: Game) => boolean;
  removeUserFromGame: (userId: string, game: Game) => boolean;
}
