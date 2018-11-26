import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';

import { GameDto } from '@dto/game/game.dto';

import { BaseController } from '../base.controller';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { SocketService } from '../socket/socket.service';
import { UsersService } from '../users/users.service';
import { ValidUserHttpGuard } from '../users/valid-user-http.guard';
import { GamesConverter } from './games.converter';
import { GamesService } from './games.service';

@Controller('api/games')
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserHttpGuard)
export class GamesController extends BaseController {
  constructor(
    usersService: UsersService,
    socketService: SocketService,
    private gamesService: GamesService
  ) {
    super(usersService, socketService);
  }

  @Get()
  getRunningGames(): GameDto[] {
    return this.gamesService
      .getRunningGames()
      .map(game => GamesConverter.toDto(game));
  }
}
