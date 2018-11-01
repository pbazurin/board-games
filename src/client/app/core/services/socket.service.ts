import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  private onAnyEvent = new Subject();

  isConnected$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.socket = io();
    this.socket.on('connect', () => this.isConnected$.next(true));
    this.socket.on('disconnect', () => this.isConnected$.next(false));

    this.patchWildcardEvent();
  }

  emit<T extends Action>(action: T) {
    this.socket.emit(action.type, action);
  }

  listen<T extends Action>(A: new (...args) => T): Observable<any> {
    return new Observable(observer => {
      const action = new A();
      this.socket.on(action.type, data => {
        observer.next(data);
      });

      return () => this.socket.off(action.type);
    });
  }

  listenAll(): Observable<any> {
    return this.onAnyEvent.asObservable();
  }

  private patchWildcardEvent() {
    const oldOnEvent = this.socket['onevent'];
    const that = this;
    this.socket['onevent'] = function () {
      that.onAnyEvent.next(arguments[0].data[1]);
      oldOnEvent.apply(that.socket, arguments);
    };
  }
}
