import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';

import { GameDto } from '@dto/game/game.dto';

import { AuthHttpGuard } from '../auth/auth-http.guard';
import { AuthService } from '../auth/auth.service';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { BaseController } from '../helpers/base.controller';
import { SocketService } from '../socket/socket.service';
import { GamesConverter } from './games.converter';
import { GamesService } from './games.service';

@Controller('api/games')
@UseFilters(AllExceptionsFilter)
@UseGuards(AuthHttpGuard)
export class GamesController extends BaseController {
  constructor(
    authService: AuthService,
    socketService: SocketService,
    private gamesService: GamesService
  ) {
    super(authService, socketService);
  }

  @Get()
  getRunningGames(): GameDto[] {
    return this.gamesService
      .getRunningGames()
      .map(game => GamesConverter.toDto(game));
  }
}
