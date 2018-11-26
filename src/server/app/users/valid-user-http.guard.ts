import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Observable } from 'rxjs';

import { UsersService } from './users.service';

@Injectable()
export class ValidUserHttpGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const connectionId = authHeader.split(' ')[1];

    return this.usersService.isAuthenticatedConnection(connectionId);
  }
}
