import { Action } from '@ngrx/store';

export class GenerateConnectionIdAction implements Action {
  readonly type = '[Auth] Generate connection id';
  constructor(public userName: string, public password: string) { }
}

export class ConnectionIdGeneratedSuccessfullyAction implements Action {
  readonly type = '[Auth] Connection id successfully generated';
  constructor(public connectionId: string) { }
}

export class AuthFailedAction implements Action {
  readonly type = '[Auth] Failed';
}
