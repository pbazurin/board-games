import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';

import { UserDto } from '@dto/user/user.dto';

import { BaseController } from '../base.controller';
import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { SocketService } from '../socket/socket.service';
import { UsersConverter } from './users.converter';
import { UsersService } from './users.service';
import { ValidUserHttpGuard } from './valid-user-http.guard';

@Controller('api/users')
@UseFilters(AllExceptionsFilter)
@UseGuards(ValidUserHttpGuard)
export class UsersController extends BaseController {
  constructor(usersService: UsersService, socketService: SocketService) {
    super(usersService, socketService);
  }

  @Get()
  getAllUsers(): UserDto[] {
    return this.usersService
      .getAllUsers()
      .map(user => UsersConverter.toDto(user));
  }
}
