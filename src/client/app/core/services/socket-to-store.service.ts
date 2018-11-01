import { Injectable } from '@angular/core';

import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { SocketService } from './socket.service';

@Injectable()
export class SocketToStoreService {
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private socketService: SocketService
  ) { }

  sendAllSocketEventsToStore(): Observable<any> {
    return this.socketService.listenAll()
      .pipe(tap(action => {
        action.isSynthetic = true;
        this.store.dispatch(action);
      }));
  }

  sendAllStoreEventsToSocket(): Observable<any> {
    return this.actions$
      .pipe(
        filter(action =>
          action.type
          && !(<any>action).isSynthetic // to avoid circular events socket -> store -> socket
          && action.type !== 'ROUTER_NAVIGATION'
          && action.type.indexOf('@ngrx') === -1
        ),
        tap(action => {
          this.socketService.emit(action);
        })
      );
  }
}
