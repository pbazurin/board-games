import { Injectable } from '@angular/core';

import { AuthConnection } from '../models/auth/auth-connection';

@Injectable()
export class AuthService {
  private connections: AuthConnection[] = [];

  addConnection(connection: AuthConnection) {
    this.connections.push(connection);
  }

  removeConnection(socketId: string) {
    this.connections = this.connections.filter(c => c.socketId !== socketId);
  }

  isActiveConnection(connectionId: string): boolean {
    return this.connections.some(c => c.connectionId === connectionId);
  }

  getConnectionId(socketId: string): string {
    if (!this.isActiveConnection(socketId)) {
      return null;
    }

    return this.connections.find(c => c.socketId === socketId).connectionId;
  }
}
