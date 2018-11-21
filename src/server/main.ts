import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { config } from './config';
import { NotFoundExceptionsFilter } from './not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new NotFoundExceptionsFilter());
  app.useStaticAssets(config.staticAssetsDirPath);

  await app.listen(config.port);
}
bootstrap();
