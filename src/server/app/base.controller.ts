import { SocketService } from './socket/socket.service';
import { UsersService } from './users/users.service';

export class BaseController {
  constructor(
    protected usersService: UsersService,
    protected socketService: SocketService
  ) {}

  protected getSocketByConnectionId(connectionId: string) {
    const socketId = this.usersService.getUserByConnectionId(connectionId)
      .socketId;
    return this.socketService.getSocketById(socketId);
  }
}
