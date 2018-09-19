import { Get, Controller } from '@nestjs/common';

@Controller('*')
export class StaticFilesController {
  @Get()
  root(): string {
    return 'static';
  }
}
