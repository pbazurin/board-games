import { Module } from '@nestjs/common';

import { AllExceptionsFilter } from '../error/all-exceptions.filter';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [AllExceptionsFilter]
})
export class ErrorModule {}
