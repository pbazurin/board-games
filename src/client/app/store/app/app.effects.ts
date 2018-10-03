import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { tap } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';
import { ofAction } from 'ngrx-actions';

import { environment } from '../../../environments/environment';
import { GlobalState } from '../state';
import { AppInitializeAction } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private translate: TranslateService,
    private store: Store<GlobalState>,
    private actions$: Actions
  ) { }

  @Effect({ dispatch: false })
  appInitialize$ = this.actions$.pipe(
    ofAction(AppInitializeAction),
    tap(() => {
      this.translate.setDefaultLang(environment.supportedLanguages[0]);
    })
  );
}
