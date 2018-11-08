import { Injectable } from '@angular/core';

import * as Rollbar from 'rollbar';

import { config } from '../config';

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

  error(error: any, context?: any, response?: any) {
    console.log(JSON.stringify(error));

    if (this.rollbar) {
      this.rollbar.error(error, context, response);
    }
  }
}
