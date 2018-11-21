import { Module } from '@nestjs/common';

import { ErrorModule } from '../error/error.module';
import { SocketModule } from '../socket/socket.module';
import { AuthHttpGuard } from './auth-http.guard';
import { AuthSocketGuard } from './auth-socket.guard';
import { AuthGateway } from './auth.gateway';
import { AuthService } from './auth.service';

@Module({
  imports: [SocketModule, ErrorModule],
  controllers: [],
  providers: [AuthHttpGuard, AuthSocketGuard, AuthService, AuthGateway],
  exports: [AuthService]
})
export class AuthModule {}
