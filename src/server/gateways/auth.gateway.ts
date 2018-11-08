import { OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

import { AuthService } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class AuthGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) { }

  afterInit(server: Server) {
    this.socketService.init(server);
  }

  handleDisconnect(client: Socket) {
    this.authService.disconnect(client.id);
  }

  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(client: Socket, action: AuthGenerateConnectionIdAction): void {
    const connectionId = this.authService.connect(action.payload.userId, action.payload.password, client.id);

    if (connectionId) {
      this.socketService.sendToClient(client, new AuthConnectionIdGeneratedAction(connectionId));
    } else {
      this.socketService.sendToClient(client, new AuthFailedAction());
    }
  }
}
