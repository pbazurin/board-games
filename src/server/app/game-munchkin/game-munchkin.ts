import { Game } from '../games/game';
import { MunchkinPlayer } from './munchkin-player';

export interface GameMunchkin extends Game {
  players: MunchkinPlayer[];
}
