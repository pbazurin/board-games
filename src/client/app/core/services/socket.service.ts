import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';

@Injectable()
export class SocketService {
  socket: SocketIOClient.Socket;

  connect(): SocketIOClient.Socket {
    this.socket = io();

    return this.socket;
  }
}
