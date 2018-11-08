import { Injectable } from '@angular/core';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { AuthConnection } from '../models/auth/auth-connection';

@Injectable()
export class AuthService {
  private connections: AuthConnection[] = [];

  isValidConnection(connectionId: string): boolean {
    return this.connections.some(c => c.connectionId === connectionId);
  }

  connect(userId: string, userPassword: string, socketId: string): string {
    const validUserId = sha256(userPassword);

    if (userId !== validUserId) {
      return null;
    }

    const connectionId = v4();

    this.connections.push(<AuthConnection>{
      userId: userId,
      connectionId: connectionId,
      socketId: socketId
    });

    return connectionId;
  }

  getUserIdByConnectionId(connectionId: string): string {
    return this.connections.find(c => c.connectionId === connectionId).userId;
  }

  getUserIdBySocketId(socketId: string): string {
    return this.connections.find(c => c.socketId === socketId).userId;
  }

  disconnect(socketId: string): void {
    this.connections = this.connections.filter(c => c.socketId !== socketId);
  }
}
