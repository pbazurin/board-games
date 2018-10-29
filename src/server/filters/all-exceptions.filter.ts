import { ArgumentsHost, Catch, HttpServer, Inject } from '@nestjs/common';
import { BaseExceptionFilter, HTTP_SERVER_REF } from '@nestjs/core';

import * as Rollbar from 'rollbar';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    @Inject(HTTP_SERVER_REF) applicationRef: HttpServer,
    private rollbar: Rollbar
  ) {
    super(applicationRef);
  }

  catch(exception: any, host: ArgumentsHost) {
    if (this.rollbar) {
      this.rollbar.error(exception);
    }

    console.log(JSON.stringify(exception));

    super.catch(exception, host);
  }
}
