import { HTTP_SERVER_REF, NestFactory } from '@nestjs/core';

import * as Rollbar from 'rollbar';

import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { NotFoundExceptionsFilter } from './filters/not-found-exceptions.filter';

async function bootstrap() {
  let rollbar: Rollbar;

  if (config.rollbarAccessToken) {
    rollbar = new Rollbar({
      accessToken: config.rollbarAccessToken,
      captureUncaught: true,
      captureUnhandledRejections: true
    });
  }

  const app = await NestFactory.create(AppModule);

  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, rollbar));
  app.useGlobalFilters(new NotFoundExceptionsFilter(httpRef));

  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(config.port);
}
bootstrap();
