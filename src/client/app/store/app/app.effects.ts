import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { SocketToStoreService } from '../../core/services/socket-to-store.service';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private socketToStoreService: SocketToStoreService
  ) { }

  @Effect({ dispatch: false })
  anyEffect$ = this.socketToStoreService.sendAllStoreEventsToSocket();
}
