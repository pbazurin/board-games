import { Injectable } from '@nestjs/common';

import { Server, Socket } from 'socket.io';

import { Action } from '@dto/action';

@Injectable()
export class SocketService {
  private server: Server;

  init(server: Server) {
    this.server = server;
  }

  sendToSocket(socket: Socket, action: Action) {
    socket.emit(action.type, action);
  }

  sendToOthers(socket: Socket, action: Action) {
    socket.broadcast.emit(action.type, action);
  }

  sendToOthersInRoom(roomId: string, socket: Socket, action: Action) {
    socket.in(roomId).emit(action.type, action);
  }

  sendToAll(action: Action) {
    this.server.emit(action.type, action);
  }

  sendToAllInRoom(roomId: string, action: Action) {
    this.server.in(roomId).emit(action.type, action);
  }
}
