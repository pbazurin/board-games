import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AllExceptionsFilter } from './app/filters/all-exceptions.filter';
import { NotFoundExceptionsFilter } from './app/filters/not-found-exceptions.filter';
import { LoggerService } from './app/logger/logger.service';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerService = app.get(LoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(loggerService));
  app.useGlobalFilters(new NotFoundExceptionsFilter());

  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(config.port);
}
bootstrap();
