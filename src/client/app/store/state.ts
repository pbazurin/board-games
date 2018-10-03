import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export interface UserSettings {
  id: string;
  name: string;
  secret: string;
  language: string;
  availableLanguages: string[];
}

export interface AppState {
  userSettings: UserSettings
}

export interface GlobalState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  app: AppState;
}

export const initialState = <AppState>{};
