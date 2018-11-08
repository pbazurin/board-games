import { HTTP_SERVER_REF, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { config } from './config';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { NotFoundExceptionsFilter } from './filters/not-found-exceptions.filter';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const httpRef = app.get(HTTP_SERVER_REF);
  const loggerService = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, loggerService));
  app.useGlobalFilters(new NotFoundExceptionsFilter(httpRef));

  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(config.port);
}
bootstrap();
