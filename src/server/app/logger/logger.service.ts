import { Injectable } from '@nestjs/common';

import * as Rollbar from 'rollbar';

import { config } from '../../config';

@Injectable()
export class LoggerService {
  private rollbar: Rollbar;

  constructor() {
    if (config.rollbarAccessToken) {
      this.rollbar = new Rollbar({
        accessToken: config.rollbarAccessToken,
        captureUncaught: true,
        captureUnhandledRejections: true
      });
    }
  }

  error(message: any, trace?: any) {
    if (this.rollbar) {
      this.rollbar.error(message);
    }
  }
}
