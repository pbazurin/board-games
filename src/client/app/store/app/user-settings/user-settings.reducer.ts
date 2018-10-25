import { createSelector } from '@ngrx/store';

import { Action, createReducer, Store } from 'ngrx-actions';

import { AppState } from '../../state';
import { getMainState } from '../app.reducer';
import { UserSettingsChangeAction, UserSettingsLoadCompleteAction } from './user-settings.actions';
import { sha256 } from 'js-sha256';

@Store()
export class UserSettingsStore {
  @Action(UserSettingsLoadCompleteAction)
  settingsLoadComplete(state: AppState, action: UserSettingsLoadCompleteAction): AppState {
    return {
      ...state,
      userSettings: action.payload
    };
  }

  @Action(UserSettingsChangeAction)
  userSettingsChange(state: AppState, action: UserSettingsChangeAction): AppState {
    return {
      ...state,
      userSettings: {
        ...state.userSettings,
        name: action.payload.name,
        password: action.payload.password,
        language: action.payload.language,
        id: sha256(action.payload.password)
      }
    };
  }
}

export function userSettingsReducer(state, action) {
  return createReducer(UserSettingsStore)(state, action);
}

export const getUserSettings = createSelector(getMainState, state => state.userSettings);
export const getUserName = createSelector(getUserSettings, state => state.name);
