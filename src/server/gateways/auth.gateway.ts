import { WebSocketGateway } from '@nestjs/websockets';

import { toResponse } from '../converters/action.converter';
import { SubscribeAction } from '../utils/subscribe-action.decorator';
import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';
import { sha256 } from 'js-sha256';
import { v4 } from 'uuid';

@WebSocketGateway()
export class AuthGateway {
  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(client, action: AuthGenerateConnectionIdAction): any {
    const validUserId = sha256(action.payload.password);

    if (validUserId === action.payload.userId) {
      const connectionId = v4();
      return toResponse(new AuthConnectionIdGeneratedAction(connectionId));
    }

    return toResponse(new AuthFailedAction());
  }
}
