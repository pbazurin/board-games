import { Injectable } from '@nestjs/common';

import { Observable, Subject } from 'rxjs';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { UserDto } from '@dto/user/user.dto';

import { User } from './user';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private userAuthenticatedSubject$ = new Subject<User>();
  private userDisconnectedSubject$ = new Subject<User>();

  get userAuthenticated$(): Observable<User> {
    return this.userAuthenticatedSubject$.asObservable();
  }

  get userDisconnected$(): Observable<User> {
    return this.userDisconnectedSubject$.asObservable();
  }

  isAuthenticatedConnection(connectionId: string): boolean {
    return this.users.some(u => u.connectionId === connectionId);
  }

  isAuthenticatedSocket(socketId: string): boolean {
    return this.users.some(u => u.socketId === socketId);
  }

  authenticateUser(
    socketId: string,
    user: UserDto,
    userPassword: string
  ): string {
    const validUserId = sha256(userPassword);

    if (user.id !== validUserId) {
      throw new Error('Invalid password');
    }

    const connectionId = v4();
    const newUser = <User>{
      id: user.id,
      connectionId: connectionId,
      socketId: socketId,
      name: user.name,
      language: user.language
    };
    this.users.push(newUser);

    this.userAuthenticatedSubject$.next(newUser);

    return connectionId;
  }

  updateUser(oldUserData: UserDto, newUserData: UserDto, userPassword: string) {
    const validUserId = sha256(userPassword);

    if (newUserData.id !== validUserId) {
      throw new Error('Invalid password');
    }

    const targetUser = this.users.find(u => u.id === oldUserData.id);
    targetUser.id = newUserData.id;
    targetUser.name = newUserData.name;
    targetUser.language = newUserData.language;
  }

  getUserByConnectionId(connectionId: string): User {
    return this.users.find(u => u.connectionId === connectionId);
  }

  getUserBySocketId(socketId: string): User {
    return this.users.find(u => u.socketId === socketId);
  }

  getAllUsers(): User[] {
    return this.users;
  }

  disconnectUser(socketId: string): void {
    const targetUser = this.users.find(u => u.socketId === socketId);

    if (!targetUser) {
      return;
    }

    this.userDisconnectedSubject$.next(targetUser);

    this.users = this.users.filter(u => u.socketId !== socketId);
  }
}
