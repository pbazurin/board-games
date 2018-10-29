import { ErrorHandler, Inject, Injectable } from '@angular/core';

import { RollbarService } from './rollbar';
import * as Rollbar from 'rollbar';

@Injectable()
export class CustomErrorHandler extends ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {
    super();
  }

  handleError(error: Error) {
    if (this.rollbar) {
      this.rollbar.error(error);
    }

    super.handleError(error);
  }
}
