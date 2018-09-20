import { NestFactory, HTTP_SERVER_REF } from '@nestjs/core';

import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { NotFoundExceptionsFilter } from './filters/not-found-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpRef = app.get(HTTP_SERVER_REF);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef));
  app.useGlobalFilters(new NotFoundExceptionsFilter(httpRef));

  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(process.env.PORT || config.port);
}
bootstrap();
