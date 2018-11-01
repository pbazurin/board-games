import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export interface UserSettings {
  id: string;
  name: string;
  password: string;
  language: string;
  availableLanguages: string[];
}

export interface AppState {
  isInitialized: boolean,
  userSettings: UserSettings,
  connectionId: string
}

export interface GlobalState {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  app: AppState;
}

export const initialState = <AppState>{};
