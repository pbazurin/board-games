import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { map, switchMap, tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ofAction } from 'ngrx-actions';

import { environment } from '../../../../environments/environment';
import { GlobalState, UserSettings } from '../../state';
import { AppInitializeAction } from '../app.actions';
import {
  UserSettingsChangeAction,
  UserSettingsGenerateNewAction,
  UserSettingsGenerateNewCompleteAction,
  UserSettingsLoadAction,
  UserSettingsLoadCompleteAction,
  UserSettingsSaveAction,
  UserSettingsSaveCompleteAction,
} from './user-settings.actions';
import { getUserSettings } from './user-settings.reducer';
import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

@Injectable()
export class UserSettingsEffects {
  private USER_SETTINGS_STORAGE_NAME = 'userSettings';

  constructor(
    private translate: TranslateService,
    private store: Store<GlobalState>,
    private actions$: Actions
  ) { }

  @Effect()
  appInitialize$ = this.actions$.pipe(
    ofAction(AppInitializeAction),
    map(() => new UserSettingsLoadAction())
  );

  @Effect()
  userSettingsLoad$ = this.actions$.pipe(
    ofAction(UserSettingsLoadAction),
    map(() => {
      let userSettingsString = localStorage.getItem(this.USER_SETTINGS_STORAGE_NAME);

      if (!userSettingsString || !userSettingsString.length) {
        return new UserSettingsGenerateNewAction();
      }

      let userSettings;

      try {
        userSettings = <UserSettings>(JSON.parse(userSettingsString) || {});
      } catch {
        return new UserSettingsGenerateNewAction();
      }

      userSettings.availableLanguages = environment.supportedLanguages;

      if (!userSettings.name || !userSettings.secret || !userSettings.id || !userSettings.language) {
        return new UserSettingsGenerateNewAction();
      }

      return new UserSettingsLoadCompleteAction(userSettings);
    })
  );

  @Effect()
  userSettingsGenerateNew$ = this.actions$.pipe(
    ofAction(UserSettingsGenerateNewAction),
    map(() => {
      let userSettings = <UserSettings>{
        name: 'Player',
        secret: v4(),
        availableLanguages: environment.supportedLanguages,
        language: environment.supportedLanguages[0]
      };

      userSettings.id = sha256(userSettings.secret);

      return new UserSettingsGenerateNewCompleteAction(userSettings);
    })
  );

  @Effect()
  userSettingsGenerateNewComplete$ = this.actions$.pipe(
    ofAction(UserSettingsGenerateNewCompleteAction),
    map(action => new UserSettingsLoadCompleteAction(action.payload))
  )

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
    ofAction(UserSettingsChangeAction, UserSettingsGenerateNewCompleteAction),
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
