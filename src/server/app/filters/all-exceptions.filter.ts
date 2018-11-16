import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';

import { ServerResponse } from 'http';

import { ErrorResponseDto } from '@dto/error/error-response.dto';

import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter {
  constructor(
    private loggerService: LoggerService
  ) { }

  catch(exception: Error, host: ArgumentsHost) {
    this.loggerService.error(exception.message, exception.stack);

    if (host.getArgByIndex(1) instanceof ServerResponse) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(<ErrorResponseDto>{
          timestamp: new Date().toISOString(),
          errorName: exception.name,
          errorMessage: exception.message
        });
    } else {
      // TODO: add handler for ws errors
      throw exception;
    }
  }
}
