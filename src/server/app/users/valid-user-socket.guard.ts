import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { Socket } from 'socket.io';

import { UsersService } from './users.service';

@Injectable()
export class ValidUserSocketGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const socket = <Socket>context.switchToWs().getClient();

    return this.usersService.isAuthenticatedSocket(socket.id);
  }
}
