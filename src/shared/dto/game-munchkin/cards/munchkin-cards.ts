import { MunchkinPlayer } from 'src/server/app/game-munchkin/munchkin-player';

import { Card, SlotType, TreasureCard } from '../card';
import { MunchkinCardId } from './munchkin-card-id';

export const MunchkinCards: Card[] = [
  <TreasureCard>{
    id: MunchkinCardId.HelmOfCourage,
    name: 'Helm of courage',
    description: 'Simple but good helmet',
    price: 200,
    slotType: SlotType.Head,
    canBeUsed: (player: MunchkinPlayer) => true,
    use: (player: MunchkinPlayer) => {
      player.attackStrength += 1;
    }
  }
];
