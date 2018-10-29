import { InjectionToken } from '@angular/core';

import { environment } from '../../../environments/environment';
import * as Rollbar from 'rollbar';

const rollbarConfig = {
  accessToken: environment.rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

export function rollbarFactory() {
  return environment.rollbarAccessToken ? new Rollbar(rollbarConfig) : null;
}
