import { Module } from '@nestjs/common';

import { ErrorModule } from '../error/error.module';
import { SocketModule } from '../socket/socket.module';
import { UsersController } from './users.controller';
import { UsersGateway } from './users.gateway';
import { UsersService } from './users.service';
import { ValidUserHttpGuard } from './valid-user-http.guard';
import { ValidUserSocketGuard } from './valid-user-socket.guard';

@Module({
  imports: [SocketModule, ErrorModule],
  controllers: [UsersController],
  providers: [
    ValidUserHttpGuard,
    ValidUserSocketGuard,
    UsersService,
    UsersGateway
  ],
  exports: [UsersService]
})
export class UsersModule {}
