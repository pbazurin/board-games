import { Action } from '@ngrx/store';

export class AppInitializeAction implements Action {
  readonly type = '[App] Initialize';
  constructor() { }
}

export class AppInitializedAction implements Action {
  readonly type = '[App] Initialized';
  constructor() { }
}
