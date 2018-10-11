import { GameType } from '@dto/game/game-type.enum';

export class AddGameRequest {
  gameType: GameType;
  authorPlayerId: string;
}
