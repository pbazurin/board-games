import { Controller } from '@nestjs/common';

import { AuthService } from '../../auth/auth.service';
import { SocketService } from '../../socket/socket.service';
import { BaseController } from '../base.controller';

@Controller('api/games/munchkin')
export class GameMunchkinController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService
  ) {
    super(authService, socketService);
  }
}
