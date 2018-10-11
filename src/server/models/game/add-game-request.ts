import { GameType } from '../../../shared/dto/game/game-type.enum';

export class AddGameRequest {
  gameType: GameType;
  authorPlayerId: string;
}
