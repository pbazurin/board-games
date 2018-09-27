import { createFeatureSelector } from '@ngrx/store';

import { Action, createReducer, Store } from 'ngrx-actions';

import { AppInitializedAction } from './app.actions';
import { AppState, initialState } from './state';

@Store(<AppState>initialState)
export class AppStore {
  @Action(AppInitializedAction)
  initSuccess(state: AppState, action: AppInitializedAction): AppState {
    return { ...state, isInitialized: true };
  }
}

export function AppReducer(state, action) {
  return createReducer(AppStore)(state, action);
}

export const AppFeatureName = 'app';

export const getMainState = createFeatureSelector<AppState>(AppFeatureName);
//export const getPropValue = createSelector(getMainState, (state: AppState) => state.anyProp);
