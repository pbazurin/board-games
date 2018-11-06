import { OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';

import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

import { toResponse } from '../converters/action.converter';
import { AuthConnection } from '../models/auth/auth-connection';
import { AuthService } from '../services/auth.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class AuthGateway implements OnGatewayDisconnect {
  constructor(private authService: AuthService) { }

  handleDisconnect(client: SocketIOClient.Socket) {
    this.authService.removeConnection(client.id);
  }

  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(client: SocketIOClient.Socket, action: AuthGenerateConnectionIdAction): any {
    const validUserId = sha256(action.payload.password);

    if (validUserId === action.payload.userId) {
      const connectionId = v4();

      this.authService.addConnection(<AuthConnection>{
        connectionId: connectionId,
        socketId: client.id
      });

      return toResponse(new AuthConnectionIdGeneratedAction(connectionId));
    }

    return toResponse(new AuthFailedAction());
  }
}
