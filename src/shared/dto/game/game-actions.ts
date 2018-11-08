import { Action } from '@dto/action';

export class GameJoinAction implements Action {
  readonly type = '[Game] Join game';
  constructor(public payload: string) { }
}

export class GameLeaveAction implements Action {
  readonly type = '[Game] Leave game';
  constructor(public payload: string) { }
}
