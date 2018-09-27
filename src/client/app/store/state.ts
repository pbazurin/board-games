import * as fromRouter from '@ngrx/router-store';

import { RouterStateUrl } from './router.state';

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  app: AppState;
}

export interface AppState {
  isInitialized: boolean
  // TODO: add state props
}

export const initialState = <AppState>{
  isInitialized: false
}
