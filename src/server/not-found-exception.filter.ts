import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';

import { config } from './config';

@Catch(NotFoundException)
export class NotFoundExceptionsFilter {
  constructor() {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.sendFile(config.indexPagePath);
  }
}
