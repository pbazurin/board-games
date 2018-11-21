import { ArgumentsHost, Catch, ForbiddenException, HttpStatus } from '@nestjs/common';

import { ServerResponse } from 'http';
import { Socket } from 'socket.io';

import { ErrorResponseDto } from '@dto/error/error-response.dto';
import { ErrorResponseAction } from '@dto/error/error.actions';

import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.loggerService.error(exception.message, exception.stack);
    const errorMessage =
      exception instanceof ForbiddenException
        ? exception.message.message
        : exception.message;

    if (host.getArgByIndex(1) instanceof ServerResponse) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(<ErrorResponseDto>{
        errorName: exception.name,
        errorMessage: errorMessage
      });
    } else {
      const ctx = host.switchToWs();
      const client = <Socket>ctx.getClient();

      const errorAction = new ErrorResponseAction(errorMessage);
      client.emit(errorAction.type, errorAction);
    }
  }
}
