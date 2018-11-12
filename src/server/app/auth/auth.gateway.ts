import { OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

import { SocketService } from '../socket/socket.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';
import { AuthService } from './auth.service';

@WebSocketGateway()
export class AuthGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) { }

  afterInit(server: Server) {
    this.socketService.init(server);
  }

  handleDisconnect(socket: Socket) {
    this.authService.disconnect(socket.id);
  }

  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(socket: Socket, action: AuthGenerateConnectionIdAction): void {
    const connectionId = this.authService.authenticateSocket(socket.id, action.payload.userId, action.payload.password);

    if (connectionId) {
      this.socketService.sendToSocket(socket, new AuthConnectionIdGeneratedAction(connectionId));
    } else {
      this.socketService.sendToSocket(socket, new AuthFailedAction());
    }
  }
}
