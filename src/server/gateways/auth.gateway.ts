import { WebSocketGateway } from '@nestjs/websockets';

import { toResponse } from '../converters/action.converter';
import { SubscribeAction } from '../utils/subscribe-action.decorator';
import { AuthConnectionIdGeneratedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

@WebSocketGateway()
export class AuthGateway {
  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(): any {
    return toResponse(new AuthConnectionIdGeneratedAction('testConnectionId'));
  }
}
