import { Action } from '@ngrx/store';

import { UserSettings } from '../state';

export class AppInitializeAction implements Action {
  readonly type = '[App] Initialize';
  constructor() { }
}

export class UserSettingsLoadAction implements Action {
  readonly type = '[User settings] Load';
  constructor() { }
}

export class UserSettingsLoadCompleteAction implements Action {
  readonly type = '[User settings] Load complete';
  constructor(public payload: UserSettings) { }
}

export class UserSettingsChangeAction implements Action {
  readonly type = '[User settings] Change';
  constructor(public payload: UserSettings) { }
}

export class UserSettingsSaveAction implements Action {
  readonly type = '[User settings] Save';
  constructor() { }
}

export class UserSettingsSaveCompleteAction implements Action {
  readonly type = '[User settings] Save complete';
  constructor() { }
}
