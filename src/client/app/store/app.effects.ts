import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { map, tap } from 'rxjs/operators';

import { ofAction } from 'ngrx-actions';

import { AppInitializeAction, AppInitializedAction } from './app.actions';
import { AppState } from './state';

@Injectable()
export class AppEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions
  ) { }

  @Effect()
  initializeApp$ = this.actions$.pipe(
    ofAction(AppInitializeAction),
    map(() => new AppInitializedAction()),
  );

  @Effect({ dispatch: false })
  initializedApp$ = this.actions$.pipe(
    ofAction(AppInitializedAction),
    tap(() => console.log('Initialized effect')),
  );
}
