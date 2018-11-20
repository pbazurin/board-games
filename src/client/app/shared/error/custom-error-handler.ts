import { ErrorHandler, Inject, Injectable } from '@angular/core';

import * as Rollbar from 'rollbar';

import { RollbarService } from './rollbar';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {
    super();
  }

  handleError(error: Error) {
    if (this.rollbar) {
      this.rollbar.error(error.message);
    }

    super.handleError(error);
  }
}
