import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import { reducerAgregator } from '../shared/utils/ngrx-utils';
import { appStoreReducer } from './app/app.reducer';
import { userSettingsReducer } from './app/user-settings/user-settings.reducer';
import { AppState, GlobalState } from './state';

const appReducers = [appStoreReducer, userSettingsReducer];
export function appReducer(state, action) {
  return reducerAgregator<AppState>(appReducers, state, action);
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<GlobalState> = {
  routerReducer: fromRouter.routerReducer,
  app: appReducer
};

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<GlobalState>[] = !environment.production ? [storeFreeze] : [];
