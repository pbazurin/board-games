import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Action, createReducer, Store } from 'ngrx-actions';

import { AppState, initialState } from '../state';
import { UserSettingsChangeAction, UserSettingsLoadCompleteAction } from './app.actions';

@Store(<AppState>initialState)
export class AppStore {
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
        language: action.payload.language
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
export const getUserName = createSelector(getUserSettings, state => state.name);
export const getUserSecret = createSelector(getUserSettings, state => state.secret);
export const getUserAvailableLanguages = createSelector(getUserSettings, state => state.availableLanguages);
export const getUserLanguage = createSelector(getUserSettings, state => state.language);
