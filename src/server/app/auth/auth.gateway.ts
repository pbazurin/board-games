import { UseFilters } from '@nestjs/common';
import { OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AuthConnectionIdGeneratedAction, AuthFailedAction, AuthGenerateConnectionIdAction } from '@dto/auth/auth-actions';

import { config } from '../../config';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { SubscribeAction } from '../helpers/subscribe-action.decorator';
import { SocketService } from '../socket/socket.service';
import { AuthService } from './auth.service';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
export class AuthGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  afterInit(server: Server) {
    this.socketService.init(server);
  }

  handleDisconnect(socket: Socket) {
    this.authService.disconnect(socket.id);
  }

  @SubscribeAction(AuthGenerateConnectionIdAction)
  onGenerateConnectionId(
    socket: Socket,
    action: AuthGenerateConnectionIdAction
  ): void {
    const connectionId = this.authService.authenticateSocket(
      socket.id,
      action.payload.userId,
      action.payload.password
    );

    if (connectionId) {
      this.socketService.sendToSocket(
        socket,
        new AuthConnectionIdGeneratedAction(connectionId)
      );
      socket.join(config.generalRoomName);
    } else {
      this.socketService.sendToSocket(socket, new AuthFailedAction());
    }
  }
}
