import { Action } from '@dto/action';

export class GenerateConnectionIdPayload {
  userId: string;
  password: string;
}

export class AuthGenerateConnectionIdAction implements Action {
  readonly type = '[Auth] Generate connection id';
  constructor(public payload: GenerateConnectionIdPayload) {}
}

export class AuthConnectionIdGeneratedAction implements Action {
  readonly type = '[Auth] Connection id generated';
  constructor(public payload: string) {}
}

export class AuthFailedAction implements Action {
  readonly type = '[Auth] Authentication failed';
}
