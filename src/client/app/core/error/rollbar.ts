import { InjectionToken } from '@angular/core';

import * as Rollbar from 'rollbar';

import { environment } from '../../../environments/environment';

const rollbarConfig = {
  accessToken: environment.rollbarAccessToken,
  captureUncaught: true,
  captureUnhandledRejections: true
};

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

export function rollbarFactory() {
  return environment.rollbarAccessToken ? new Rollbar(rollbarConfig) : null;
}
