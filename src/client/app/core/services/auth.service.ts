import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserConnectionApprovedAction } from '@dto/user/user-actions';

import { SocketService } from './socket.service';

@Injectable()
export class AuthService {
  private connectionIdSubject$ = new ReplaySubject<string>(1);

  get connectionId$(): Observable<string> {
    return this.connectionIdSubject$.asObservable();
  }

  constructor(private socketService: SocketService) {}

  init(): Observable<void> {
    return this.socketService
      .listen(UserConnectionApprovedAction)
      .pipe(map(action => this.connectionIdSubject$.next(action.payload)));
  }
}
