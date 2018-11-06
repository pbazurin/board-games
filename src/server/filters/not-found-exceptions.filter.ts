import { ArgumentsHost, Catch, HttpServer, Inject, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

import { config } from '../config';

@Catch(NotFoundException)
export class NotFoundExceptionsFilter extends BaseExceptionFilter {
  constructor(@Inject(HTTP_SERVER_REF) applicationRef: HttpServer) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.sendFile(config.indexPagePath);
  }
}
