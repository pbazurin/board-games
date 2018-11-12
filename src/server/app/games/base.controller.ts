import { AuthService } from '../auth/auth.service';
import { SocketService } from '../socket/socket.service';

export class BaseController {
  constructor(
    protected authService: AuthService,
    protected socketService: SocketService
  ) { }

  protected getSocketByConnectionId(connectionId: string) {
    const socketId = this.authService.getSocketIdByConnectionId(connectionId);
    return this.socketService.getSocketById(socketId);
  }
}
