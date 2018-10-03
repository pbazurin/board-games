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
        secret: action.payload.secret,
        language: action.payload.language,
        id: sha256(action.payload.secret)
      }
    };
  }
}

export function userSettingsReducer(state, action) {
  return createReducer(UserSettingsStore)(state, action);
}

export const getUserSettings = createSelector(getMainState, state => state.userSettings);
export const getUserName = createSelector(getUserSettings, state => state.name);
export const getUserSecret = createSelector(getUserSettings, state => state.secret);
export const getUserAvailableLanguages = createSelector(getUserSettings, state => state.availableLanguages);
export const getUserLanguage = createSelector(getUserSettings, state => state.language);
