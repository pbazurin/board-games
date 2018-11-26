import { UseFilters, UseGuards } from '@nestjs/common';
import { OnGatewayDisconnect, OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import {
  UserConnectionApprovedAction,
  UserConnectionDeniedAction,
  UserDataChangedAction,
  UserRequestConnectionAction,
} from '@dto/user/user-actions';

import { config } from '../../config';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { SocketService } from '../socket/socket.service';
import { SubscribeAction } from '../subscribe-action.decorator';
import { UsersService } from './users.service';
import { ValidUserSocketGuard } from './valid-user-socket.guard';

@WebSocketGateway()
@UseFilters(AllExceptionsFilter)
export class UsersGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(
    private usersService: UsersService,
    private socketService: SocketService
  ) {}

  afterInit(server: Server) {
    this.socketService.init(server);
  }

  handleDisconnect(socket: Socket) {
    this.usersService.disconnectUser(socket.id);
  }

  @SubscribeAction(UserRequestConnectionAction)
  onUserConnection(socket: Socket, action: UserRequestConnectionAction): void {
    try {
      const connectionId = this.usersService.authenticateUser(
        socket.id,
        action.payload.user,
        action.payload.password
      );

      this.socketService.sendToSocket(
        socket,
        new UserConnectionApprovedAction(connectionId)
      );
      socket.join(config.generalRoomName);
    } catch (error) {
      this.socketService.sendToSocket(
        socket,
        new UserConnectionDeniedAction((<Error>error).message)
      );
    }
  }

  @SubscribeAction(UserDataChangedAction)
  @UseGuards(ValidUserSocketGuard)
  onUserDataChanged(socket: Socket, action: UserDataChangedAction): void {
    const currentUser = this.usersService.getUserBySocketId(socket.id);

    if (currentUser.id !== action.payload.oldValue.id) {
      throw new Error(`Old user data doesn't match`);
    }

    this.usersService.updateUser(
      action.payload.oldValue,
      action.payload.newValue,
      action.payload.password
    );

    action.payload.password = null;

    this.socketService.sendToOthersInRoom(
      config.generalRoomName,
      socket,
      action
    );
  }
}
