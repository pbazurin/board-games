import { createFeatureSelector } from '@ngrx/store';

import { createReducer, Store } from 'ngrx-actions';

import { AppState, initialState } from '../state';

@Store(<AppState>initialState)
export class AppStore {
}

export function appStoreReducer(state, action) {
  return createReducer(AppStore)(state, action);
}

export const AppFeatureName = 'app';

export const getMainState = createFeatureSelector<AppState>(AppFeatureName);
