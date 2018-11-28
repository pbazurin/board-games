import { GameType } from '@dto/game/game-type.enum';

import { markForTranslation } from '../utils/mark-for-translation';

export const GameTypeNames: { [index: number]: string } = {
  [GameType.Test]: markForTranslation('Test game'),
  [GameType.Munchkin]: markForTranslation('Munchkin')
};
