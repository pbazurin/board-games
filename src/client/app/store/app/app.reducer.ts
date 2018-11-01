import { createFeatureSelector } from '@ngrx/store';

import { Action, createReducer, Store } from 'ngrx-actions';

import { AppState, initialState } from '../state';
import { AuthConnectionIdGeneratedAction } from '@dto/auth/auth-actions';

@Store(<AppState>initialState)
export class AppStore {
  @Action(AuthConnectionIdGeneratedAction)
  settingsLoadComplete(state: AppState, action: AuthConnectionIdGeneratedAction): AppState {
    return {
      ...state,
      connectionId: action.payload
    };
  }
}

export function appStoreReducer(state, action) {
  return createReducer(AppStore)(state, action);
}

export const AppFeatureName = 'app';

export const getMainState = createFeatureSelector<AppState>(AppFeatureName);
