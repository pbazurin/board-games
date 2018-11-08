import { Action } from '@dto/action';

export class JoinGameAction implements Action {
  readonly type = '[Game] Join game';
  constructor(public payload: string) { }
}

export class LeaveGameAction implements Action {
  readonly type = '[Game] Leave game';
  constructor(public payload: string) { }
}

export class UserGameRelationPayload {
  userId: string;
  gameId: string;
}

export class GameUserJoinedAction implements Action {
  readonly type = '[Game] User joined the game';
  constructor(public payload: UserGameRelationPayload) { }
}

export class GameUserLeftAction implements Action {
  readonly type = '[Game] User left the game';
  constructor(public payload: UserGameRelationPayload) { }
}

export class GameCreatedAction implements Action {
  readonly type = '[Game] New game created';
  constructor(public payload: string) { }
}

export class GameRemovedAction implements Action {
  readonly type = '[Game] Game removed';
  constructor(public payload: string) { }
}
