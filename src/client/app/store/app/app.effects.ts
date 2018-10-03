import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { map, switchMap, tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ofAction } from 'ngrx-actions';

import { environment } from '../../../environments/environment';
import { GlobalState, UserSettings } from '../state';
import {
  AppInitializeAction,
  UserSettingsChangeAction,
  UserSettingsLoadAction,
  UserSettingsLoadCompleteAction,
  UserSettingsSaveAction,
  UserSettingsSaveCompleteAction,
} from './app.actions';
import { getUserSettings } from './app.reducer';

@Injectable()
export class AppEffects {
  private USER_SETTINGS_STORAGE_NAME = 'userSettings';

  constructor(
    private translate: TranslateService,
    private store: Store<GlobalState>,
    private actions$: Actions
  ) { }

  @Effect()
  appInitialize$ = this.actions$.pipe(
    ofAction(AppInitializeAction),
    tap(() => {
      this.translate.setDefaultLang('en');
    }),
    map(() => new UserSettingsLoadAction())
  );

  @Effect()
  userSettingsLoad$ = this.actions$.pipe(
    ofAction(UserSettingsLoadAction),
    map(() => {
      let userSettings = <UserSettings>(JSON.parse(localStorage.getItem(this.USER_SETTINGS_STORAGE_NAME)) || {});
      userSettings.availableLanguages = environment.supportedLanguages;

      // TODO: add user initialization if empty
      userSettings.name = userSettings.name || 'Player';
      userSettings.secret = userSettings.secret || 'Secret';
      userSettings.language = userSettings.language || 'en';

      return new UserSettingsLoadCompleteAction(userSettings);
    })
  );

  @Effect({ dispatch: false })
  userSettingsLoadComplete$ = this.actions$.pipe(
    ofAction(UserSettingsLoadCompleteAction),
    map(action => {
      this.translate.addLangs(action.payload.availableLanguages);
      this.translate.use(action.payload.language);
    })
  );

  @Effect({ dispatch: false })
  userLanguageChange$ = this.actions$.pipe(
    ofAction(UserSettingsChangeAction),
    tap(action => this.translate.use(action.payload.language))
  );

  @Effect()
  userSettingsChange$ = this.actions$.pipe(
    ofAction(UserSettingsChangeAction),
    map(() => new UserSettingsSaveAction())
  );

  @Effect()
  userSettingsSave$ = this.actions$.pipe(
    ofAction(UserSettingsSaveAction),
    switchMap(_ => this.store.pipe(select(getUserSettings))),
    tap(userSettings => localStorage.setItem(this.USER_SETTINGS_STORAGE_NAME, JSON.stringify(userSettings))),
    map(() => new UserSettingsSaveCompleteAction())
  );
}
