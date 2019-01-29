import { MunchkinPlayer } from './munchkin-player';

export interface Card {
  id: string;
  name: string;
  description: string;
}

export enum SlotType {
  None,
  Head,
  Body,
  OneArm,
  Arms,
  Legs
}

export interface TreasureCard extends Card {
  price: number;
  slotType: SlotType;
  strengthModifier: number;
  canBeUsed: (player: MunchkinPlayer) => boolean;
}

export enum EffectType {
  None,
  Curse,
  Race,
  Class
}

export interface DoorCard extends Card {
  effectType: EffectType;
  canBeUsed: (player: MunchkinPlayer) => boolean;
  use: (player: MunchkinPlayer) => boolean;
}
