import { WebSocketGateway } from '@nestjs/websockets';

import { toResponse } from '../converters/action.converter';
import { SubscribeAction } from '../utils/subscribe-action.decorator';
import { ConnectionIdGeneratedSuccessfullyAction, GenerateConnectionIdAction } from '@dto/auth/auth-actions';

@WebSocketGateway('socket.io')
export class AuthGateway {
  @SubscribeAction(GenerateConnectionIdAction)
  onGenerateConnectionIdAction(): any {
    return toResponse(new ConnectionIdGeneratedSuccessfullyAction('testConnectionId'));
  }
}
