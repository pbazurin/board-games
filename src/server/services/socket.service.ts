import { Injectable } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { Action } from '@dto/action';

@Injectable()
export class SocketService {
  private server: Server;

  init(server: Server) {
    this.server = server;
  }

  broadcastToOther(client: Socket, action: Action) {
    client.broadcast.emit(action.type, action);
  }

  sendToClient(client: Socket, action: Action) {
    client.emit(action.type, action);
  }

  sendToAll(action: Action) {
    this.server.emit(action.type, action);
  }
}
