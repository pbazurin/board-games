import { Game } from '../games/game';
import { MunchkinPlayer } from './munchkin-player';

export enum GameMunchkinStage {
  NotStarted,
  WaitingForDoorOpening,
  Combat,
  EndCombat,
  WaitingForEndOfTurn,
  Finished
}

export interface GameMunchkin extends Game {
  players: MunchkinPlayer[];
  stage: GameMunchkinStage;
  currentPlayerId: string;
  winnerPlayerId: string;
}
