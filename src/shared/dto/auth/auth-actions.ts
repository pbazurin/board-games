import { Action } from '@ngrx/store';

export class AuthGenerateConnectionIdAction implements Action {
  readonly type = '[Auth] Generate connection id';
  constructor(public userName: string, public password: string) { }
}

export class AuthConnectionIdGeneratedAction implements Action {
  readonly type = '[Auth] Connection id generated';
  constructor(public connectionId: string) { }
}

export class AuthFailedAction implements Action {
  readonly type = '[Auth] Authentication failed';
}
