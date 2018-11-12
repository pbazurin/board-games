import { ArgumentsHost, Catch, HttpServer, Inject } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(HTTP_SERVER_REF) applicationRef: HttpServer,
    private loggerService: LoggerService
  ) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    this.loggerService.error(exception);

    super.catch(exception, host);
  }
}
