import { Action } from '@dto/action';

import { UserDto } from './user.dto';

export class UserRequestConnectionPayload {
  user: UserDto;
  password: string;
}

export class UserRequestConnectionAction implements Action {
  readonly type = '[User] Connection request';
  constructor(public payload: UserRequestConnectionPayload) {}
}

export class UserConnectionApprovedAction implements Action {
  readonly type = '[User] Connection granted';
  constructor(public payload: string) {}
}

export class UserConnectionDeniedAction implements Action {
  readonly type = '[User] Connection denied';
  constructor(public payload: string) {}
}

export class UserDataChangedPayload {
  oldValue: UserDto;
  newValue: UserDto;
  password?: string;
}

export class UserDataChangedAction implements Action {
  readonly type = '[User] User data changed';
  constructor(public payload: UserDataChangedPayload) {}
}
