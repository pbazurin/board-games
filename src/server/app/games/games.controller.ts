import { Controller, Get, UseGuards } from '@nestjs/common';

import { GameDto } from '@dto/game/game.dto';

import { AuthHttpGuard } from '../auth/auth-http.guard';
import { AuthService } from '../auth/auth.service';
import { BaseController } from '../helpers/base.controller';
import { SocketService } from '../socket/socket.service';
import { GamesConverter } from './games.converter';
import { GamesService } from './games.service';

@Controller('api/games')
export class GamesController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService,
    private gamesService: GamesService
  ) {
    super(authService, socketService);
  }

  @Get()
  @UseGuards(AuthHttpGuard)
  getRunningGames(): GameDto[] {
    return this.gamesService.getRunningGames().map(game => GamesConverter.toDto(game));
  }
}
