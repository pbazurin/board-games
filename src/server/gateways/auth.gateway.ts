import { WebSocketGateway } from '@nestjs/websockets';

import { AuthConnectionIdGeneratedAction, AuthGenerateConnectionIdAction } from '../../shared/dto/auth/auth-actions';
import { toResponse } from '../converters/action.converter';
import { SubscribeAction } from '../utils/subscribe-action.decorator';

@WebSocketGateway()
export class AuthGateway {
  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(): any {
    return toResponse(new AuthConnectionIdGeneratedAction('testConnectionId'));
  }
}
