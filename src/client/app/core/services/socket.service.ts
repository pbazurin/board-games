import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;

  connect(): SocketService {
    this.socket = io();

    return this;
  }

  emit<T extends Action>(action: T): SocketService {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.emit(action.type, action);

    return this;
  }

  on<T extends Action>(A: new (...args) => T, handler: (action: T) => void): SocketService {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    const action = new A();

    this.socket.on(action.type, handler);

    return this;
  }
}
