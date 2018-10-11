import { GameType } from '../../../shared/models/game/game-type.enum';

export class AddGameRequest {
  gameType: GameType;
  authorPlayerId: string;
}
