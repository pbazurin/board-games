import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app/app.module';
import { config } from './config';
import { NotFoundExceptionsFilter } from './not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new NotFoundExceptionsFilter());
  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(config.port);
}
bootstrap();
