import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Action, createReducer, Store } from 'ngrx-actions';

import { AppState, initialState } from '../state';
import {
  UserLanguageChangeAction,
  UserNameChangeAction,
  UserSecretChangeAction,
  UserSettingsLoadCompleteAction,
} from './app.actions';

@Store(<AppState>initialState)
export class AppStore {
  @Action(UserSettingsLoadCompleteAction)
  settingsLoadComplete(state: AppState, action: UserSettingsLoadCompleteAction): AppState {
    return {
      ...state,
      userSettings: action.payload
    };
  }

  @Action(UserNameChangeAction)
  userNameChange(state: AppState, action: UserNameChangeAction): AppState {
    return {
      ...state,
      userSettings: {
        ...state.userSettings,
        name: action.payload
      }
    };
  }

  @Action(UserSecretChangeAction)
  userSecretChange(state: AppState, action: UserSecretChangeAction): AppState {
    return {
      ...state,
      userSettings: {
        ...state.userSettings,
        secret: action.payload
      }
    };
  }

  @Action(UserLanguageChangeAction)
  languageChange(state: AppState, action: UserNameChangeAction): AppState {
    return {
      ...state,
      userSettings: {
        ...state.userSettings,
        language: action.payload
      }
    };
  }
}

export function AppReducer(state, action) {
  return createReducer(AppStore)(state, action);
}

export const AppFeatureName = 'app';

export const getMainState = createFeatureSelector<AppState>(AppFeatureName);
export const getUserSettings = createSelector(getMainState, state => state.userSettings);
export const getUserAvailableLanguages = createSelector(getUserSettings, state => state.availableLanguages);
export const getUserLanguage = createSelector(getUserSettings, state => state.language);
