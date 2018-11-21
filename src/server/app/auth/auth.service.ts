import { Injectable } from '@nestjs/common';

import { Observable, Subject } from 'rxjs';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { AuthConnection } from './auth-connection';

@Injectable()
export class AuthService {
  private authConnections: AuthConnection[] = [];
  private userAuthenticatedSubject$ = new Subject<AuthConnection>();
  private userDisconnectedSubject$ = new Subject<AuthConnection>();

  get userAuthenticated$(): Observable<AuthConnection> {
    return this.userAuthenticatedSubject$.asObservable();
  }

  get userDisconnected$(): Observable<AuthConnection> {
    return this.userDisconnectedSubject$.asObservable();
  }

  isAuthenticatedConnection(connectionId: string): boolean {
    return this.authConnections.some(c => c.id === connectionId);
  }

  isAuthenticatedSocket(socketId: string): boolean {
    return this.authConnections.some(c => c.socketId === socketId);
  }

  authenticateSocket(
    socketId: string,
    userId: string,
    userPassword: string
  ): string {
    const validUserId = sha256(userPassword);

    if (userId !== validUserId) {
      return null;
    }

    const connectionId = v4();
    const newConnection = <AuthConnection>{
      id: connectionId,
      userId: userId,
      socketId: socketId
    };
    this.authConnections.push(newConnection);

    this.userAuthenticatedSubject$.next(newConnection);

    return connectionId;
  }

  getUserIdByConnectionId(connectionId: string): string {
    return this.authConnections.find(c => c.id === connectionId).userId;
  }

  getUserIdBySocketId(socketId: string): string {
    return this.authConnections.find(c => c.socketId === socketId).userId;
  }

  getSocketIdByConnectionId(connectionId: string): string {
    return this.authConnections.find(c => c.id === connectionId).socketId;
  }

  disconnect(socketId: string): void {
    const targetConnection = this.authConnections.find(
      c => c.socketId === socketId
    );

    if (!targetConnection) {
      return;
    }

    this.userDisconnectedSubject$.next(targetConnection);

    this.authConnections = this.authConnections.filter(
      c => c.socketId !== socketId
    );
  }
}
