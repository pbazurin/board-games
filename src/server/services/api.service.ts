import { Injectable } from '@nestjs/common';

import { SharedModel } from '../../shared/shared.model';

@Injectable()
export class ApiService {
  root(): string {
    const sharedModel = <SharedModel>{
      test: 'Test'
    };

    return sharedModel.test;
  }
}
