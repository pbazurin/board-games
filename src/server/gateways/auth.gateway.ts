import { OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

import { ActionsConverter } from '../converters/actions.converter';
import { GatewayResponse } from '../models/gateway-response';
import { AuthService } from '../services/auth.service';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class AuthGateway implements OnGatewayDisconnect {
  constructor(private authService: AuthService) { }

  handleDisconnect(client: Socket) {
    this.authService.disconnect(client.id);
  }

  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(client: Socket, action: AuthGenerateConnectionIdAction): GatewayResponse {
    const connectionId = this.authService.connect(action.payload.userId, action.payload.password, client.id);

    if (connectionId) {
      return ActionsConverter.toResponse(new AuthConnectionIdGeneratedAction(connectionId));
    } else {
      return ActionsConverter.toResponse(new AuthFailedAction());
    }
  }
}
