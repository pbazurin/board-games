import { Action } from '@ngrx/store';

export class AppInitializeAction implements Action {
  readonly type = '[App] Initialize';
  constructor() { }
}
