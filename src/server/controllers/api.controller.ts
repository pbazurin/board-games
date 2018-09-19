import { Get, Controller } from '@nestjs/common';

import { ApiService } from '../services/api.service';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get()
  root(): string {
    return this.apiService.root();
  }
}
