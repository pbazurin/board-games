import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;

  connect(): SocketIOClient.Socket {
    this.socket = io();

    return this.socket;
  }

  emit<T extends Action>(action: T): SocketService {
    this.socket.emit(action.type, action);

    return this;
  }

  on<T extends Action>(A: new (...args) => T, handler: (action: T) => void): SocketService {
    const action = new A();

    this.socket.on(action.type, handler);

    return this;
  }
}
