import { Module } from '@nestjs/common';

import { ApiController } from './controllers/api.controller';
import { ApiService } from './services/api.service';
import { StaticFilesController } from './controllers/statis-files.controller';

@Module({
  imports: [],
  controllers: [
    ApiController,
    StaticFilesController
  ],
  providers: [
    ApiService
  ],
})
export class AppModule { }
