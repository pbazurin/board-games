import { Controller } from '@nestjs/common';

import { BaseController } from '../base.controller';

@Controller('api/games/test')
export class GameTestController extends BaseController {
}
