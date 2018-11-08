import { Injectable } from '@nestjs/common';

import { Observable, Subject } from 'rxjs';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { AuthConnection } from '../models/auth/auth-connection';

@Injectable()
export class AuthService {
  private connections: AuthConnection[] = [];
  private userConnectedSubject$ = new Subject<AuthConnection>();
  private userDisconnectedSubject$ = new Subject<AuthConnection>();

  get userConnected$(): Observable<AuthConnection> {
    return this.userConnectedSubject$.asObservable();
  }

  get userDisconnected$(): Observable<AuthConnection> {
    return this.userDisconnectedSubject$.asObservable();
  }

  isValidConnection(connectionId: string): boolean {
    return this.connections.some(c => c.connectionId === connectionId);
  }

  connect(userId: string, userPassword: string, socketId: string): string {
    const validUserId = sha256(userPassword);

    if (userId !== validUserId) {
      return null;
    }

    const connectionId = v4();
    const newConnection = <AuthConnection>{
      userId: userId,
      connectionId: connectionId,
      socketId: socketId
    };
    this.connections.push(newConnection);

    this.userConnectedSubject$.next(newConnection);

    return connectionId;
  }

  getUserIdByConnectionId(connectionId: string): string {
    return this.connections.find(c => c.connectionId === connectionId).userId;
  }

  getUserIdBySocketId(socketId: string): string {
    return this.connections.find(c => c.socketId === socketId).userId;
  }

  disconnect(socketId: string): void {
    const targetConnection = this.connections.find(c => c.socketId === socketId);

    if (!targetConnection) {
      return;
    }

    this.userDisconnectedSubject$.next(targetConnection);

    this.connections = this.connections.filter(c => c.socketId !== socketId);
  }
}
