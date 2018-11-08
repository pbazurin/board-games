import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

import * as io from 'socket.io-client';

import { Action } from '@dto/action';

@Injectable()
export class SocketService {
  private socket: SocketIOClient.Socket;
  private onAnyEvent = new Subject<Action>();
  private isConnectedSubject$ = new BehaviorSubject<boolean>(false);

  get isConnected$(): Observable<boolean> {
    return this.isConnectedSubject$.asObservable();
  }

  init() {
    this.socket = io();
    this.socket.on('connect', () => this.isConnectedSubject$.next(true));
    this.socket.on('disconnect', () => this.isConnectedSubject$.next(false));

    this.patchWildcardEvent();
  }

  emit(...actions: Action[]) {
    actions.forEach(action => {
      this.socket.emit(action.type, action);
    });
  }

  listen<T extends Action>(A: new (...args) => T): Observable<T> {
    return new Observable(observer => {
      const action = new A();
      this.socket.on(action.type, action => {
        observer.next(action);
      });

      return () => this.socket.off(action.type);
    });
  }

  listenAnyOf(...actionClasses: (new (...args) => Action)[]): Observable<void> {
    return new Observable(observer => {
      const actionTypes = [];
      actionClasses.forEach(ActionClass => {
        const action = new ActionClass();
        this.socket.on(action.type, data => {
          observer.next(data);
        });
        actionTypes.push(action.type);
      })

      return () => actionTypes.forEach(actionType => this.socket.off(actionType));
    });
  }

  listenAll(): Observable<Action> {
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
