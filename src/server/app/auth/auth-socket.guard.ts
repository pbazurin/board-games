import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Socket } from 'socket.io';

import { AuthService } from './auth.service';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const socket = <Socket>context.switchToWs().getClient();

    return this.authService.isAuthenticatedSocket(socket.id);
  }
}
